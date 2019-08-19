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
var React = require("react");
var Units = require("../units");
var lat_lon_dms_point_editor_1 = require("../presentation/lat-lon-dms-point-editor");
var lat_lon_point_editor_1 = require("../presentation/lat-lon-point-editor");
var usng_point_editor_1 = require("../presentation/usng-point-editor");
var utm_point_editor_1 = require("../presentation/utm-point-editor");
var editorMap = function (unit) {
    switch (unit) {
        case Units.LAT_LON:
            return lat_lon_point_editor_1.default;
        case Units.LAT_LON_DMS:
            return lat_lon_dms_point_editor_1.default;
        case Units.USNG:
            return usng_point_editor_1.default;
        case Units.UTM:
            return utm_point_editor_1.default;
        default:
            throw new Error("Unit \"" + unit + "\" not supported!");
    }
};
var PointEditor = function (_a) {
    var lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate, unit = _a.unit;
    var EditorTag = editorMap(unit);
    return React.createElement(EditorTag, { lat: lat, lon: lon, setCoordinate: setCoordinate });
};
PointEditor.displayName = 'PointEditor';
exports.default = PointEditor;
//# sourceMappingURL=point-editor.js.map