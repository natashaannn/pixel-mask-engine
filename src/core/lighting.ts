import {
    forEachFilledPixel,
    fromPointKey,
    isFilled,
    toPointKey,
    type PixelMask
} from "./maskUtils";

const CARDINAL_DIRECTIONS = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
];

export function computeOutlinePixels(mask: PixelMask): Set<string> {
    const outline = new Set<string>();

    forEachFilledPixel(mask, ({ x, y }) => {
        for (const direction of CARDINAL_DIRECTIONS) {
            const nx = x + direction.x;
            const ny = y + direction.y;

            if (!isFilled(mask, nx, ny)) {
                outline.add(toPointKey(nx, ny));
            }
        }
    });

    return outline;
}

export function computeShadowPixels(mask: PixelMask): Set<string> {
    const shadow = new Set<string>();

    forEachFilledPixel(mask, ({ x, y }) => {
        const hasTopNeighbor = isFilled(mask, x, y - 1);
        const hasLeftNeighbor = isFilled(mask, x - 1, y);
        const hasBottomGap = !isFilled(mask, x, y + 1);
        const hasRightGap = !isFilled(mask, x + 1, y);

        if ((hasTopNeighbor || hasLeftNeighbor) && (hasBottomGap || hasRightGap)) {
            shadow.add(toPointKey(x, y));
        }
    });

    return shadow;
}

export function computeHighlightPixels(mask: PixelMask): Set<string> {
    const highlight = new Set<string>();

    forEachFilledPixel(mask, ({ x, y }) => {
        const hasTopGap = !isFilled(mask, x, y - 1);
        const hasLeftGap = !isFilled(mask, x - 1, y);

        if (hasTopGap || hasLeftGap) {
            highlight.add(toPointKey(x, y));
        }
    });

    return highlight;
}

export function toPoints(pointKeys: Set<string>): Array<{ x: number; y: number }> {
    return Array.from(pointKeys).map(fromPointKey);
}
