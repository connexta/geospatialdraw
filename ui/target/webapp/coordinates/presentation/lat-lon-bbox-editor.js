"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var lat_lon_input_1 = require("./lat-lon-input");
var Common = __importStar(require("./common-styles"));
var Root = Common.BBoxRoot;
var TextGroup = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n"])));
var Label = Common.CompactLabel;
var LatLonBBoxEditor = function (_a) {
    var bbox = _a.bbox, setBBox = _a.setBBox;
    var north = bbox.north, south = bbox.south, east = bbox.east, west = bbox.west;
    return (React.createElement(Root, { flexDirection: "column" },
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "North"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: north, onChange: function (value) {
                    setBBox(__assign({}, bbox, { north: value }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "South"),
            React.createElement(lat_lon_input_1.LatitudeInput, { value: south, onChange: function (value) {
                    setBBox(__assign({}, bbox, { south: value }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "East"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: east, onChange: function (value) {
                    setBBox(__assign({}, bbox, { east: value }));
                } })),
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "West"),
            React.createElement(lat_lon_input_1.LongitudeInput, { value: west, onChange: function (value) {
                    setBBox(__assign({}, bbox, { west: value }));
                } }))));
};
exports.default = LatLonBBoxEditor;
var templateObject_1;
//# sourceMappingURL=lat-lon-bbox-editor.js.map