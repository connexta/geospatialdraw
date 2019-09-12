import * as turf from '@turf/turf'
import { Shape } from '../shape-utils'
import { LengthUnit, METERS } from './units'

type Extent = [number, number, number, number]

type GeometryJSONProperties = {
  color: string
  shape: Shape
  buffer?: number
  bufferUnit: LengthUnit
  id: string
}

const DEFAULT_PROPERTIES: GeometryJSONProperties = {
  shape: 'Polygon',
  id: '',
  color: 'blue',
  buffer: 0,
  bufferUnit: METERS,
}

type Geometry = turf.Polygon | turf.Point | turf.LineString

type GeometryJSON = turf.Feature & {
  bbox: Extent
  properties: GeometryJSONProperties
  geometry: Geometry
}

const DEFAULT_POLYGON: turf.Polygon = {
  type: 'Polygon',
  coordinates: [[[0, 0]]],
}

const DEFAULT_POINT: turf.Point = {
  type: 'Point',
  coordinates: [0, 0],
}

const DEFAULT_GEOMETRY: { [shape in Shape]: Geometry } = {
  Polygon: DEFAULT_POLYGON,
  'Bounding Box': DEFAULT_POLYGON,
  'Point Radius': DEFAULT_POINT,
  Line: {
    type: 'LineString',
    coordinates: [[0, 0]],
  },
  Point: DEFAULT_POINT,
}
const CIRCLE_BUFFER_PROPERTY_VALUE = 'circle'
const POLYGON_LINE_BUFFER_PROPERTY_VALUE = 'polygon/line'
const BUFFER_SHAPE_PROPERTY = 'bufferShape'
type BufferShape = 'circle' | 'polygon/line'

export {
  GeometryJSON,
  GeometryJSONProperties,
  Geometry,
  BufferShape,
  Extent,
  BUFFER_SHAPE_PROPERTY,
  CIRCLE_BUFFER_PROPERTY_VALUE,
  DEFAULT_GEOMETRY,
  DEFAULT_PROPERTIES,
  POLYGON_LINE_BUFFER_PROPERTY_VALUE,
}
