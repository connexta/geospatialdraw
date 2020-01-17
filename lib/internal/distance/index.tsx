/** @internal */

import {
  METERS,
  KILOMETERS,
  FEET,
  YARDS,
  MILES,
  NAUTICAL_MILES,
  LengthUnit,
} from '../../geometry/units'

const METERS_KILOMETERS = 1000
const METERS_FEET = 0.3048
const METERS_YARDS = 0.9144
const METERS_MILES = 1609.344
const METERS_NAUTICAL_MILES = 1852

const SQUARE_METERS_KILOMETERS = 1e-6
const SQUARE_METERS_FEET = 10.7639
const SQUARE_METERS_YARDS = 1.19599
const SQUARE_METERS_MILES = 3.8610214360029e-7
const SQUARE_METERS_NAUTICAL_MILES = 2.91553e-7

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

const getSquareDistanceInMeters = (
  distance: number,
  units: LengthUnit
): number => {
  switch (units) {
    case KILOMETERS:
      return distance * SQUARE_METERS_KILOMETERS
    case FEET:
      return distance * SQUARE_METERS_FEET
    case YARDS:
      return distance * SQUARE_METERS_YARDS
    case MILES:
      return distance * SQUARE_METERS_MILES
    case NAUTICAL_MILES:
      return distance * SQUARE_METERS_NAUTICAL_MILES
    case METERS:
    default:
      return distance
  }
}

const getSquareDistanceFromMeters = (
  distance: number,
  units: LengthUnit
): number => {
  switch (units) {
    case KILOMETERS:
      return distance / SQUARE_METERS_KILOMETERS
    case FEET:
      return distance / SQUARE_METERS_FEET
    case YARDS:
      return distance / SQUARE_METERS_YARDS
    case MILES:
      return distance / SQUARE_METERS_MILES
    case NAUTICAL_MILES:
      return distance / SQUARE_METERS_NAUTICAL_MILES
    case METERS:
    default:
      return distance
  }
}

export {
  getDistanceInMeters,
  getDistanceFromMeters,
  getSquareDistanceInMeters,
  getSquareDistanceFromMeters,
}
