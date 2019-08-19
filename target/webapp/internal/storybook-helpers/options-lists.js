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
var geometry_1 = require("../../geometry");
var coordinate_editor_1 = require("../../coordinate-editor");
var coordinateUnitList = [coordinate_editor_1.LAT_LON, coordinate_editor_1.LAT_LON_DMS, coordinate_editor_1.USNG, coordinate_editor_1.UTM];
exports.coordinateUnitList = coordinateUnitList;
var lengthUnitList = [geometry_1.KILOMETERS, geometry_1.METERS, geometry_1.MILES, geometry_1.NAUTICAL_MILES, geometry_1.YARDS, geometry_1.FEET];
exports.lengthUnitList = lengthUnitList;
var shapeList = ['Line', 'Polygon', 'Bounding Box', 'Point Radius', 'Point'];
exports.shapeList = shapeList;
//# sourceMappingURL=options-lists.js.map