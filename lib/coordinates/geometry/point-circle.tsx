import { GeometryJSON } from '../../geometry/geometry'
import { LengthUnit, METERS } from '../../geometry/units'
import { makePointRadiusGeo, makePointGeo } from '../../geometry/shape-factory'
import BaseGeometry from './base-geometry'
import * as turf from '@turf/turf'

const LAT_COORDINATE = 1
const LON_COORDINATE = 0

/**
 * Describes a point geometry object
 */
type Point = BaseGeometry & {
  lat: number
  lon: number
}

/**
 * Describes a point radius geometry object
 */
type PointRadius = Point & {
  radius: number
  radiusUnit: LengthUnit
}

const pointPropsToGeo = ({ id, lat, lon, properties }: Point) =>
  makePointGeo(id, lat, lon, properties)

const pointRadiusPropsToGeo = ({
  id,
  lat,
  lon,
  radius,
  radiusUnit,
  properties,
}: PointRadius) =>
  makePointRadiusGeo(id, lat, lon, radius, radiusUnit, properties)

const geoToPointProps = ({ properties, geometry }: GeometryJSON): Point => {
  const coordinates = (geometry as turf.Point).coordinates
  return {
    id: properties.id,
    lat: coordinates[LAT_COORDINATE],
    lon: coordinates[LON_COORDINATE],
    properties,
  }
}

const geoToPointRadiusProps = ({
  properties,
  geometry,
}: GeometryJSON): PointRadius => {
  const coordinates = (geometry as turf.Point).coordinates
  return {
    id: properties.id,
    lat: coordinates[LAT_COORDINATE],
    lon: coordinates[LON_COORDINATE],
    radius: properties.buffer ? properties.buffer.width : 0,
    radiusUnit: properties.buffer ? properties.buffer.unit : METERS,
    properties,
  }
}

export {
  Point,
  PointRadius,
  pointPropsToGeo,
  pointRadiusPropsToGeo,
  geoToPointProps,
  geoToPointRadiusProps,
}
