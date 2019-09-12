import * as turf from '@turf/turf'
import { makeGeometry } from './utilities'
import { GeometryJSON, Geometry, Extent, DEFAULT_PROPERTIES } from './geometry'
import { Shape } from '../shape-utils'
import { LengthUnit } from './units'

const makeGeometryJSONFromGeometry = (
  id: string,
  geometry: Geometry,
  shape: Shape,
  buffer: number = 0,
  bufferUnit: LengthUnit = DEFAULT_PROPERTIES.bufferUnit
): GeometryJSON =>
  makeGeometry(
    id,
    geometry,
    DEFAULT_PROPERTIES.color,
    shape,
    buffer,
    bufferUnit
  )

const makePointGeo = (id: string, lat: number, lon: number): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Point',
      coordinates: [lon, lat],
    } as turf.Point,
    'Point'
  )

const makePointRadiusGeo = (
  id: string,
  lat: number,
  lon: number,
  radius: number,
  radiusUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Point',
      coordinates: [lon, lat],
    } as turf.Point,
    'Point Radius',
    radius,
    radiusUnit
  )

const makePolygonGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'Polygon',
      coordinates: [[...lonLatCoordinateList, lonLatCoordinateList[0]]],
    } as turf.Polygon,
    'Polygon',
    buffer,
    bufferUnit
  )

const makeLineGeo = (
  id: string,
  lonLatCoordinateList: [number, number][],
  buffer: number,
  bufferUnit: LengthUnit
): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      type: 'LineString',
      coordinates: lonLatCoordinateList,
    } as turf.LineString,
    'Line',
    buffer,
    bufferUnit
  )

const makeBBoxGeo = (id: string, extent: Extent): GeometryJSON =>
  makeGeometryJSONFromGeometry(
    id,
    {
      ...turf.bboxPolygon(extent).geometry,
    } as turf.Polygon,
    'Bounding Box'
  )

export {
  makeBBoxGeo,
  makeLineGeo,
  makePointGeo,
  makePointRadiusGeo,
  makePolygonGeo,
}
