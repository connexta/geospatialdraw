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
declare type Extent = [number, number, number, number];
declare type GeometryJSONProperties = {
    color: string;
    shape: Shape;
    buffer?: number;
    bufferUnit: LengthUnit;
    id: string;
};
declare const DEFAULT_PROPERTIES: GeometryJSONProperties;
declare type Geometry = turf.Polygon | turf.Point | turf.LineString;
declare type GeometryJSON = turf.Feature & {
    bbox: Extent;
    properties: GeometryJSONProperties;
    geometry: Geometry;
};
declare const DEFAULT_GEOMETRY: {
    [shape in Shape]: Geometry;
};
declare const CIRCLE_BUFFER_PROPERTY_VALUE = "circle";
declare const POLYGON_LINE_BUFFER_PROPERTY_VALUE = "polygon/line";
declare const BUFFER_SHAPE_PROPERTY = "bufferShape";
declare type BufferShape = 'circle' | 'polygon/line';
export { GeometryJSON, GeometryJSONProperties, Geometry, BufferShape, Extent, BUFFER_SHAPE_PROPERTY, CIRCLE_BUFFER_PROPERTY_VALUE, DEFAULT_GEOMETRY, DEFAULT_PROPERTIES, POLYGON_LINE_BUFFER_PROPERTY_VALUE, };
