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
var turf = require("@turf/turf");
var ShapeDetector = /** @class */ (function () {
    function ShapeDetector() {
        this.geoFormat = new ol.format.GeoJSON();
    }
    ShapeDetector.prototype.shapeFromGeoJSON = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        return this.shapeFromFeature(feature);
    };
    ShapeDetector.prototype.shapeFromFeature = function (feature) {
        if (this.isLineFeature(feature)) {
            return 'Line';
        }
        else if (this.isBoundingBoxFeature(feature)) {
            return 'Bounding Box';
        }
        else if (this.isPointFeature(feature)) {
            return 'Point';
        }
        else if (this.isPointRadiusFeature(feature)) {
            return 'Point Radius';
        }
        else {
            return 'Polygon';
        }
    };
    ShapeDetector.prototype.isLineFeature = function (feature) {
        return feature.getGeometry().getType() === 'LineString';
    };
    ShapeDetector.prototype.isPointFeature = function (feature) {
        return (feature.getGeometry().getType() === 'Point' &&
            (feature.get('buffer') === undefined || feature.get('buffer') <= 0));
    };
    ShapeDetector.prototype.isBoundingBoxFeature = function (feature) {
        if (!this.isPolygonFeature(feature)) {
            return false;
        }
        else {
            var coordinates_1 = feature.getGeometry().getCoordinates()[0];
            var extent = feature.getGeometry().getExtent();
            var expectedCoordinates = turf.bboxPolygon(extent)
                .geometry.coordinates[0];
            return (coordinates_1.length === 5 &&
                expectedCoordinates.every(function (expectedPoint) {
                    return coordinates_1.some(function (point) {
                        return point[0] === expectedPoint[0] && point[1] === expectedPoint[1];
                    });
                }));
        }
    };
    ShapeDetector.prototype.isPointRadiusFeature = function (feature) {
        return (feature.getGeometry().getType() === 'Point' && feature.get('buffer') > 0);
    };
    ShapeDetector.prototype.isPolygonFeature = function (feature) {
        return feature.getGeometry().getType() === 'Polygon';
    };
    return ShapeDetector;
}());
exports.default = ShapeDetector;
//# sourceMappingURL=shape-detector.js.map