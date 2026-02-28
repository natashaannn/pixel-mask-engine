import { AvatarConfig, RenderedAvatar } from "./types"
import { mergeMasks } from "../core/renderer"

export function composeAvatar(config: AvatarConfig): RenderedAvatar {

  const layers = [
    ...(config.legs ?? []),
    ...(config.torso ?? []),
    ...(config.arms ?? []),
    ...(config.head ?? []),
    ...(config.eyes ?? []),
    ...(config.hair ?? [])
  ]

  const grid = mergeMasks(layers)

  return { grid }
}