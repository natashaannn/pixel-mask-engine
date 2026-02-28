export * from "./avatar/styles";

// convenience exports for consumers that want to render or compose
// avatars without digging into the subdirectories.
export { Avatar } from "./components/Avatar";
export { composeAvatar } from "./avatar/composeAvatar";
export { default as AvatarRenderer } from "./avatar/Avatar";
export type { AvatarConfig, RenderedAvatar } from "./avatar/types";