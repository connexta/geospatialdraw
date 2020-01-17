/**
 * All supported units of length measurement
 */
declare type LengthUnit = 'meters' | 'kilometers' | 'yards' | 'feet' | 'miles' | 'nautical miles';
declare const FEET: LengthUnit;
declare const KILOMETERS: LengthUnit;
declare const METERS: LengthUnit;
declare const MILES: LengthUnit;
declare const NAUTICAL_MILES: LengthUnit;
declare const YARDS: LengthUnit;
declare type Length = {
    length: number;
    unit: LengthUnit;
};
declare const abbreviateUnit: (unit: LengthUnit) => string;
export { abbreviateUnit, LengthUnit, Length, FEET, KILOMETERS, METERS, MILES, NAUTICAL_MILES, YARDS, };
