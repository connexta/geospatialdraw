import { DMS } from './dms-formatting';
import { UTM } from './utm-formatting';
declare const DECIMAL_DEGREES_PRECISION = 6;
declare const USNG_CONVERSION_PRECISION = 6;
declare type LatLonDMS = {
    lat: DMS;
    lon: DMS;
};
declare type LatLonDD = {
    lat: number;
    lon: number;
};
declare type CoordinateValue = LatLonDMS | LatLonDD | string | UTM;
declare const latLonTo: {
    LatLonDD: (lat: number, lon: number) => LatLonDD;
    LatLonDMS: (lat: number, lon: number) => LatLonDMS;
    USNGBox: (north: number, south: number, east: number, west: number) => string;
    USNG: (lat: number, lon: number, precision: number) => string;
    UTM: (lat: number, lon: number) => UTM;
};
export { LatLonDMS, LatLonDD, CoordinateValue, latLonTo, USNG_CONVERSION_PRECISION, DECIMAL_DEGREES_PRECISION, };
