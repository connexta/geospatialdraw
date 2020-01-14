"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dms_formatting_1 = require("./dms-formatting");
var usng_js_1 = require("usng.js");
var DECIMAL_DEGREES_PRECISION = 6;
exports.DECIMAL_DEGREES_PRECISION = DECIMAL_DEGREES_PRECISION;
var USNG_CONVERSION_PRECISION = 6;
exports.USNG_CONVERSION_PRECISION = USNG_CONVERSION_PRECISION;
var UnitConverter = new usng_js_1.Converter();
var latLonTo = {
    LatLonDMS: function (_a) {
        var lat = _a.lat, lon = _a.lon;
        return ({
            lat: dms_formatting_1.decimalToDMS(lat),
            lon: dms_formatting_1.decimalToDMS(lon),
        });
    },
    USNGBox: function (north, south, east, west) {
        return UnitConverter.LLBboxtoUSNG(north, south, east, west);
    },
    USNG: function (_a, precision) {
        var lat = _a.lat, lon = _a.lon;
        var usng = '';
        try {
            usng = UnitConverter.LLtoUSNG(lat, lon, precision);
        }
        catch (_e) { }
        return usng;
    },
    UTM: function (_a) {
        var lat = _a.lat, lon = _a.lon;
        var _b = UnitConverter.LLtoUTMUPSObject(lat, lon), easting = _b.easting, northing = _b.northing, zoneNumber = _b.zoneNumber, northPole = _b.northPole;
        return {
            easting: easting,
            northing: northing,
            zone: zoneNumber,
            hemisphere: northPole ? 'N' : 'S',
        };
    },
};
exports.latLonTo = latLonTo;
var isValidLatLon = function (_a) {
    var lat = _a.lat, lon = _a.lon;
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};
exports.isValidLatLon = isValidLatLon;
//# sourceMappingURL=coordinate-converter.js.map