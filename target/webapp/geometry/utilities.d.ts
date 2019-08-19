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
import * as turf from '@turf/turf';
import { Shape } from '../shape-utils';
import { LengthUnit } from './units';
import { GeometryJSON } from './geometry';
declare const makeGeometry: (id: string, geometryJSON: any, color: string, shape: Shape, buffer?: number, bufferUnit?: LengthUnit) => GeometryJSON;
declare const makeEmptyGeometry: (id: string, shape: Shape, initialProperties?: object) => GeometryJSON;
declare const makeBufferedGeo: (geo: GeometryJSON) => GeometryJSON;
declare const bboxToExtent: (bbox: turf.helpers.BBox) => [number, number, number, number];
declare const geoToExtent: (geo: GeometryJSON) => [number, number, number, number];
export { bboxToExtent, geoToExtent, makeGeometry, makeBufferedGeo, makeEmptyGeometry, };
