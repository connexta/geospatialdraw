import { LatLonDD } from '../coordinate-converter';
/**
 * Adds USNG state
 * @param initCoordinates - init lat long value
 * @returns [{ lat, lon } || null, usng, setUSNG, isValid, formattedUSNG]
 */
declare const useUSNGCoordinates: (initCoordinates: LatLonDD) => [LatLonDD, string, (value: string) => void, boolean, string];
export default useUSNGCoordinates;
