import { TILE } from "../core/grid";
import { PIXEL_SIZE } from "../core/pixelRendererConstants";
import { renderAutoShadedMask, renderTokenMask } from "../core/pixelRenderer";
import { type PixelMask } from "../core/maskUtils";
import {
    bottomStyles,
    fullOutfitStyles,
    shoeStyles,
    topStyles,
    type ArmPose,
    type BottomStyle,
    type FullOutfitStyle,
    type GarmentLayer,
    type GarmentPlacement,
    type LegPose,
    type ShoeStyle,
    type TopStyle
} from "./styles/clothesStyles";
import {
    resolveHairLayers,
    type BackHairStyle,
    type FrontHairStyle,
    type HairLayer
} from "./styles/hairStyles";
import { armsMask } from "./masks/arms.mask";
import { eyesMask } from "./masks/eyes.mask";
import { headMasks } from "./masks/head.mask";
import { legsMask } from "./masks/legs.mask";
import { torsoMask } from "./masks/torso.mask";
import {
    clothesPalettes,
    eyePalettes,
    hairPalettes,
    skinPalettes,
    type ClothesColor,
    type EyeColor,
    type HairColor,
    type SkinTone
} from "../core/palette";

import { RenderedAvatar } from "./types";

export type AvatarProps = {
    /** provide a pre‑composed pixel grid instead of the usual style props */
    avatar?: RenderedAvatar;
    /** size of each pixel in the rendered SVG; defaults to the engine constant */
    pixelSize?: number;

    headOrientation?: keyof typeof headMasks;
    skinTone?: SkinTone;
    frontHairStyle?: FrontHairStyle;
    backHairStyle?: BackHairStyle;
    hairColor?: HairColor;
    eyeColor?: EyeColor;
    clothesColor?: ClothesColor;
    topStyle?: TopStyle;
    bottomStyle?: BottomStyle;
    fullOutfitStyle?: FullOutfitStyle;
    shoeStyle?: ShoeStyle;
    armPose?: ArmPose;
    legPose?: LegPose;
};

const bodyLayers: Array<{ mask: PixelMask; offsetX: number; offsetY: number }> = [
    { mask: legsMask, offsetX: 2, offsetY: 13 },
    { mask: torsoMask, offsetX: 2, offsetY: 6 },
    { mask: armsMask, offsetX: 0, offsetY: 6 },
    { mask: eyesMask, offsetX: 3, offsetY: 1 }
];

function computeViewBox(
    layers: Array<{ mask: PixelMask; offsetX: number; offsetY: number }>
) {
    const minX = Math.min(...layers.map((layer) => layer.offsetX));
    const minY = Math.min(...layers.map((layer) => layer.offsetY));
    const maxX = Math.max(
        ...layers.map((layer) => layer.offsetX + (layer.mask[0]?.length ?? 0) - 1)
    );
    const maxY = Math.max(...layers.map((layer) => layer.offsetY + layer.mask.length - 1));

    const outlinePadding = 1;
    const x = (minX - outlinePadding) * TILE;
    const y = (minY - outlinePadding) * TILE;
    const width = (maxX - minX + 1 + outlinePadding * 2) * TILE;
    const height = (maxY - minY + 1 + outlinePadding * 2) * TILE;

    return { x, y, width, height };
}

export default function Avatar(props: AvatarProps) {
    // if caller passed a ready‑made grid we render it directly and ignore
    // the familiar style props. this allows the components/Avatar wrapper to
    // work as expected.
    if (props.avatar) {
        const pixelSize = props.pixelSize ?? PIXEL_SIZE;
        const grid = props.avatar.grid;
        const width = (grid[0]?.length ?? 0) * pixelSize;
        const height = grid.length * pixelSize;

        return (
            <svg
                width={width}
                height={height}
                style={{ imageRendering: "pixelated" }}
            >
                {grid.flatMap((row, y) =>
                    row.map((cell, x) => {
                        if (cell !== 1) return null;
                        return (
                            <rect
                                key={`${x}-${y}`}
                                x={x * pixelSize}
                                y={y * pixelSize}
                                width={pixelSize}
                                height={pixelSize}
                                fill="black"
                                shapeRendering="crispEdges"
                            />
                        );
                    })
                )}
            </svg>
        );
    }

    const {
        headOrientation = "front",
        skinTone = "light",
        frontHairStyle = "centerPart",
        backHairStyle = "lowPonytail",
        hairColor = "brown",
        eyeColor = "dark",
        clothesColor = "blue",
        topStyle = "shirt",
        bottomStyle = "shorts",
        fullOutfitStyle = "none",
        shoeStyle = "boots",
        armPose = "down",
        legPose = "neutral",
        pixelSize = PIXEL_SIZE
    } = props;
    const layeredHeadMask = headMasks[headOrientation];
    const activeHairLayers = resolveHairLayers(frontHairStyle, backHairStyle, headOrientation);
    const activeTopLayers = (topStyles[topStyle].byOrientation as Record<string, readonly GarmentLayer[]> | undefined)?.[headOrientation] ?? topStyles[topStyle].fallback;
    const activeBottomLayers = (bottomStyles[bottomStyle].byOrientation as Record<string, readonly GarmentLayer[]> | undefined)?.[headOrientation] ?? bottomStyles[bottomStyle].fallback;
    const activeFullOutfitLayers =
        (fullOutfitStyles[fullOutfitStyle].byOrientation as Record<string, readonly GarmentLayer[]> | undefined)?.[headOrientation] ?? fullOutfitStyles[fullOutfitStyle].fallback;
    const activeShoeLayers = (shoeStyles[shoeStyle].byOrientation as Record<string, readonly GarmentLayer[]> | undefined)?.[headOrientation] ?? shoeStyles[shoeStyle].fallback;
    const activeGarmentLayers = [
        ...(fullOutfitStyle === "none" ? activeTopLayers : activeFullOutfitLayers),
        ...(fullOutfitStyle === "none" ? activeBottomLayers : []),
        ...activeShoeLayers
    ];
    const skinPalette = skinPalettes[skinTone];
    const hairPalette = hairPalettes[hairColor];
    const eyesPalette = eyePalettes[eyeColor];
    const clothesPalette = clothesPalettes[clothesColor];
    const viewBox = computeViewBox([
        ...bodyLayers,
        { mask: layeredHeadMask, offsetX: 1, offsetY: -5 },
        ...activeHairLayers,
        ...activeGarmentLayers
    ]);

    const renderHairLayers = (placement: HairLayer["placement"]) =>
        activeHairLayers.flatMap((layer, index) => {
            if (layer.placement !== placement) {
                return [];
            }

            return renderAutoShadedMask(
                layer.mask,
                hairPalette,
                { offsetX: layer.offsetX, offsetY: layer.offsetY, pixelSize },
                `hair-${frontHairStyle}-${backHairStyle}-${placement}-${headOrientation}-${index}`
            );
        });
    const shouldRenderGarmentLayer = (layer: GarmentLayer) => {
        if (layer.armPoses && !layer.armPoses.includes(armPose)) {
            return false;
        }
        if (layer.legPoses && !layer.legPoses.includes(legPose)) {
            return false;
        }

        return true;
    };

    const renderGarmentLayers = (placement: GarmentPlacement) =>
        activeGarmentLayers.flatMap((layer, index) => {
            if (layer.placement !== placement || !shouldRenderGarmentLayer(layer)) {
                return [];
            }

            return renderAutoShadedMask(
                layer.mask,
                clothesPalette,
                { offsetX: layer.offsetX, offsetY: layer.offsetY, pixelSize },
                `garment-${placement}-${headOrientation}-${index}`
            );
        });

    const allElements = [
        ...renderGarmentLayers("behindBody"),
        ...renderAutoShadedMask(legsMask, skinPalette, { offsetX: 2, offsetY: 13, pixelSize }, "legs"),
        ...renderAutoShadedMask(torsoMask, skinPalette, { offsetX: 2, offsetY: 6, pixelSize }, "torso"),
        ...renderAutoShadedMask(armsMask, skinPalette, { offsetX: 0, offsetY: 6, pixelSize }, "arms"),
        ...renderGarmentLayers("overBody"),
        ...renderHairLayers("behindHead"),
        ...renderAutoShadedMask(layeredHeadMask, skinPalette, { offsetX: 1, offsetY: -5, pixelSize }, `head-${headOrientation}`),
        ...renderTokenMask(
            eyesMask,
            { "1": eyesPalette.base, H: eyesPalette.highlight },
            { offsetX: 3, offsetY: 1, pixelSize },
            "eyes"
        ),
        ...renderHairLayers("front"),
        ...renderGarmentLayers("overlay")
    ];

    return (
        <svg
            width={viewBox.width}
            height={viewBox.height}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            style={{ imageRendering: "pixelated" }}
        >
            {allElements}
        </svg>
    );
}
