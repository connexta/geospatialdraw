import * as turf from '@turf/turf'
import { LengthUnit, Length, METERS, KILOMETERS } from './units'
import {
  getDistanceFromMeters,
  // getSquareDistanceFromMeters,
} from '../internal/distance'

/**
 * Formats a number for display
 * @params precision - number of significant digits to display
 * @params maxStandardLength - maximum length of text before scientific notation sould be displayed
 * @params n - number to display
 * @returns formatted text
 */
const formatNumber = (
  precision: number,
  maxStandardLength: number,
  n: number
): string => {
  const scientific = n.toPrecision(precision)
  const standard = Number(scientific).toString()
  return standard.length > maxStandardLength ? scientific : standard
}

/**
 * Caclulates distance between two points on a map
 * @params a - first point
 * @params b - second point
 * @params unit - unit of measurement to return distance in
 * @returns distance in specified unit
 */
const distanceBetweenPoints = (
  a: [number, number],
  b: [number, number],
  unit: LengthUnit
): number => {
  const distance = turf.distance(a, b, { units: 'meters' })
  return getDistanceFromMeters(distance, unit)
}

const optimizedUnitForLength = ({ unit, length }: Length): Length =>
  unit === METERS && length > 1500
    ? { unit: KILOMETERS, length: getDistanceFromMeters(length, KILOMETERS) }
    : { unit, length }

const optimizedUnitForDistanceBetweenPoints = (
  a: [number, number],
  b: [number, number],
  unit: LengthUnit
): Length =>
  optimizedUnitForLength({
    length: distanceBetweenPoints(a, b, unit),
    unit,
  })

export {
  optimizedUnitForLength,
  optimizedUnitForDistanceBetweenPoints,
  distanceBetweenPoints,
  formatNumber,
}
