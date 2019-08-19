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
var geometry_1 = require("./geometry");
exports.BUFFER_SHAPE_PROPERTY = geometry_1.BUFFER_SHAPE_PROPERTY;
exports.CIRCLE_BUFFER_PROPERTY_VALUE = geometry_1.CIRCLE_BUFFER_PROPERTY_VALUE;
exports.POLYGON_LINE_BUFFER_PROPERTY_VALUE = geometry_1.POLYGON_LINE_BUFFER_PROPERTY_VALUE;
var utilities_1 = require("./utilities");
exports.bboxToExtent = utilities_1.bboxToExtent;
exports.geoToExtent = utilities_1.geoToExtent;
exports.makeGeometry = utilities_1.makeGeometry;
exports.makeBufferedGeo = utilities_1.makeBufferedGeo;
exports.makeEmptyGeometry = utilities_1.makeEmptyGeometry;
var units_1 = require("./units");
exports.FEET = units_1.FEET;
exports.KILOMETERS = units_1.KILOMETERS;
exports.METERS = units_1.METERS;
exports.MILES = units_1.MILES;
exports.NAUTICAL_MILES = units_1.NAUTICAL_MILES;
exports.YARDS = units_1.YARDS;
var shape_factory_1 = require("./shape-factory");
exports.makeBBoxGeo = shape_factory_1.makeBBoxGeo;
exports.makeLineGeo = shape_factory_1.makeLineGeo;
exports.makePointGeo = shape_factory_1.makePointGeo;
exports.makePointRadiusGeo = shape_factory_1.makePointRadiusGeo;
exports.makePolygonGeo = shape_factory_1.makePolygonGeo;
//# sourceMappingURL=index.js.map