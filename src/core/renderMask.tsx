import { TILE } from "./grid"

export function renderMask(
    mask: string[], 
    colors: { base: string; shadow?: string, outline?: string; },
    offsetX = 0,
    offsetY = 0
) {
    return mask.flatMap((row, y) => 
        row.split("").map((cell,x) => {
            let fill = null;

            if (cell === "1") fill = colors.base;
            if (cell === "2") fill = colors.shadow;
            if (cell ==="3") fill = colors.outline;

            if (!fill) return null;

            return (
                <rect
                    key={`${x}-${y}`}
                    x={(x + offsetX) * TILE}
                    y={(y + offsetY) * TILE}
                    width={TILE}
                    height={TILE}
                    fill={fill}
                    shapeRendering="crispEdges"
                />
            )
        }
    )
);
}