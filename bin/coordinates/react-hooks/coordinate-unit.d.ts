import { CoordinateUnit } from '../units';
declare type Props = {
    /** Lattitude */
    lat: number;
    /** Longitude */
    lon: number;
    /** Coordinate unit */
    unit: CoordinateUnit;
};
/**
 * Converts a lat/lon decimal pair to a string representation of that selected coordinate unit.
 * Example usage:
 * ```
 * const coordinates = useCoordinateUnit({ lat, lon, coordinateUnit })
 * return <Row>
 * {
 *   coordinates.map(text => (
 *     <Column>{text}</Column>
 *   ))
 * }
 * </Row>
 * ```
 * @param object - coordinate properties
 * @returns array of formatted strings divided at the point in which they should be semantically separated.
 */
declare const useCoordinateUnit: ({ lat, lon, unit }: Props) => string[];
export default useCoordinateUnit;
export { Props as CoordinateUnitProps };
