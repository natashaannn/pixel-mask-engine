interface TileRendererProps {
  mask: number[][]
  pixelSize?: number
}

// Palette indexed by cell value (0 = transparent, skip)
const palette: string[] = [
  "transparent", // 0: never rendered
  "#726962",    // 1: road dark gray
  "#8A7D78",    // 2: road lighter gray (curb / edge detail)
  "#FFFFFF",    // 3: white (lane markings)
  "#E9BFA7",    // 4: beige pavement base
  "#C4A090",    // 5: beige shadow
  "#F5D0BA",    // 6: beige highlight
  "#D4C4B4",    // 7: stone grout / joint lines
  "#6B4548",    // 8: brick main
  "#3E2830",    // 9: brick mortar / dark joints
  "#8C6870",    // 10: brick lighter highlight
]

export function TileRenderer({ mask, pixelSize = 12 }: TileRendererProps) {

  if (mask.length === 0) return null

  const width = mask[0].length * pixelSize
  const height = mask.length * pixelSize

  return (
    <svg width={width} height={height} style={{ display: 'block', imageRendering: 'pixelated' }}>
      {mask.map((row, y) =>
        row.map((cell, x) => {
          if (cell === 0) return null
          const fill = palette[cell]
          if (!fill) return null

          return (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill={fill}
            />
          )
        })
      )}
    </svg>
  )
}
