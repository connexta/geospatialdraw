"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var Common = __importStar(require("./common-styles"));
var coordinate_unit_1 = __importDefault(require("geospatialdraw/bin/coordinates/react-hooks/coordinate-unit"));
var styled_components_1 = __importDefault(require("styled-components"));
var Row = Common.Row;
var Column = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  justify-content: flex-start;\n  margin: 0;\n  padding: 0;\n  margin-right: ", ";\n"], ["\n  display: flex;\n  flex-grow: 1;\n  justify-content: flex-start;\n  margin: 0;\n  padding: 0;\n  margin-right: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
var CoordinateValue = function (_a) {
    var lat = _a.lat, lon = _a.lon, unit = _a.unit;
    var coordinates = coordinate_unit_1.default({ lat: lat, lon: lon, unit: unit });
    return (React.createElement(Row, null, coordinates.map(function (text) { return (React.createElement(Column, null, text)); })));
};
exports.default = CoordinateValue;
var templateObject_1;
//# sourceMappingURL=coordinate-value.js.map