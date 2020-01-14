import { LatLonDD } from '../coordinate-converter';
/**
 * Adds an interface for editing a list of coordinates to a react component
 * @param initCoordinates - array of default [lon, lat] coordinate values
 * @param initSelectedIndex - default selected index
 * @returns {
 *   coordinateList - array of [lon, lat] coordinate values
 *   setCoordinateList - sets coordinateList
 *   setSelectedIndex - selected index into coordinateList
 *   addCoordinateBefore - adds a new empty coordinate before the selected index
 *   addCoordinateAfter - adds a new empty coordinate after the selected index
 *   deleteCoordinate - deletes coordinate at selected index
 *   setCoordinate - sets the coordinate at selected index
 * }
 */
declare const useCoordinateList: (initCoordinates: [number, number][], initSelectedIndex: number) => {
    lat: number;
    lon: number;
    coordinateList: [number, number][];
    setCoordinateList: (value: [number, number][]) => void;
    setSelectedIndex: (value: number) => void;
    selectedIndex: number;
    addCoordinateBefore: () => void;
    addCoordinateAfter: () => void;
    deleteCoordinate: () => void;
    setCoordinate: (coordinate: LatLonDD) => void;
};
export default useCoordinateList;
