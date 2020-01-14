"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var lat_lon_input_1 = require("./lat-lon-input");
var Common = __importStar(require("./common-styles"));
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