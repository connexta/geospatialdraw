import { GeometryJSON } from '../../geometry/geometry'
import { LengthUnit, METERS } from '../../geometry/units'
import { makePolygonGeo, makeLineGeo } from '../../geometry/shape-factory'
import { LatLonDD } from '../coordinate-converter'
import BaseGeometry from './base-geometry'
import * as turf from '@turf/turf'

type Coordinates = [number, number][]

type PolygonLine = BaseGeometry & {
  coordinates: Coordinates
  buffer: number
  bufferUnit: LengthUnit
}

/**
 * Describes a polygon geometry object
 */
type Polygon = PolygonLine

/**
 * Describes a line geometry object
 */
type Line = PolygonLine

const polygonPropsToGeo = ({
  id,
  coordinates,
  buffer,
  bufferUnit,
  properties,
}: Polygon) => makePolygonGeo(id, coordinates, buffer, bufferUnit, properties)

const linePropsToGeo = ({
  id,
  coordinates,
  buffer,
  bufferUnit,
  properties,
}: Line) => makeLineGeo(id, coordinates, buffer, bufferUnit, properties)

const geoToPolygonProps = ({ properties, geometry }: GeometryJSON): Polygon => {
  const coordinates = (geometry as turf.Polygon).coordinates[0] as [
    number,
    number
  ][]
  return {
    id: properties.id,
    coordinates:
      coordinates.length < 2
        ? [[0, 0]]
        : coordinates.slice(0, coordinates.length - 1),
    buffer: properties.buffer ? properties.buffer.width : 0,
    bufferUnit: properties.buffer ? properties.buffer.unit : METERS,
    properties,
  }
}

const geoToLineProps = ({ properties, geometry }: GeometryJSON): Line => {
  const coordinates = (geometry as turf.LineString).coordinates as [
    number,
    number
  ][]
  return {
    id: properties.id,
    coordinates: coordinates.length < 1 ? [[0, 0]] : coordinates,
    buffer: properties.buffer ? properties.buffer.width : 0,
    bufferUnit: properties.buffer ? properties.buffer.unit : METERS,
    properties,
  }
}

/**
 * Converts a [number, number] lon lat coordinate pair to a LatLonDD object
 */
const coordinateArrayValueToLatLon = (
  coordinate: [number, number]
): LatLonDD => ({
  lat: coordinate[1],
  lon: coordinate[0],
})

export {
  Polygon,
  Line,
  coordinateArrayValueToLatLon,
  polygonPropsToGeo,
  linePropsToGeo,
  geoToPolygonProps,
  geoToLineProps,
}
