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
var React = require("react");
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var flat_coordinate_list_geo_editor_1 = require("./flat-coordinate-list-geo-editor");
var finalizeGeo = function (geo) { return geo; };
var LineGeoEditor = function (props) { return (React.createElement(flat_coordinate_list_geo_editor_1.FlatCoordinateListGeoEditor, __assign({}, props, { getCoordinatesFromGeo: function (geo) {
        var coordinates = geo.geometry
            .coordinates;
        return coordinates.length < 1 ? [[0, 0]] : coordinates;
    }, updateGeoCoordinates: function (geo, coordinates) {
        var updated = __assign({}, geo);
        if (coordinates.length < 1) {
            coordinates = [[0, 0]];
        }
        var lineGeo = geo.geometry;
        lineGeo.coordinates = coordinates;
        return updated;
    } }))); };
exports.LineGeoEditor = LineGeoEditor;
var LineEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(LineGeoEditor, 'Line', finalizeGeo);
exports.LineEditorDialog = LineEditorDialog;
LineEditorDialog.displayName = 'LineEditorDialog';
//# sourceMappingURL=line-editor-dialog.js.map