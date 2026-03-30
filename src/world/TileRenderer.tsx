interface TileRendererProps {
  mask: number[][]
  pixelSize?: number
}

const palette = [
    "726962", // gray road
    "white",
    "E9BFA7", // beige pavement
    "5B4144" // grayish-red brick pavement
]

export function TileRenderer({ mask, pixelSize = 12 }: TileRendererProps) {

  const width = mask[0].length * pixelSize
  const height = mask.length * pixelSize

  return (
    <svg width={width} height={height}>
      {mask.map((row, y) =>
        row.map((cell, x) => {

          if (cell === 0) return null

          return (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={palette[cell]}
            />
          )
        })
      )}
    </svg>
  )
}