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
declare type DMS = {
    degree: number;
    minute: number;
    second: number;
};
declare const SECONDS_PRECISION = 1;
declare const dmsValueToString: (dms: DMS, isLongitude: boolean) => string;
declare const dmsCoordinateToString: (lat: DMS, lon: DMS) => string;
declare const dmsToDecimal: ({ degree, minute, second }: DMS) => number;
declare const decimalToDMS: (decimal: number) => DMS;
declare const dmsSign: ({ degree, minute, second }: DMS) => number;
declare const dmsSetSign: ({ degree, minute, second }: DMS, sign: 1 | -1) => DMS;
export { DMS, dmsValueToString, dmsCoordinateToString, dmsToDecimal, decimalToDMS, dmsSign, dmsSetSign, SECONDS_PRECISION, };
