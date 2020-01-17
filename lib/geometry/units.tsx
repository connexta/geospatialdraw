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

type Length = {
  length: number
  unit: LengthUnit
}

type abbreviationsMap = {
  [type in LengthUnit]: string
}

const abbreviations: abbreviationsMap = {
  [FEET]: 'ft',
  [KILOMETERS]: 'km',
  [METERS]: 'm',
  [MILES]: 'mi',
  [NAUTICAL_MILES]: 'nm',
  [YARDS]: 'yd',
}

const abbreviateUnit = (unit: LengthUnit): string => abbreviations[unit]

export {
  abbreviateUnit,
  LengthUnit,
  Length,
  FEET,
  KILOMETERS,
  METERS,
  MILES,
  NAUTICAL_MILES,
  YARDS,
}
