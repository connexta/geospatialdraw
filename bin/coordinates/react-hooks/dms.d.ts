import { LatLonDD, LatLonDMS } from '../coordinate-converter';
/**
 * Adds DMS coordinate state
 * @param initCoordinates - init lat lon coordinates
 * @returns [{ lat, lon } || null, dmsCoordinates, setDMSCoordinates, isValid, dmsString]
 */
declare const useDMSCoordinates: (initCoordinates: LatLonDD) => [LatLonDD, LatLonDMS, (value: LatLonDMS) => void, boolean, string];
export default useDMSCoordinates;
