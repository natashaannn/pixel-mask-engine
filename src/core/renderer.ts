import { PixelMask } from "./maskUtils";

export type PixelCell = 0 | 1;

/**
 * Merge an array of pixel masks into a single grid.  All masks are assumed to
 * be aligned at their top-left corner; overlapping "filled" cells ("1") will
 * result in a 1 in the output grid.  The returned grid will be sized to fit
 * every mask.
 */
export function mergeMasks(masks: PixelMask[]): PixelCell[][] {
  // determine the dimensions required to hold every mask
  let width = 0;
  let height = 0;

  masks.forEach((mask) => {
    height = Math.max(height, mask.length);
    if (mask.length) {
      width = Math.max(width, mask[0].length);
    }
  });

  // initialise the grid with zeros
  const grid: PixelCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0 as PixelCell)
  );

  masks.forEach((mask) => {
    mask.forEach((row, y) => {
      for (let x = 0; x < row.length; x += 1) {
        if (row[x] === "1") {
          grid[y][x] = 1;
        }
      }
    });
  });

  return grid;
}
