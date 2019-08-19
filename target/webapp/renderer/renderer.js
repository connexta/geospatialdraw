"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var ol = require("openlayers");
var geometry_1 = require("../geometry");
var Renderer = /** @class */ (function () {
    function Renderer(map, style, maxZoom) {
        this.map = map;
        this.geoFormat = new ol.format.GeoJSON();
        this.maxZoom = maxZoom;
        var vectorSource = new ol.source.Vector({
            features: [],
        });
        this.vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            zIndex: 1,
        });
        this.vectorLayer.setStyle(style);
        this.map.addLayer(this.vectorLayer);
    }
    Renderer.prototype.renderList = function (geometryList) {
        for (var _i = 0, geometryList_1 = geometryList; _i < geometryList_1.length; _i++) {
            var geometry = geometryList_1[_i];
            this.addGeo(geometry);
        }
    };
    Renderer.prototype.makeGeometryFeature = function (geometry) {
        var buffered = geometry_1.makeBufferedGeo(geometry.geo);
        return this.geoFormat.readFeature(buffered);
    };
    Renderer.prototype.addGeo = function (geometry) {
        var feature = this.makeGeometryFeature(geometry);
        feature.setId(geometry.geo.properties.id);
        // Note: In the future we may want to optimize performance
        // here by using feature ids to update only what has
        // changed and remove only what has been removed.
        this.vectorLayer.getSource().addFeature(feature);
    };
    Renderer.prototype.clearGeos = function () {
        this.vectorLayer.getSource().clear();
    };
    Renderer.prototype.panToGeo = function (geometry) {
        this.panToExtent(this.getExtent(geometry));
    };
    Renderer.prototype.panToGeoList = function (geometryList) {
        var _this = this;
        if (geometryList.length > 0) {
            var minX_1 = Number.MAX_SAFE_INTEGER;
            var minY_1 = Number.MAX_SAFE_INTEGER;
            var maxX_1 = Number.MIN_SAFE_INTEGER;
            var maxY_1 = Number.MIN_SAFE_INTEGER;
            geometryList.forEach(function (geometry) {
                var extent = _this.getExtent(geometry);
                minX_1 = Math.min(minX_1, extent[0]);
                minY_1 = Math.min(minY_1, extent[1]);
                maxX_1 = Math.max(maxX_1, extent[2]);
                maxY_1 = Math.max(maxY_1, extent[3]);
            });
            this.panToExtent([minX_1, minY_1, maxX_1, maxY_1]);
        }
    };
    Renderer.prototype.panToExtent = function (extent) {
        this.map.getView().fit(extent, {
            size: this.map.getSize(),
            duration: 500,
            maxZoom: this.maxZoom,
        });
    };
    Renderer.prototype.getExtent = function (geometry) {
        if (geometry.geo.bbox) {
            return geometry.geo.bbox;
        }
        else {
            var feature = this.geoFormat.readFeature(geometry.geo);
            return feature.getGeometry().getExtent();
        }
    };
    Renderer.prototype.resizeMap = function () {
        this.map.updateSize();
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map