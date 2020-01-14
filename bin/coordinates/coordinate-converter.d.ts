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
    LatLonDMS: ({ lat, lon }: LatLonDD) => LatLonDMS;
    USNGBox: (north: number, south: number, east: number, west: number) => string;
    USNG: ({ lat, lon }: LatLonDD, precision: number) => string;
    UTM: ({ lat, lon }: LatLonDD) => UTM;
};
declare const isValidLatLon: ({ lat, lon }: LatLonDD) => boolean;
export { LatLonDMS, LatLonDD, CoordinateValue, latLonTo, USNG_CONVERSION_PRECISION, DECIMAL_DEGREES_PRECISION, isValidLatLon, };
