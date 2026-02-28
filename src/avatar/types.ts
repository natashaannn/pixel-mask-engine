import { PixelMask as CorePixelMask } from "../core/maskUtils";

// masks used to build an avatar configuration are the same string-based
// pixel masks used throughout the core code.  we re-export the type here so
// callers of composeAvatar don't need to know about the core module.
export type PixelMask = CorePixelMask;

// the avatar renderer used by `composeAvatar` produces a simple numeric grid
// where each cell is either 0 or 1 (empty or filled).
export type PixelCell = 0 | 1;

export type AvatarPart =
  | "head"
  | "eyes"
  | "hair"
  | "torso"
  | "arms"
  | "legs";

export interface AvatarConfig {
  head?: PixelMask[];
  eyes?: PixelMask[];
  hair?: PixelMask[];
  torso?: PixelMask[];
  arms?: PixelMask[];
  legs?: PixelMask[];
}

export interface RenderedAvatar {
  grid: PixelCell[][];
}