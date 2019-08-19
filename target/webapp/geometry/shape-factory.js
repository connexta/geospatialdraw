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
var utilities_1 = require("./utilities");
var geometry_1 = require("./geometry");
var makeGeometryJSONFromGeometry = function (id, geometry, shape, buffer, bufferUnit) {
    if (buffer === void 0) { buffer = 0; }
    if (bufferUnit === void 0) { bufferUnit = geometry_1.DEFAULT_PROPERTIES.bufferUnit; }
    return utilities_1.makeGeometry(id, geometry, geometry_1.DEFAULT_PROPERTIES.color, shape, buffer, bufferUnit);
};
var makePointGeo = function (id, lat, lon) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Point',
        coordinates: [lon, lat],
    }, 'Point');
};
exports.makePointGeo = makePointGeo;
var makePointRadiusGeo = function (id, lat, lon, radius, radiusUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Point',
        coordinates: [lon, lat],
    }, 'Point Radius', radius, radiusUnit);
};
exports.makePointRadiusGeo = makePointRadiusGeo;
var makePolygonGeo = function (id, lonLatCoordinateList, buffer, bufferUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'Polygon',
        coordinates: [lonLatCoordinateList.concat([lonLatCoordinateList[0]])],
    }, 'Polygon', buffer, bufferUnit);
};
exports.makePolygonGeo = makePolygonGeo;
var makeLineGeo = function (id, lonLatCoordinateList, buffer, bufferUnit) {
    return makeGeometryJSONFromGeometry(id, {
        type: 'LineString',
        coordinates: lonLatCoordinateList,
    }, 'Line', buffer, bufferUnit);
};
exports.makeLineGeo = makeLineGeo;
var makeBBoxGeo = function (id, extent) {
    return makeGeometryJSONFromGeometry(id, __assign({}, turf.bboxPolygon(extent).geometry), 'Bounding Box');
};
exports.makeBBoxGeo = makeBBoxGeo;
//# sourceMappingURL=shape-factory.js.map