import { createElement } from "react";
import { computeHighlightPixels, computeOutlinePixels, computeShadowPixels, toPoints } from "./lighting";
import { forEachFilledPixel, type PixelMask } from "./maskUtils";
import { PIXEL_SIZE, type AutoShadePalette, type RenderOptions } from "./pixelRendererConstants";

function pixelRect(
    key: string,
    x: number,
    y: number,
    fill: string,
    offsetX: number,
    offsetY: number,
    pixelSize: number
) {
    return createElement(
        "rect",
        {
            key,
            x: (x + offsetX) * pixelSize,
            y: (y + offsetY) * pixelSize,
            width: pixelSize,
            height: pixelSize,
            fill,
            shapeRendering: "crispEdges"
        }
    );
}

export function renderAutoShadedMask(
    mask: PixelMask,
    palette: AutoShadePalette,
    options: RenderOptions = {},
    maskId: string = ""
) {
    const offsetX = options.offsetX ?? 0;
    const offsetY = options.offsetY ?? 0;
    const pixelSize = options.pixelSize ?? PIXEL_SIZE;

    const outlinePixels = toPoints(computeOutlinePixels(mask));
    const shadowPixels = toPoints(computeShadowPixels(mask));
    const highlightPixels = toPoints(computeHighlightPixels(mask));

    const basePixels: Array<{ x: number; y: number }> = [];
    forEachFilledPixel(mask, (point) => {
        basePixels.push(point);
    });

    const keyPrefix = maskId ? `${maskId}-` : "";

    return [
        ...outlinePixels.map(({ x, y }) =>
            pixelRect(`${keyPrefix}outline-${x}-${y}`, x, y, palette.outline, offsetX, offsetY, pixelSize)
        ),
        ...basePixels.map(({ x, y }) =>
            pixelRect(`${keyPrefix}base-${x}-${y}`, x, y, palette.base, offsetX, offsetY, pixelSize)
        ),
        ...shadowPixels.map(({ x, y }) =>
            pixelRect(`${keyPrefix}shadow-${x}-${y}`, x, y, palette.shadow, offsetX, offsetY, pixelSize)
        ),
        ...highlightPixels.map(({ x, y }) =>
            pixelRect(`${keyPrefix}highlight-${x}-${y}`, x, y, palette.highlight, offsetX, offsetY, pixelSize)
        )
    ];
}

export function renderTokenMask(
    mask: readonly string[],
    tokenColors: Record<string, string>,
    options: RenderOptions = {},
    maskId: string = ""
) {
    const offsetX = options.offsetX ?? 0;
    const offsetY = options.offsetY ?? 0;
    const pixelSize = options.pixelSize ?? PIXEL_SIZE;
    const keyPrefix = maskId ? `${maskId}-` : "";

    return mask.flatMap((row, y) =>
        row.split("").flatMap((token, x) => {
            const fill = tokenColors[token];
            if (!fill) {
                return [];
            }

            return [
                pixelRect(
                    `${keyPrefix}${token}-${x}-${y}`,
                    x,
                    y,
                    fill,
                    offsetX,
                    offsetY,
                    pixelSize
                )
            ];
        })
    );
}
