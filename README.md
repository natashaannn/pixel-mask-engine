# Pixel Mask Engine

A TypeScript library for composing and rendering pixel-art avatars using layered masks, palettes, and configurable styles.

## Features

- Build avatars by combining head, hair, body, and clothing masks
- Supports multiple orientations, hair & garment styles, and palettes
- React component for rendering avatars plus standalone core utilities
- Example React demo included in `examples/react-demo`

## Getting Started

### Requirements

- Node.js 18+ (or any compatible modern Node release)
- npm or yarn for package management

### Installation

Clone the repository and install dependencies:

```sh
git clone <repo-url> pixel-mask-engine
cd pixel-mask-engine
npm install
```

### Development

Run the example app using Vite:

```sh
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser to see the demo.

### Build

Compile the library for distribution with:

```sh
npm run build
```

The output will be generated in the `dist` folder (configured by `tsup`).

## Usage

Import from the package in your own project:

```ts
import Avatar from "pixel-mask-engine";

<Avatar
  headOrientation="front"
  skinTone="medium"
  hairColor="black"
  clothesColor="green"
  topStyle="shirt"
  bottomStyle="shorts"
/>
```

For more advanced customization, refer to the types in `src/avatar/types.ts` and the style definitions under `src/avatar/styles`.

## Avatar Variations

The engine currently supports over 7,500 unique combinations of hair styles, colors, clothing styles, and palettes. Additional options for skin tones, eye colors, and poses further increase possible avatars.

## Project Structure

```
src/                # main library code
  avatar/           # avatar-specific logic and React component
  core/             # rendering engine, masks, palettes
examples/           # demo applications
docs/               # documentation (if any)
```

## Contributing

Contributions are welcome! Please open issues or pull requests for new features or bug fixes.

## License

Specify license information here.
