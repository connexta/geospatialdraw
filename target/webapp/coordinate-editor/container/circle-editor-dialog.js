"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var point_circle_editor_1 = require("../presentation/point-circle-editor");
var circle_geo_writer_1 = require("../circle-geo-writer");
var finalizeGeo = function (geo) { return geo; };
var CircleGeoEditor = /** @class */ (function (_super) {
    __extends(CircleGeoEditor, _super);
    function CircleGeoEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircleGeoEditor.prototype.render = function () {
        var _a = this.props, geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
        var lon = geo.geometry.coordinates[0];
        var lat = geo.geometry.coordinates[1];
        var radius = geo.properties.buffer || 0;
        var radiusUnit = geo.properties.bufferUnit;
        return (React.createElement(point_circle_editor_1.CircleEditor, { coordinateUnit: coordinateUnit, lat: lat, lon: lon, radius: radius, radiusUnit: radiusUnit, setCoordinate: function (latValue, lonValue) {
                onUpdateGeo(circle_geo_writer_1.updateCircleGeo(geo, latValue, lonValue, radius, radiusUnit));
            }, setRadius: function (value) {
                onUpdateGeo(circle_geo_writer_1.updateCircleGeo(geo, lat, lon, value, radiusUnit));
            }, setRadiusUnit: function (value) {
                onUpdateGeo(circle_geo_writer_1.updateCircleGeo(geo, lat, lon, radius, value));
            } }));
    };
    return CircleGeoEditor;
}(React.Component));
exports.CircleGeoEditor = CircleGeoEditor;
var CircleEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(CircleGeoEditor, 'Point Radius', finalizeGeo);
exports.CircleEditorDialog = CircleEditorDialog;
CircleEditorDialog.displayName = 'CircleEditorDialog';
//# sourceMappingURL=circle-editor-dialog.js.map