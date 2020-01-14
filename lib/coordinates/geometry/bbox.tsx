import { GeometryJSON, Extent } from '../../geometry/geometry'
import { makeBBoxGeo } from '../../geometry/shape-factory'
import BaseGeometry from './base-geometry'
import { LatLonDD } from '../coordinate-converter'

/**
 * Bounding box coordinates
 */
type BBox = {
  north: number
  south: number
  east: number
  west: number
}

/**
 * Describes a bounding box geometry object
 */
type BBoxProperties = BaseGeometry & {
  bbox: BBox
}

type CoordinatePair = [LatLonDD, LatLonDD]

/** @internal */
const bboxToExtent = ({ west, south, east, north }: BBox): Extent => [
  Math.min(west, east),
  Math.min(south, north),
  Math.max(west, east),
  Math.max(south, north),
]

/** @internal */
const extentToBBox = ([west, south, east, north]: Extent): BBox => ({
  west,
  south,
  east,
  north,
})

const bboxPropsToGeo = ({ id, bbox, properties }: BBoxProperties) =>
  makeBBoxGeo(id, bboxToExtent(bbox), properties)

const geoToBBoxProps = (geo: GeometryJSON): BBoxProperties => ({
  id: geo.properties.id,
  bbox: extentToBBox(geo.bbox),
  properties: geo.properties,
})

const coordinatePairToBBox = (coordinates: CoordinatePair): BBox => ({
  west: Math.min(coordinates[0].lon, coordinates[1].lon),
  south: Math.min(coordinates[0].lat, coordinates[1].lat),
  east: Math.max(coordinates[0].lon, coordinates[1].lon),
  north: Math.max(coordinates[0].lat, coordinates[1].lat),
})

/**
 * @returns LatLonDD coordinate pair as [upperLeft, lowerRight]
 */
const bboxToCoordinatePair = ({
  west,
  south,
  east,
  north,
}: BBox): [LatLonDD, LatLonDD] => [
  { lat: north, lon: west },
  { lat: south, lon: east },
]

export {
  BBox,
  BBoxProperties,
  bboxPropsToGeo,
  geoToBBoxProps,
  coordinatePairToBBox,
  bboxToCoordinatePair,
}
