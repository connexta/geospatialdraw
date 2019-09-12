import {
  KILOMETERS,
  METERS,
  MILES,
  NAUTICAL_MILES,
  YARDS,
  FEET,
} from '../../geometry'
import { LAT_LON, LAT_LON_DMS, USNG, UTM } from '../../coordinate-editor'

const coordinateUnitList = [LAT_LON, LAT_LON_DMS, USNG, UTM]
const lengthUnitList = [KILOMETERS, METERS, MILES, NAUTICAL_MILES, YARDS, FEET]
const shapeList = ['Line', 'Polygon', 'Bounding Box', 'Point Radius', 'Point']

export { coordinateUnitList, lengthUnitList, shapeList }
