declare type DMS = {
    degree: number;
    minute: number;
    second: number;
};
declare const SECONDS_PRECISION = 1;
declare const dmsToLatString: (dms: DMS, precision?: number) => string;
declare const dmsToLonString: (dms: DMS, precision?: number) => string;
declare const dmsCoordinateToString: (lat: DMS, lon: DMS) => string;
declare const dmsToDecimal: ({ degree, minute, second }: DMS) => number;
declare const decimalToDMS: (decimal: number) => DMS;
declare const dmsSign: ({ degree, minute, second }: DMS) => number;
declare const dmsSetSign: ({ degree, minute, second }: DMS, sign: 1 | -1) => DMS;
export { DMS, dmsToLatString, dmsToLonString, dmsCoordinateToString, dmsToDecimal, decimalToDMS, dmsSign, dmsSetSign, SECONDS_PRECISION, };
