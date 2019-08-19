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
import { GeometryJSON, Extent } from '../geometry';
declare type Renderable = {
    geo: GeometryJSON;
};
declare class Renderer {
    map: ol.Map;
    vectorLayer: ol.layer.Vector;
    geoFormat: ol.format.GeoJSON;
    maxZoom: number;
    constructor(map: ol.Map, style: ol.style.Style | ol.StyleFunction | ol.style.Style[], maxZoom: number);
    renderList(geometryList: Renderable[]): void;
    makeGeometryFeature(geometry: Renderable): ol.Feature;
    addGeo(geometry: Renderable): void;
    clearGeos(): void;
    panToGeo(geometry: Renderable): void;
    panToGeoList(geometryList: Renderable[]): void;
    panToExtent(extent: Extent): void;
    protected getExtent(geometry: Renderable): Extent;
    resizeMap(): void;
}
export default Renderer;
