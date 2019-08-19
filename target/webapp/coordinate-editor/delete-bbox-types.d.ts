/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
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
