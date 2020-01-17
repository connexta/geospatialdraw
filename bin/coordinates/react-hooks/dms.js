"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var dms_formatting_1 = require("../dms-formatting");
var coordinate_converter_1 = require("../coordinate-converter");
var sync_coordinates_1 = __importDefault(require("./sync-coordinates"));
/**
 * Adds DMS coordinate state
 * @param initCoordinates - init lat lon coordinates
 * @returns [{ lat, lon } || null, dmsCoordinates, setDMSCoordinates, isValid, dmsString]
 */
var useDMSCoordinates = function (initCoordinates) {
    var _a = react_1.useState(initCoordinates), coordinates = _a[0], setCoordinates = _a[1];
    var _b = react_1.useState(true), isValid = _b[0], setIsValid = _b[1];
    var dmsCoordinates = {
        lat: dms_formatting_1.decimalToDMS(coordinates.lat),
        lon: dms_formatting_1.decimalToDMS(coordinates.lon),
    };
    var setDMS = function (value) {
        var coordinates = {
            lat: dms_formatting_1.dmsToDecimal(value.lat),
            lon: dms_formatting_1.dmsToDecimal(value.lon),
        };
        var coordinatesAreValid = coordinate_converter_1.isValidLatLon(coordinates);
        if (coordinatesAreValid) {
            setCoordinates(coordinates);
        }
        setIsValid(coordinatesAreValid);
    };
    var dmsString = dms_formatting_1.dmsCoordinateToString(dmsCoordinates.lat, dmsCoordinates.lon);
    sync_coordinates_1.default(initCoordinates, coordinates, function (value) {
        var updated = {
            lat: dms_formatting_1.decimalToDMS(value.lat),
            lon: dms_formatting_1.decimalToDMS(value.lon),
        };
        setDMS(updated);
    });
    return [coordinates, dmsCoordinates, setDMS, isValid, dmsString];
};
exports.default = useDMSCoordinates;
//# sourceMappingURL=dms.js.map