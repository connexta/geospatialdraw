import { GeometryJSON } from './geometry';
import { LengthUnit } from './units';
/**
 * Creates a Point GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makePointGeo: (id: string, lat: number, lon: number, properties?: object) => GeometryJSON;
/**
 * Creates a Point Radius GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param radius - radius length
 * @param radiusUnit - radius length unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makePointRadiusGeo: (id: string, lat: number, lon: number, radius: number, radiusUnit: LengthUnit, properties?: object) => GeometryJSON;
/**
 * Creates a Polygon GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makePolygonGeo: (id: string, lonLatCoordinateList: [number, number][], buffer: number, bufferUnit: LengthUnit, properties?: object) => GeometryJSON;
/**
 * Creates a Line GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makeLineGeo: (id: string, lonLatCoordinateList: [number, number][], buffer: number, bufferUnit: LengthUnit, properties?: object) => GeometryJSON;
/**
 * Creates a Bounding Box GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param extent - Extent of bounding box
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makeBBoxGeo: (id: string, extent: [number, number, number, number], properties?: object) => GeometryJSON;
export { makeBBoxGeo, makeLineGeo, makePointGeo, makePointRadiusGeo, makePolygonGeo, };
