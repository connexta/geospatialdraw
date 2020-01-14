/**
 * All supported GeometryJSON shapes
 */
export type Shape =
  | 'Polygon'
  | 'Bounding Box'
  | 'Point Radius'
  | 'Point'
  | 'Line'

export const POLYGON: Shape = 'Polygon'
export const POINT: Shape = 'Point'
export const POINT_RADIUS: Shape = 'Point Radius'
export const CIRCLE = POINT_RADIUS
export const LINE: Shape = 'Line'
export const BOUNDING_BOX: Shape = 'Bounding Box'
export const BBOX = BOUNDING_BOX
