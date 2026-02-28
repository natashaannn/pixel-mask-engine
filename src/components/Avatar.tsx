import { composeAvatar } from "../avatar/composeAvatar";
import { AvatarConfig } from "../avatar/types";
import AvatarRenderer from "../avatar/Avatar";

interface Props {
  config: AvatarConfig
  pixelSize?: number
}

export function Avatar({ config, pixelSize }: Props) {
  const avatar = composeAvatar(config);

  return <AvatarRenderer avatar={avatar} pixelSize={pixelSize} />;
}