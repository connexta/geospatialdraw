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
var lat_lon_input_1 = require("./lat-lon-input");
var Common = require("./common-styles");
var Root = Common.Column;
var TextGroup = Common.SpacedInputLabelRow;
var Label = Common.Label;
var LatLonPointEditor = function (_a) {
    var lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate;
    return (React.createElement(Root, null,
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "Latitude"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: lat, onChange: function (value) { return setCoordinate(value, lon); } })),
        React.createElement(TextGroup, { style: { marginBottom: 0 } },
            React.createElement(Label, null, "Longitude"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: lon, onChange: function (value) { return setCoordinate(lat, value); } }))));
};
exports.default = LatLonPointEditor;
//# sourceMappingURL=lat-lon-point-editor.js.map