import * as turf from '@turf/turf';
import { Shape } from '../shapes/shape';
import { LengthUnit } from './units';
import { Buffer, GeometryJSON, GeometryJSONProperties } from './geometry';
/**
 * Returns a buffer property for the geometry
 * providing a default empty value if there is no
 * buffer property present
 * @param properties - GeometryJSON properties
 *
 * @returns Buffer
 */
declare const getBufferPropOrDefault: (properties: GeometryJSONProperties) => Buffer;
/**
 * Creates a full GeometryJSON object from a Feature or Geometry GeoJSON object
 *
 * @param id - unique id for geometry
 * @param json - GeoJSON object
 *
 * @returns GeometryJSON
 */
declare const geoJSONToGeometryJSON: (id: string, json: any) => GeometryJSON;
/**
 * Creates a full GeometryJSON object from a GeoJSON Geometry object
 *
 * @param id - unique id for geometry
 * @param geometryGeoJSON - GeoJSON Geometry object to extend
 * @param color - CSS color for geometry
 * @param shape - geometry shape
 * @param [buffer] - buffer size
 * @param [bufferUnit] - buffer size unit of measurement
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makeGeometry: (id: string, geometryGeoJSON: any, color: string, shape: Shape, buffer?: number, bufferUnit?: LengthUnit, properties?: object) => GeometryJSON;
/**
 * Creates an empty GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param shape - geometry shape
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
declare const makeEmptyGeometry: (id: string, shape: Shape, properties?: object) => GeometryJSON;
/**
 * Creates a buffered GeometryJSON object from a source
 * GeometryJSON object using it's geometry and buffer values
 *
 * @param geo - source GeometryJSON object
 *
 * @returns GeometryJSON with buffer applied
 */
declare const makeBufferedGeo: (geo: GeometryJSON) => GeometryJSON;
/**
 * Converts an arbitrary bbox value from GeoJSON to a 2D extent value
 *
 * @param bbox - 2D/3D GeoJSON bbox value
 *
 * @returns Extent
 */
declare const bboxToExtent: (bbox: turf.helpers.BBox) => [number, number, number, number];
/**
 * Calculates the 2D extent of a GeometryJSON object
 *
 * @param geo - GeometryJSON or Geometry object
 *
 * @returns Extent
 */
declare const geoToExtent: (geo: turf.helpers.Point | turf.helpers.LineString | turf.helpers.Polygon | GeometryJSON) => [number, number, number, number];
/**
 * Calculates the combined 2D extent of an array of 2D extents
 *
 * @param extentList - array of extents if this is empty then [0, 0, 0, 0] is returned
 *
 * @returns Extent
 */
declare const combineExtents: (extentList: [number, number, number, number][]) => [number, number, number, number];
export { bboxToExtent, combineExtents, geoToExtent, makeBufferedGeo, makeEmptyGeometry, makeGeometry, geoJSONToGeometryJSON, getBufferPropOrDefault, };
