import { LatLonDD } from '../coordinate-converter';
import { UTM } from '../utm-formatting';
/**
 * Constants defining range of UTM values
 */
declare const UTM_BOUNDS: {
    MAX_EASTING: number;
    MIN_EASTING: number;
    MAX_NORTHING: number;
    MIN_NORTHING: number;
    MAX_ZONE: number;
};
/**
 * Adds UTM state
 * @param initCoordinates - init longitude latitude values
 * @returns [{ lat, lon } || null, utm, setUTM, isValid, utmString]
 */
declare const useUTMCoordinates: (initCoordinates: LatLonDD) => [LatLonDD, UTM, (value: UTM) => void, boolean, string];
export { useUTMCoordinates, UTM_BOUNDS };
