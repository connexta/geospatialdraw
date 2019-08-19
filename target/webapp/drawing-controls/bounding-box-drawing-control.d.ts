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
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON, Extent } from '../geometry';
declare type ExtentEvent = {
    extent: Extent;
};
declare class BoundingBoxDrawingControl extends BasicDrawingControl {
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getGeoType(): ol.geom.GeometryType;
    getShape(): Shape;
    startDrawing(geoJSON: GeometryJSON): void;
    startDrawingExtent(extent: Extent): void;
    extentChanged(e: ExtentEvent): void;
    extentToFeature(extent: Extent): ol.Feature;
    extentToGeoJSON(bbox: Extent): GeometryJSON;
}
export default BoundingBoxDrawingControl;
