"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var usng_js_1 = require("usng.js");
var coordinate_converter_1 = require("../coordinate-converter");
var utm_formatting_1 = require("../utm-formatting");
var sync_coordinates_1 = __importDefault(require("./sync-coordinates"));
/**
 * Constants defining range of UTM values
 */
var UTM_BOUNDS = {
    MAX_EASTING: 834000,
    MIN_EASTING: 160000,
    MAX_NORTHING: 10000000,
    MIN_NORTHING: 0,
    MAX_ZONE: 60,
};
exports.UTM_BOUNDS = UTM_BOUNDS;
var utmToCoordinates = function (_a, converter) {
    var northing = _a.northing, easting = _a.easting, zone = _a.zone, hemisphere = _a.hemisphere;
    return converter.UTMtoLLwithNS(northing, easting, zone, null, hemisphere);
};
/**
 * Adds UTM state
 * @param initCoordinates - init longitude latitude values
 * @returns [{ lat, lon } || null, utm, setUTM, isValid, utmString]
 */
var useUTMCoordinates = function (initCoordinates) {
    var converter = new usng_js_1.Converter();
    var _a = react_1.useState(initCoordinates), coordinates = _a[0], setCoordinates = _a[1];
    var correctedUTM = coordinate_converter_1.latLonTo.UTM(coordinates);
    var utmString = utm_formatting_1.utmToString(correctedUTM);
    var _b = react_1.useState(correctedUTM), utm = _b[0], setRawUTM = _b[1];
    var _c = react_1.useState(true), isValid = _c[0], setIsValid = _c[1];
    var setUTM = function (value) {
        var coordinates = utmToCoordinates(value, converter);
        var coordinatesAreValid = coordinate_converter_1.isValidLatLon(coordinates);
        if (coordinatesAreValid) {
            setCoordinates(coordinates);
        }
        setRawUTM(value);
        setIsValid(coordinatesAreValid);
    };
    sync_coordinates_1.default(initCoordinates, coordinates, function (value) {
        var updated = coordinate_converter_1.latLonTo.UTM(value);
        setUTM(updated);
    });
    return [coordinates, utm, setUTM, isValid, utmString];
};
exports.useUTMCoordinates = useUTMCoordinates;
//# sourceMappingURL=utm.js.map