/**
 * All supported units of length measurement
 */
type LengthUnit =
  | 'meters'
  | 'kilometers'
  | 'yards'
  | 'feet'
  | 'miles'
  | 'nautical miles'
const FEET: LengthUnit = 'feet'
const KILOMETERS: LengthUnit = 'kilometers'
const METERS: LengthUnit = 'meters'
const MILES: LengthUnit = 'miles'
const NAUTICAL_MILES: LengthUnit = 'nautical miles'
const YARDS: LengthUnit = 'yards'

export { LengthUnit, FEET, KILOMETERS, METERS, MILES, NAUTICAL_MILES, YARDS }
