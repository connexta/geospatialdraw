import * as turf from '@turf/turf'
import { Shape, POLYGON } from '../shapes/shape'
import { LengthUnit, METERS } from './units'

/**
 * 2D extent of a geometry represented as an array in the format of
 * [minimumX, minimumY, maximumX, maximumY]
 */
type Extent = [number, number, number, number]

/**
 * GeometryJSON Buffer property
 */
type Buffer = {
  /**
   * Buffer width
   */
  width: number
  /**
   * Buffer size unit of measurement
   */
  unit: LengthUnit
}

/**
 * Custom GeoJSON properties used in GeometryJSON
 */
type GeometryJSONProperties = {
  /**
   * CSS color of geometry
   */
  color: string
  /**
   * Shape of geometry
   */
  shape: Shape
  /**
   * Buffer properties
   */
  buffer?: Buffer
  /**
   * Unique identifier
   */
  id: string
}

const DEFAULT_PROPERTIES: GeometryJSONProperties = {
  shape: POLYGON,
  id: '',
  color: '',
  buffer: {
    width: 0,
    unit: METERS,
  },
}

/**
 * GeoJSON Geometries supported by GeometryJSON
 */
type Geometry = turf.Polygon | turf.Point | turf.LineString

/**
 * Extended GeoJSON used to represent map geometry.
 * For details on GeoJSON see: https://geojson.org/
 */
type GeometryJSON = turf.Feature & {
  bbox: Extent
  properties: GeometryJSONProperties
  geometry: Geometry
}

const DEFAULT_POLYGON: turf.Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [0, 0],
      [0, 0],
    ],
  ],
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

/**
 * Class name added to feature "class" property to identify buffer features
 * in user defined styles.
 */
const BUFFER_CLASSNAME = 'buffer'

/**
 * Class name added to feature "class" property to identify hidden features
 * in user defined styles.
 */
const HIDDEN_CLASSNAME = 'hidden'

export {
  Buffer,
  GeometryJSON,
  GeometryJSONProperties,
  Geometry,
  Extent,
  BUFFER_CLASSNAME,
  HIDDEN_CLASSNAME,
  DEFAULT_GEOMETRY,
  DEFAULT_PROPERTIES,
}
