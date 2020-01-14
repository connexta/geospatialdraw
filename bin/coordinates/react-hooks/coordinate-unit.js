"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Units = __importStar(require("../units"));
var dms_formatting_1 = require("../dms-formatting");
var utm_formatting_1 = require("../utm-formatting");
var coordinate_converter_1 = require("../coordinate-converter");
var DEGREE_SYMBOL = '\xB0';
/**
 * Converts a lat/lon decimal pair to a string representation of that selected coordinate unit.
 * Example usage:
 * ```
 * const coordinates = useCoordinateUnit({ lat, lon, coordinateUnit })
 * return <Row>
 * {
 *   coordinates.map(text => (
 *     <Column>{text}</Column>
 *   ))
 * }
 * </Row>
 * ```
 * @param object - coordinate properties
 * @returns array of formatted strings divided at the point in which they should be semantically separated.
 */
var useCoordinateUnit = function (_a) {
    var lat = _a.lat, lon = _a.lon, unit = _a.unit;
    var cells = [];
    switch (unit) {
        case Units.LAT_LON:
            {
                cells = [
                    Math.abs(lat).toFixed(coordinate_converter_1.DECIMAL_DEGREES_PRECISION) + " " + DEGREE_SYMBOL + " " + (lat < 0 ? 'S' : 'N'),
                    Math.abs(lon).toFixed(coordinate_converter_1.DECIMAL_DEGREES_PRECISION) + " " + DEGREE_SYMBOL + " " + (lon < 0 ? 'W' : 'E'),
                ];
            }
            break;
        case Units.LAT_LON_DMS:
            {
                var dmsPoint = coordinate_converter_1.latLonTo.LatLonDMS({ lat: lat, lon: lon });
                cells = [dms_formatting_1.dmsToLatString(dmsPoint.lat), dms_formatting_1.dmsToLonString(dmsPoint.lon)];
            }
            break;
        case Units.USNG:
            {
                cells = [coordinate_converter_1.latLonTo.USNG({ lat: lat, lon: lon }, coordinate_converter_1.USNG_CONVERSION_PRECISION)];
            }
            break;
        case Units.UTM:
            {
                cells = [utm_formatting_1.utmToString(coordinate_converter_1.latLonTo.UTM({ lat: lat, lon: lon }))];
            }
            break;
    }
    return cells;
};
exports.default = useCoordinateUnit;
//# sourceMappingURL=coordinate-unit.js.map