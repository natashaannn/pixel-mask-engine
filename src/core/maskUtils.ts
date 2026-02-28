export type PixelMask = readonly string[];

export type MaskPoint = {
    x: number;
    y: number;
};

export function getMaskWidth(mask: PixelMask): number {
    return mask[0]?.length ?? 0;
}

export function getMaskHeight(mask: PixelMask): number {
    return mask.length;
}

export function isInsideMask(mask: PixelMask, x: number, y: number): boolean {
    return y >= 0 && y < getMaskHeight(mask) && x >= 0 && x < getMaskWidth(mask);
}

export function isFilled(mask: PixelMask, x: number, y: number): boolean {
    if (!isInsideMask(mask, x, y)) {
        return false;
    }

    return mask[y][x] === "1";
}

export function toPointKey(x: number, y: number): string {
    return `${x},${y}`;
}

export function fromPointKey(key: string): MaskPoint {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
}

export function forEachFilledPixel(
    mask: PixelMask,
    callback: (point: MaskPoint) => void
): void {
    for (let y = 0; y < mask.length; y += 1) {
        const row = mask[y];
        for (let x = 0; x < row.length; x += 1) {
            if (row[x] === "1") {
                callback({ x, y });
            }
        }
    }
}
