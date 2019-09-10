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
import DrawingControl from './drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON, GeometryJSONProperties } from '../geometry';
declare type GeoProps = GeometryJSONProperties & {
    [index: string]: any;
};
declare abstract class BasicDrawingControl implements DrawingControl {
    context: DrawingContext;
    receiver: UpdatedGeoReceiver;
    geoFormat: ol.format.GeoJSON;
    mouseDragActive: boolean;
    drawingActive: boolean;
    protected properties: GeoProps;
    abstract setGeo(geoJSON: GeometryJSON): void;
    abstract startDrawing(): void;
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    setProperties(properties: GeoProps): void;
    getProperties(): GeoProps;
    protected applyPropertiesToFeature(feature: ol.Feature): void;
    protected abstract getShape(): Shape;
    protected abstract getGeoType(): ol.geom.GeometryType;
    protected featureToGeo(feature: ol.Feature): GeometryJSON;
    protected writeExtendedGeoJSON(feature: ol.Feature): GeometryJSON;
    cancelDrawing(): void;
    setActive(active: boolean): void;
    isActive(): boolean;
    isMouseDragActive(): boolean;
    isDrawing(): boolean;
}
export default BasicDrawingControl;
