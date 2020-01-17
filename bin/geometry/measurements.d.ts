import { LengthUnit, Length } from './units';
/**
 * Formats a number for display
 * @params precision - number of significant digits to display
 * @params maxStandardLength - maximum length of text before scientific notation sould be displayed
 * @params n - number to display
 * @returns formatted text
 */
declare const formatNumber: (precision: number, maxStandardLength: number, n: number) => string;
/**
 * Caclulates distance between two points on a map
 * @params a - first point
 * @params b - second point
 * @params unit - unit of measurement to return distance in
 * @returns distance in specified unit
 */
declare const distanceBetweenPoints: (a: [number, number], b: [number, number], unit: LengthUnit) => number;
declare const optimizedUnitForLength: ({ unit, length }: Length) => Length;
declare const optimizedUnitForDistanceBetweenPoints: (a: [number, number], b: [number, number], unit: LengthUnit) => Length;
export { optimizedUnitForLength, optimizedUnitForDistanceBetweenPoints, distanceBetweenPoints, formatNumber, };
