import { GeometryJSON } from '../../geometry/geometry';
import { LengthUnit } from '../../geometry/units';
import { LatLonDD } from '../coordinate-converter';
import BaseGeometry from './base-geometry';
declare type Coordinates = [number, number][];
declare type PolygonLine = BaseGeometry & {
    coordinates: Coordinates;
    buffer: number;
    bufferUnit: LengthUnit;
};
/**
 * Describes a polygon geometry object
 */
declare type Polygon = PolygonLine;
/**
 * Describes a line geometry object
 */
declare type Line = PolygonLine;
declare const polygonPropsToGeo: ({ id, coordinates, buffer, bufferUnit, properties, }: PolygonLine) => GeometryJSON;
declare const linePropsToGeo: ({ id, coordinates, buffer, bufferUnit, properties, }: PolygonLine) => GeometryJSON;
declare const geoToPolygonProps: ({ properties, geometry }: GeometryJSON) => PolygonLine;
declare const geoToLineProps: ({ properties, geometry }: GeometryJSON) => PolygonLine;
/**
 * Converts a [number, number] lon lat coordinate pair to a LatLonDD object
 */
declare const coordinateArrayValueToLatLon: (coordinate: [number, number]) => LatLonDD;
export { Polygon, Line, coordinateArrayValueToLatLon, polygonPropsToGeo, linePropsToGeo, geoToPolygonProps, geoToLineProps, };
