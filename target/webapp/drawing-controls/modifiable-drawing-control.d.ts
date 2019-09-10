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
import { GeometryJSON } from '../geometry';
declare abstract class ModifiableDrawingControl extends BasicDrawingControl {
    drawInteraction: ol.interaction.Draw | null;
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getGeoJSONFromCompleteDrawEvent(e: any): GeometryJSON;
    getGeoJSONFromCompleteModifyEvent(e: any): GeometryJSON;
    onCompleteDrawing(e: any): void;
    onStartDrawing(_e: any): void;
    onStartModify(_e: any): void;
    onCompleteModify(e: any): void;
    makeFeature(geoJSON: GeometryJSON): ol.Feature;
    getStaticStyle(feature: ol.Feature): ol.style.Style | ol.style.Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    private startDrawingStyle;
}
export default ModifiableDrawingControl;
