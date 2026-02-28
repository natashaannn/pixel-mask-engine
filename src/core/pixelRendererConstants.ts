import { TILE } from "./grid";

export const PIXEL_SIZE = TILE;

export type AutoShadePalette = {
    base: string;
    shadow: string;
    highlight: string;
    outline: string;
};

export type RenderOptions = {
    offsetX?: number;
    offsetY?: number;
    pixelSize?: number;
};
