export type TileId = 
    "road" |
    "beige_pavement" |
    "brick_pavement"
export interface WorldCell {
  tile: TileId
}

export type WorldGrid = WorldCell[][]