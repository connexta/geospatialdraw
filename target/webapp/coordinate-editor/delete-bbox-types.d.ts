import { UTM } from './utm-formatting';
import { DMS } from './dms-formatting';
import { Extent } from '../geometry';
declare type Position = 'north' | 'south' | 'east' | 'west';
declare type BBox = Extent;
declare type LatLonBBox = {
    [Key in Position]: number;
};
declare type LatLonDMSBBox = {
    [Key in Position]: DMS;
};
declare type USNGBBox = string;
declare type UTMBBox = {
    upperLeft: UTM;
    lowerRight: UTM;
};
declare type CoordinateValue = LatLonBBox | LatLonDMSBBox | USNGBBox | UTMBBox;
declare const Indexes: {
    north: number;
    south: number;
    west: number;
    east: number;
};
export { BBox, CoordinateValue, Indexes, LatLonBBox, LatLonDMSBBox, Position, USNGBBox, UTMBBox, };
