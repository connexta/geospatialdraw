import * as turf from '@turf/turf'
import { Shape, BOUNDING_BOX, POINT_RADIUS } from '../shapes/shape'
import ShapeDetector from '../shapes/shape-detector'
import { LengthUnit, METERS } from './units'
import {
  Buffer,
  GeometryJSON,
  GeometryJSONProperties,
  Geometry,
  Extent,
  BUFFER_CLASSNAME,
  DEFAULT_GEOMETRY,
  DEFAULT_PROPERTIES,
} from './geometry'
import { getDistanceInMeters } from '../internal/distance'

function cloneDeep<T>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}

const MINIMUM_BUFFERED_POLYGON_COORDINATE_LENGTH = 4
const MINIMUM_BUFFERED_LINE_COORDINATE_LENGTH = 2

const shapeDetector = new ShapeDetector()

/**
 * Returns a buffer property for the geometry
 * providing a default empty value if there is no
 * buffer property present
 * @param properties - GeometryJSON properties
 *
 * @returns Buffer
 */
const getBufferPropOrDefault = (properties: GeometryJSONProperties): Buffer =>
  properties.buffer ? properties.buffer : { width: 0, unit: METERS }

/**
 * Creates a full GeometryJSON object from a Feature or Geometry GeoJSON object
 *
 * @param id - unique id for geometry
 * @param json - GeoJSON object
 *
 * @returns GeometryJSON
 */
const geoJSONToGeometryJSON = (id: string, json: any): GeometryJSON => {
  const shape = shapeDetector.shapeFromGeoJSON(json as GeometryJSON)
  const properties = json.properties || {}
  const { width, unit } = getBufferPropOrDefault(properties)
  return makeGeometry(
    id,
    json,
    properties.color || '',
    shape,
    width,
    unit,
    properties
  )
}

/**
 * Creates a full GeometryJSON object from a GeoJSON Geometry object
 *
 * @param id - unique id for geometry
 * @param geometryGeoJSON - GeoJSON Geometry object to extend
 * @param color - CSS color for geometry
 * @param shape - geometry shape
 * @param [buffer] - buffer size
 * @param [bufferUnit] - buffer size unit of measurement
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makeGeometry = (
  id: string,
  geometryGeoJSON: any,
  color: string,
  shape: Shape,
  buffer: number = 0,
  bufferUnit: LengthUnit = METERS,
  properties: object = {}
): GeometryJSON => {
  const geometry: Geometry = turf.getGeom(cloneDeep(geometryGeoJSON))
  const json: GeometryJSON = {
    type: 'Feature',
    properties: {
      ...properties,
      id,
      color,
      shape,
      buffer: {
        width: buffer,
        unit: bufferUnit,
      },
    },
    geometry,
    bbox: [0, 0, 0, 0],
  }
  json.bbox = geoToExtent(makeBufferedGeo(json))
  return json
}

/**
 * Creates an empty GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param shape - geometry shape
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makeEmptyGeometry = (
  id: string,
  shape: Shape,
  properties: object = {}
): GeometryJSON => ({
  type: 'Feature',
  properties: {
    ...DEFAULT_PROPERTIES,
    ...properties,
    shape,
    id,
    buffer: {
      width: shape === POINT_RADIUS ? Number.MIN_VALUE : 0,
      unit: METERS,
    },
  },
  bbox: [0, 0, 0, 0],
  geometry: cloneDeep(DEFAULT_GEOMETRY[shape]),
})

/**
 * Creates a buffered GeometryJSON object from a source
 * GeometryJSON object using it's geometry and buffer values
 *
 * @param geo - source GeometryJSON object
 *
 * @returns GeometryJSON with buffer applied
 */
const makeBufferedGeo = (geo: GeometryJSON): GeometryJSON => {
  if (
    ((geo.geometry.type === 'Polygon' &&
      (geo.geometry as turf.Polygon).coordinates[0].length >=
        MINIMUM_BUFFERED_POLYGON_COORDINATE_LENGTH) ||
      (geo.geometry.type === 'LineString' &&
        (geo.geometry as turf.LineString).coordinates.length >=
          MINIMUM_BUFFERED_LINE_COORDINATE_LENGTH) ||
      geo.geometry.type === 'Point') &&
    geo.properties.shape !== BOUNDING_BOX &&
    geo.properties.buffer &&
    geo.properties.buffer.width > 0
  ) {
    // Copy JSON since turf.buffer has side effects
    geo = cloneDeep(geo)
    const { width, unit } = getBufferPropOrDefault(geo.properties)
    const radius = getDistanceInMeters(width, unit)
    let bufferedGeo
    if (geo.geometry.type === 'Point') {
      if (radius > 0) {
        const point = geo.geometry as turf.Point
        bufferedGeo = turf.circle(point.coordinates, radius, {
          units: 'meters',
        })
        bufferedGeo = {
          ...geo,
          geometry: bufferedGeo.geometry,
        }
      } else {
        bufferedGeo = geo
      }
    } else {
      bufferedGeo = turf.buffer(geo, radius, {
        units: 'meters',
      })
    }
    if (bufferedGeo === undefined) {
      return geo
    } else if (bufferedGeo.properties) {
      bufferedGeo.properties.class = (
        bufferedGeo.properties.class || []
      ).concat(BUFFER_CLASSNAME)
    }
    return bufferedGeo as GeometryJSON
  }
  return geo
}

/**
 * Converts an arbitrary bbox value from GeoJSON to a 2D extent value
 *
 * @param bbox - 2D/3D GeoJSON bbox value
 *
 * @returns Extent
 */
const bboxToExtent = (bbox: turf.BBox): Extent => [
  bbox[0],
  bbox[1],
  bbox[2],
  bbox[3],
]

/**
 * Calculates the 2D extent of a GeometryJSON object
 *
 * @param geo - GeometryJSON or Geometry object
 *
 * @returns Extent
 */
const geoToExtent = (geo: GeometryJSON | Geometry): Extent => {
  return bboxToExtent(turf.bbox(geo))
}

const bboxMinX = 0
const bboxMinY = 1
const bboxMaxX = 2
const bboxMaxY = 3

/**
 * Calculates the combined 2D extent of an array of 2D extents
 *
 * @param extentList - array of extents if this is empty then [0, 0, 0, 0] is returned
 *
 * @returns Extent
 */
const combineExtents = (extentList: Extent[]): Extent =>
  extentList.length > 0
    ? extentList.reduce(
        (total: Extent, current: Extent) => {
          total[bboxMinX] = Math.min(total[bboxMinX], current[bboxMinX])
          total[bboxMinY] = Math.min(total[bboxMinY], current[bboxMinY])
          total[bboxMaxX] = Math.max(total[bboxMaxX], current[bboxMaxX])
          total[bboxMaxY] = Math.max(total[bboxMaxY], current[bboxMaxY])
          return total
        },
        [
          Number.MAX_SAFE_INTEGER,
          Number.MAX_SAFE_INTEGER,
          Number.MIN_SAFE_INTEGER,
          Number.MIN_SAFE_INTEGER,
        ]
      )
    : [0, 0, 0, 0]

export {
  bboxToExtent,
  combineExtents,
  geoToExtent,
  makeBufferedGeo,
  makeEmptyGeometry,
  makeGeometry,
  geoJSONToGeometryJSON,
  getBufferPropOrDefault,
}
