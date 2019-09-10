"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var turf = require("@turf/turf");
var _ = require("lodash");
var units_1 = require("./units");
var geometry_1 = require("./geometry");
var distance_1 = require("../internal/distance");
var MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS = 2;
var makeGeometry = function (id, geometryJSON, color, shape, buffer, bufferUnit) {
    if (buffer === void 0) { buffer = 0; }
    if (bufferUnit === void 0) { bufferUnit = units_1.METERS; }
    var geometry = turf.getGeom(_.cloneDeep(geometryJSON));
    var json = {
        type: 'Feature',
        properties: {
            id: id,
            color: color,
            shape: shape,
            buffer: buffer,
            bufferUnit: bufferUnit,
        },
        geometry: geometry,
        bbox: [0, 0, 0, 0],
    };
    json.bbox = geoToExtent(makeBufferedGeo(json));
    return json;
};
exports.makeGeometry = makeGeometry;
var makeEmptyGeometry = function (id, shape, initialProperties) {
    if (initialProperties === void 0) { initialProperties = {}; }
    return ({
        type: 'Feature',
        properties: __assign({}, geometry_1.DEFAULT_PROPERTIES, initialProperties, { shape: shape,
            id: id, buffer: shape === 'Point Radius' ? Number.MIN_VALUE : 0, bufferUnit: units_1.METERS }),
        bbox: [0, 0, 0, 0],
        geometry: _.cloneDeep(geometry_1.DEFAULT_GEOMETRY[shape]),
    });
};
exports.makeEmptyGeometry = makeEmptyGeometry;
var makeBufferedGeo = function (geo) {
    if (((geo.geometry.type === 'Polygon' &&
        geo.geometry.coordinates[0].length >=
            MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
        (geo.geometry.type === 'LineString' &&
            geo.geometry.coordinates.length >=
                MINIMUM_POLYGON_OR_LINE_COORDINATE_LENGTH_FOR_TURF_JS) ||
        geo.geometry.type === 'Point') &&
        geo.properties.shape !== 'Bounding Box' &&
        geo.properties.buffer &&
        geo.properties.bufferUnit &&
        geo.properties.buffer > 0) {
        // Copy JSON since turf.buffer has side effects
        geo = _.cloneDeep(geo);
        var bufferedGeo = turf.buffer(geo, distance_1.getDistanceInMeters(geo.properties.buffer || 0, geo.properties.bufferUnit), {
            units: 'meters',
        });
        if (bufferedGeo === undefined) {
            return geo;
        }
        else if (bufferedGeo.properties) {
            bufferedGeo.properties[geometry_1.BUFFER_SHAPE_PROPERTY] =
                geo.geometry.type === 'Point'
                    ? geometry_1.CIRCLE_BUFFER_PROPERTY_VALUE
                    : geometry_1.POLYGON_LINE_BUFFER_PROPERTY_VALUE;
        }
        return bufferedGeo;
    }
    return geo;
};
exports.makeBufferedGeo = makeBufferedGeo;
var bboxToExtent = function (bbox) { return [
    bbox[0],
    bbox[1],
    bbox[2],
    bbox[3],
]; };
exports.bboxToExtent = bboxToExtent;
var geoToExtent = function (geo) {
    return bboxToExtent(turf.bbox(geo));
};
exports.geoToExtent = geoToExtent;
//# sourceMappingURL=utilities.js.map