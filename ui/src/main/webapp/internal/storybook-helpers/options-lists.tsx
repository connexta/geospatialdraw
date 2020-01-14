/** @internal */

import {
  KILOMETERS,
  METERS,
  MILES,
  NAUTICAL_MILES,
  YARDS,
  FEET,
} from 'geospatialdraw/bin/geometry/units'
import {
  LAT_LON,
  LAT_LON_DMS,
  USNG,
  UTM,
} from 'geospatialdraw/bin/coordinates/units'
import {
  LINE,
  POLYGON,
  BOUNDING_BOX,
  POINT_RADIUS,
  POINT,
} from 'geospatialdraw/bin/shapes/shape'

const coordinateUnitList = [LAT_LON, LAT_LON_DMS, USNG, UTM]
const lengthUnitList = [KILOMETERS, METERS, MILES, NAUTICAL_MILES, YARDS, FEET]
const shapeList = [LINE, POLYGON, BOUNDING_BOX, POINT_RADIUS, POINT]

export { coordinateUnitList, lengthUnitList, shapeList }
