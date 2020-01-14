import { GeometryJSON } from '../../geometry/geometry';
import { LengthUnit } from '../../geometry/units';
import BaseGeometry from './base-geometry';
/**
 * Describes a point geometry object
 */
declare type Point = BaseGeometry & {
    lat: number;
    lon: number;
};
/**
 * Describes a point radius geometry object
 */
declare type PointRadius = Point & {
    radius: number;
    radiusUnit: LengthUnit;
};
declare const pointPropsToGeo: ({ id, lat, lon, properties }: Point) => GeometryJSON;
declare const pointRadiusPropsToGeo: ({ id, lat, lon, radius, radiusUnit, properties, }: PointRadius) => GeometryJSON;
declare const geoToPointProps: ({ properties, geometry }: GeometryJSON) => Point;
declare const geoToPointRadiusProps: ({ properties, geometry, }: GeometryJSON) => PointRadius;
export { Point, PointRadius, pointPropsToGeo, pointRadiusPropsToGeo, geoToPointProps, geoToPointRadiusProps, };
