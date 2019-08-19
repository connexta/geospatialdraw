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
import { DMS } from './dms-formatting';
import { UTM } from './utm-formatting';
declare const DECIMAL_DEGREES_PRECISION = 6;
declare const USNG_CONVERSION_PRECISION = 6;
declare type LatLonDMS = {
    lat: DMS;
    lon: DMS;
};
declare type LatLonDD = {
    lat: number;
    lon: number;
};
declare type CoordinateValue = LatLonDMS | LatLonDD | string | UTM;
declare const latLonTo: {
    LatLonDD: (lat: number, lon: number) => LatLonDD;
    LatLonDMS: (lat: number, lon: number) => LatLonDMS;
    USNGBox: (north: number, south: number, east: number, west: number) => string;
    USNG: (lat: number, lon: number, precision: number) => string;
    UTM: (lat: number, lon: number) => UTM;
};
export { LatLonDMS, LatLonDD, CoordinateValue, latLonTo, USNG_CONVERSION_PRECISION, DECIMAL_DEGREES_PRECISION, };
