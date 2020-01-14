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
var number_input_1 = __importDefault(require("./number-input"));
var coordinate_converter_1 = require("geospatialdraw/bin/coordinates/coordinate-converter");
var DegreeInput = styled_components_1.default(number_input_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 8rem;\n"], ["\n  width: 8rem;\n"])));
var LatitudeInput = function (props) { return (React.createElement(DegreeInput, __assign({ maxValue: 90, minValue: -90, decimalPlaces: coordinate_converter_1.DECIMAL_DEGREES_PRECISION, placeholder: "Latitude" }, props))); };
exports.LatitudeInput = LatitudeInput;
var LongitudeInput = function (props) { return (React.createElement(DegreeInput, __assign({ maxValue: 180, minValue: -180, decimalPlaces: coordinate_converter_1.DECIMAL_DEGREES_PRECISION, placeholder: "Longitude" }, props))); };
exports.LongitudeInput = LongitudeInput;
var templateObject_1;
//# sourceMappingURL=lat-lon-input.js.map