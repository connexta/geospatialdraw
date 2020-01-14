import * as turf from '@turf/turf';
import { Shape } from '../shapes/shape';
import { LengthUnit } from './units';
/**
 * 2D extent of a geometry represented as an array in the format of
 * [minimumX, minimumY, maximumX, maximumY]
 */
declare type Extent = [number, number, number, number];
/**
 * GeometryJSON Buffer property
 */
declare type Buffer = {
    /**
     * Buffer width
     */
    width: number;
    /**
     * Buffer size unit of measurement
     */
    unit: LengthUnit;
};
/**
 * Custom GeoJSON properties used in GeometryJSON
 */
declare type GeometryJSONProperties = {
    /**
     * CSS color of geometry
     */
    color: string;
    /**
     * Shape of geometry
     */
    shape: Shape;
    /**
     * Buffer properties
     */
    buffer?: Buffer;
    /**
     * Unique identifier
     */
    id: string;
};
declare const DEFAULT_PROPERTIES: GeometryJSONProperties;
/**
 * GeoJSON Geometries supported by GeometryJSON
 */
declare type Geometry = turf.Polygon | turf.Point | turf.LineString;
/**
 * Extended GeoJSON used to represent map geometry.
 * For details on GeoJSON see: https://geojson.org/
 */
declare type GeometryJSON = turf.Feature & {
    bbox: Extent;
    properties: GeometryJSONProperties;
    geometry: Geometry;
};
declare const DEFAULT_GEOMETRY: {
    [shape in Shape]: Geometry;
};
/**
 * Class name added to feature "class" property to identify buffer features
 * in user defined styles.
 */
declare const BUFFER_CLASSNAME = "buffer";
/**
 * Class name added to feature "class" property to identify hidden features
 * in user defined styles.
 */
declare const HIDDEN_CLASSNAME = "hidden";
export { Buffer, GeometryJSON, GeometryJSONProperties, Geometry, Extent, BUFFER_CLASSNAME, HIDDEN_CLASSNAME, DEFAULT_GEOMETRY, DEFAULT_PROPERTIES, };
