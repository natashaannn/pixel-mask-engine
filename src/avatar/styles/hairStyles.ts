import type { PixelMask } from "../../core/maskUtils";
import { bangsFrontMask } from "../masks/hair/bangsFront.mask";
import { centerPartFrontMask } from "../masks/hair/centerPartFront.mask";
import { ponytailBackMask } from "../masks/hair/ponytailBack.mask";
import { shortCroppedBackMask } from "../masks/hair/shortCroppedBack.mask";
import { sideSweptFrontMask } from "../masks/hair/sideSweptFront.mask";
import { headMasks } from "../masks/head.mask";

type HeadOrientation = keyof typeof headMasks;

export type HairLayer = {
    mask: PixelMask;
    offsetX: number;
    offsetY: number;
    placement: "behindHead" | "front";
};

type HairFamilyDefinition = {
    byOrientation: Partial<Record<HeadOrientation, readonly HairLayer[]>>;
    fallback: readonly HairLayer[];
};

export type FrontHairStyle = "centerPart" | "bangs" | "sideSwept";
export type BackHairStyle = "highPonytail" | "lowPonytail" | "doubleHighPonytail" | "doubleLowPonytail" | "shortCropped";

const FRONT_CENTER_PART = [{ mask: centerPartFrontMask, offsetX: 1, offsetY: -5, placement: "front" }] as const;
const FRONT_BANGS = [{ mask: bangsFrontMask, offsetX: 1, offsetY: -5, placement: "front" }] as const;
const FRONT_SIDE_SWEPT = [{ mask: sideSweptFrontMask, offsetX: 1, offsetY: -5, placement: "front" }] as const;

const BACK_SHORT_CROPPED = [{ mask: shortCroppedBackMask, offsetX: 1, offsetY: -5, placement: "behindHead" }] as const;

// Helper function to create inverted mask for left side
const createInvertedMask = (mask: string[]): string[] => {
    return mask.map(row => row.split('').reverse().join(''));
};

const BACK_LOW_PONYTAIL = {
    byOrientation: {
        front: [{ mask: ponytailBackMask, offsetX: 3, offsetY: 0, placement: "behindHead" }],
        back: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -5, placement: "behindHead" }],
        left: [{ mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" }],
        right: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -5, placement: "behindHead" }]
    },
    fallback: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -5, placement: "behindHead" }]
} as const;

const BACK_HIGH_PONYTAIL = {
    byOrientation: {
        front: [{ mask: ponytailBackMask, offsetX: 4, offsetY: -3, placement: "behindHead" }],
        back: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -8, placement: "behindHead" }],
        left: [{ mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -8, placement: "behindHead" }],
        right: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -8, placement: "behindHead" }]
    },
    fallback: [{ mask: ponytailBackMask, offsetX: 1, offsetY: -8, placement: "behindHead" }]
} as const;

const BACK_DOUBLE_HIGH_PONYTAIL = {
    byOrientation: {
        front: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
        ],
        back: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
        ],
        left: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
        ],
        right: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
        ]
    },
    fallback: [
        { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
        { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
    ]
} as const;

const BACK_DOUBLE_LOW_PONYTAIL = {
    byOrientation: {
        front: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: 0, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: 0, placement: "behindHead" }
        ],
        back: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: 0, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: 0, placement: "behindHead" }
        ],
        left: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: 0, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: 0, placement: "behindHead" }
        ],
        right: [
            { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: 0, placement: "behindHead" },
            { mask: ponytailBackMask, offsetX: 4, offsetY: 0, placement: "behindHead" }
        ]
    },
    fallback: [
        { mask: createInvertedMask(ponytailBackMask), offsetX: -2, offsetY: -5, placement: "behindHead" },
        { mask: ponytailBackMask, offsetX: 4, offsetY: -5, placement: "behindHead" }
    ]
} as const;

export const frontHairStyles = {
    centerPart: { byOrientation: {} as Partial<Record<HeadOrientation, readonly HairLayer[]>>, fallback: FRONT_CENTER_PART },
    bangs: { byOrientation: {} as Partial<Record<HeadOrientation, readonly HairLayer[]>>, fallback: FRONT_BANGS },
    sideSwept: { byOrientation: {} as Partial<Record<HeadOrientation, readonly HairLayer[]>>, fallback: FRONT_SIDE_SWEPT }
} as const satisfies Record<FrontHairStyle, HairFamilyDefinition>;

export const backHairStyles = {
    highPonytail: BACK_HIGH_PONYTAIL,
    lowPonytail: BACK_LOW_PONYTAIL,
    doubleHighPonytail: BACK_DOUBLE_HIGH_PONYTAIL,
    doubleLowPonytail: BACK_DOUBLE_LOW_PONYTAIL,
    shortCropped: { byOrientation: {} as Partial<Record<HeadOrientation, readonly HairLayer[]>>, fallback: BACK_SHORT_CROPPED }
} as const satisfies Record<BackHairStyle, HairFamilyDefinition>;

export function resolveHairLayers(
    frontHairStyle: FrontHairStyle,
    backHairStyle: BackHairStyle,
    headOrientation: HeadOrientation
): readonly HairLayer[] {
    const frontLayers = frontHairStyles[frontHairStyle].byOrientation[headOrientation] ?? frontHairStyles[frontHairStyle].fallback;
    const backLayers = backHairStyles[backHairStyle].byOrientation[headOrientation] ?? backHairStyles[backHairStyle].fallback;

    return [...backLayers, ...frontLayers];
}
