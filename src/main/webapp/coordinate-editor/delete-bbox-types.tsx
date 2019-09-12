import { UTM } from './utm-formatting'
import { DMS } from './dms-formatting'
import { Extent } from '../geometry'

type Position = 'north' | 'south' | 'east' | 'west'

type BBox = Extent

type LatLonBBox = { [Key in Position]: number }

type LatLonDMSBBox = { [Key in Position]: DMS }

type USNGBBox = string

type UTMBBox = {
  upperLeft: UTM
  lowerRight: UTM
}

type CoordinateValue = LatLonBBox | LatLonDMSBBox | USNGBBox | UTMBBox

const Indexes = {
  north: 3,
  south: 1,
  west: 0,
  east: 2,
}

export {
  BBox,
  CoordinateValue,
  Indexes,
  LatLonBBox,
  LatLonDMSBBox,
  Position,
  USNGBBox,
  UTMBBox,
}
