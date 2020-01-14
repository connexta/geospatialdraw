/** @internal */

import {
  METERS,
  KILOMETERS,
  FEET,
  YARDS,
  MILES,
  NAUTICAL_MILES,
  LengthUnit,
} from 'geospatialdraw/bin/geometry/units'

const METERS_KILOMETERS = 1000
const METERS_FEET = 0.3048
const METERS_YARDS = 0.9144
const METERS_MILES = 1609.344
const METERS_NAUTICAL_MILES = 1852

const getDistanceInMeters = (distance: number, units: LengthUnit): number => {
  switch (units) {
    case KILOMETERS:
      return distance * METERS_KILOMETERS
    case FEET:
      return distance * METERS_FEET
    case YARDS:
      return distance * METERS_YARDS
    case MILES:
      return distance * METERS_MILES
    case NAUTICAL_MILES:
      return distance * METERS_NAUTICAL_MILES
    case METERS:
    default:
      return distance
  }
}

const getDistanceFromMeters = (distance: number, units: LengthUnit): number => {
  switch (units) {
    case KILOMETERS:
      return distance / METERS_KILOMETERS
    case FEET:
      return distance / METERS_FEET
    case YARDS:
      return distance / METERS_YARDS
    case MILES:
      return distance / METERS_MILES
    case NAUTICAL_MILES:
      return distance / METERS_NAUTICAL_MILES
    case METERS:
    default:
      return distance
  }
}

export { getDistanceInMeters, getDistanceFromMeters }
