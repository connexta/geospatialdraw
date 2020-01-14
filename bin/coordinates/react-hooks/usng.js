"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var usng_js_1 = require("usng.js");
var coordinate_converter_1 = require("../coordinate-converter");
var sync_coordinates_1 = __importDefault(require("./sync-coordinates"));
var usngToCoordinates = function (usng, initCoordinates, converter) {
    var matrix = converter.isUSNG(usng);
    if (!matrix) {
        return [initCoordinates, false];
    }
    return [converter.USNGtoLL(matrix, true), true];
};
/**
 * Adds USNG state
 * @param initCoordinates - init lat long value
 * @returns [{ lat, lon } || null, usng, setUSNG, isValid, formattedUSNG]
 */
var useUSNGCoordinates = function (initCoordinates) {
    var converter = new usng_js_1.Converter();
    var _a = react_1.useState(initCoordinates), coordinates = _a[0], setCoordinates = _a[1];
    var _b = react_1.useState(true), isValid = _b[0], setIsValid = _b[1];
    var formattedUSNG = coordinate_converter_1.latLonTo.USNG(coordinates, coordinate_converter_1.USNG_CONVERSION_PRECISION);
    var _c = react_1.useState(formattedUSNG), usng = _c[0], setRawUSNG = _c[1];
    var setUSNG = function (value) {
        var _a = usngToCoordinates(value, initCoordinates, converter), coordinates = _a[0], isValid = _a[1];
        setCoordinates(coordinates);
        setRawUSNG(value);
        setIsValid(isValid);
    };
    sync_coordinates_1.default(initCoordinates, coordinates, function (value) {
        var updated = coordinate_converter_1.latLonTo.USNG(value, coordinate_converter_1.USNG_CONVERSION_PRECISION);
        setUSNG(updated);
    });
    return [coordinates, usng, setUSNG, isValid, formattedUSNG];
};
exports.default = useUSNGCoordinates;
//# sourceMappingURL=usng.js.map