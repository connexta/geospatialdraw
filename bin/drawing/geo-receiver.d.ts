import { GeometryJSON } from '../geometry/geometry';
/**
 * Callback for returning GeometryJSON
 * @param geoJSON - The returned GeometryJSON
 */
declare type UpdatedGeoReceiver = (geoJSON: GeometryJSON) => void;
export default UpdatedGeoReceiver;
