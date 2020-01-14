import * as turf from '@turf/turf'
import { makeGeometry } from './utilities'
import { GeometryJSON, Geometry, Extent } from './geometry'
import {
  Shape,
  LINE,
  POLYGON,
  POINT,
  POINT_RADIUS,
  BOUNDING_BOX,
} from '../shapes'
import { LengthUnit, METERS } from './units'

type geometryProps = {
  id: string
  geometry: Geometry
  shape: Shape
  buffer?: number
  bufferUnit?: LengthUnit
  properties?: object
}

const makeGeometryJSONFromGeometry = ({
  id,
  geometry,
  shape,
  buffer = 0,
  bufferUnit = METERS,
  properties = {},
}: geometryProps): GeometryJSON =>
  makeGeometry(
    id,
    geometry,
    properties && (properties as any).color ? (properties as any).color : '',
    shape,
    buffer,
    bufferUnit,
    properties
  )

/**
 * Creates a Point GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makePointGeo = (
  id: string,
  lat: number,
  lon: number,
  properties: object = {}
): GeometryJSON =>
  makeGeometryJSONFromGeometry({
    id,
    geometry: {
      type: 'Point',
      coordinates: [lon, lat],
    } as turf.Point,
    shape: POINT,
    properties,
  })

/**
 * Creates a Point Radius GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param radius - radius length
 * @param radiusUnit - radius length unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makePointRadiusGeo = (
  id: string,
  lat: number,
  lon: number,
  radius: number,
  radiusUnit: LengthUnit,
  properties: object = {}
): GeometryJSON =>
  makeGeometryJSONFromGeometry({
    id,
    geometry: {
      type: 'Point',
      coordinates: [lon, lat],
    } as turf.Point,
    shape: POINT_RADIUS,
    buffer: radius,
    bufferUnit: radiusUnit,
    properties,
  })

/**
 * Creates a Polygon GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makePolygonGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit,
  properties: object = {}
): GeometryJSON =>
  makeGeometryJSONFromGeometry({
    id,
    geometry: {
      type: 'Polygon',
      coordinates: [[...lonLatCoordinateList, lonLatCoordinateList[0]]],
    } as turf.Polygon,
    shape: POLYGON,
    buffer,
    bufferUnit,
    properties,
  })

/**
 * Creates a Line GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makeLineGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit,
  properties: object = {}
): GeometryJSON =>
  makeGeometryJSONFromGeometry({
    id,
    geometry: {
      type: 'LineString',
      coordinates: lonLatCoordinateList,
    } as turf.LineString,
    shape: LINE,
    buffer,
    bufferUnit,
    properties,
  })

/**
 * Creates a Bounding Box GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param extent - Extent of bounding box
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
const makeBBoxGeo = (
  id: string,
  extent: Extent,
  properties: object = {}
): GeometryJSON =>
  makeGeometryJSONFromGeometry({
    id,
    geometry: {
      ...turf.bboxPolygon(extent).geometry,
    } as turf.Polygon,
    shape: BOUNDING_BOX,
    properties,
  })

export {
  makeBBoxGeo,
  makeLineGeo,
  makePointGeo,
  makePointRadiusGeo,
  makePolygonGeo,
}
