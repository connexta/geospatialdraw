import { GeometryJSON } from '../../geometry/geometry';
import BaseGeometry from './base-geometry';
import { LatLonDD } from '../coordinate-converter';
/**
 * Bounding box coordinates
 */
declare type BBox = {
    north: number;
    south: number;
    east: number;
    west: number;
};
/**
 * Describes a bounding box geometry object
 */
declare type BBoxProperties = BaseGeometry & {
    bbox: BBox;
};
declare const bboxPropsToGeo: ({ id, bbox, properties }: BBoxProperties) => GeometryJSON;
declare const geoToBBoxProps: (geo: GeometryJSON) => BBoxProperties;
declare const coordinatePairToBBox: (coordinates: [LatLonDD, LatLonDD]) => BBox;
/**
 * @returns LatLonDD coordinate pair as [upperLeft, lowerRight]
 */
declare const bboxToCoordinatePair: ({ west, south, east, north, }: BBox) => [LatLonDD, LatLonDD];
export { BBox, BBoxProperties, bboxPropsToGeo, geoToBBoxProps, coordinatePairToBBox, bboxToCoordinatePair, };
