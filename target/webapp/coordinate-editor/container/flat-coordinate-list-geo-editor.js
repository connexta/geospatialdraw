"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var geometry_1 = require("../../geometry");
var flat_coordinate_list_editor_1 = require("../presentation/flat-coordinate-list-editor");
var FlatCoordinateListGeoEditor = /** @class */ (function (_super) {
    __extends(FlatCoordinateListGeoEditor, _super);
    function FlatCoordinateListGeoEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            editIndex: 0,
        };
        return _this;
    }
    FlatCoordinateListGeoEditor.prototype.updateGeoProperties = function (geo, coordinates) {
        var updated = this.props.updateGeoCoordinates(geo, coordinates);
        var bufferedGeo = geometry_1.makeBufferedGeo(updated);
        updated.bbox = geometry_1.geoToExtent(bufferedGeo);
        return updated;
    };
    FlatCoordinateListGeoEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
        var editIndex = this.state.editIndex;
        var coordinateList = this.props.getCoordinatesFromGeo(geo);
        var validIndex = Math.min(Math.max(editIndex, 0), coordinateList.length - 1);
        var lon = coordinateList[validIndex][0];
        var lat = coordinateList[validIndex][1];
        return (React.createElement(flat_coordinate_list_editor_1.default, { selectedIndex: editIndex, buffer: geo.properties.buffer || 0, bufferUnit: geo.properties.bufferUnit || geometry_1.METERS, coordinateList: coordinateList, coordinateUnit: coordinateUnit, lat: lat, lon: lon, setBuffer: function (buffer) {
                var updated = __assign({}, geo, { properties: __assign({}, geo.properties, { buffer: buffer }) });
                onUpdateGeo(updated);
            }, setUnit: function (bufferUnit) {
                var updated = __assign({}, geo, { properties: __assign({}, geo.properties, { bufferUnit: bufferUnit }) });
                onUpdateGeo(updated);
            }, setCoordinate: function (lat, lon) {
                var updatedCoordinates = coordinateList.slice();
                updatedCoordinates.splice(editIndex, 1, [lon, lat]);
                var updated = _this.updateGeoProperties(geo, updatedCoordinates);
                onUpdateGeo(updated);
            }, addCoordinate: function () {
                var updatedCoordinates = coordinateList.slice();
                updatedCoordinates.splice(editIndex + 1, 0, [0, 0]);
                var updated = _this.updateGeoProperties(geo, updatedCoordinates);
                _this.setState({
                    editIndex: editIndex + 1,
                }, function () { return onUpdateGeo(updated); });
            }, deleteCoordinate: function () {
                var updatedCoordinates = coordinateList.slice();
                updatedCoordinates.splice(editIndex, 1);
                var updated = _this.updateGeoProperties(geo, updatedCoordinates);
                onUpdateGeo(updated);
            }, selectCoordinate: function (editIndex) {
                _this.setState({
                    editIndex: editIndex,
                });
            } }));
    };
    return FlatCoordinateListGeoEditor;
}(React.Component));
exports.FlatCoordinateListGeoEditor = FlatCoordinateListGeoEditor;
//# sourceMappingURL=flat-coordinate-list-geo-editor.js.map