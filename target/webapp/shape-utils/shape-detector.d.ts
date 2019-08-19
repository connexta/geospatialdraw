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
import * as ol from 'openlayers';
import { GeometryJSON } from '../geometry';
import Shape from './shape';
declare class ShapeDetector {
    geoFormat: ol.format.GeoJSON;
    constructor();
    shapeFromGeoJSON(geoJSON: GeometryJSON): Shape;
    shapeFromFeature(feature: ol.Feature): Shape;
    isLineFeature(feature: ol.Feature): boolean;
    isPointFeature(feature: ol.Feature): boolean;
    isBoundingBoxFeature(feature: ol.Feature): boolean;
    isPointRadiusFeature(feature: ol.Feature): boolean;
    isPolygonFeature(feature: ol.Feature): boolean;
}
export default ShapeDetector;
