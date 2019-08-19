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
import ModifiableDrawingControl from './modifiable-drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON } from '../geometry';
declare class PointRadiusDrawingControl extends ModifiableDrawingControl {
    animationFrameId: number;
    animationFrame: () => void;
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    onCompleteDrawing(e: any): void;
    onStartDrawing(e: any): void;
    getShape(): Shape;
    getGeoJSONFromCompleteDrawEvent(e: any): GeometryJSON;
    getGeoJSONFromCompleteModifyEvent(e: any): GeometryJSON;
    featureToGeoJSON(inputFeature: ol.Feature): GeometryJSON;
    makeFeature(geoJSON: GeometryJSON): ol.Feature;
    getGeoType(): ol.geom.GeometryType;
    getStaticStyle(_feature: ol.Feature): ol.style.Style | ol.style.Style[];
}
export default PointRadiusDrawingControl;
