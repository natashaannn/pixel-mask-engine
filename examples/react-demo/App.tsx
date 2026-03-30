import { AvatarRenderer as Avatar } from "../../src";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Pixel Mask Avatar Demo</h1>
      <Avatar hairColor="black" backHairStyle="lowPonytail" eyeColor="blue" clothesColor="blue" topStyle="shirt" />
    </div>
  );
}