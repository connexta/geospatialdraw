"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var turf = __importStar(require("@turf/turf"));
var units_1 = require("./units");
var distance_1 = require("../internal/distance");
/**
 * Formats a number for display
 * @params precision - number of significant digits to display
 * @params maxStandardLength - maximum length of text before scientific notation sould be displayed
 * @params n - number to display
 * @returns formatted text
 */
var formatNumber = function (precision, maxStandardLength, n) {
    var scientific = n.toPrecision(precision);
    var standard = Number(scientific).toString();
    return standard.length > maxStandardLength ? scientific : standard;
};
exports.formatNumber = formatNumber;
/**
 * Caclulates distance between two points on a map
 * @params a - first point
 * @params b - second point
 * @params unit - unit of measurement to return distance in
 * @returns distance in specified unit
 */
var distanceBetweenPoints = function (a, b, unit) {
    var distance = turf.distance(a, b, { units: 'meters' });
    return distance_1.getDistanceFromMeters(distance, unit);
};
exports.distanceBetweenPoints = distanceBetweenPoints;
/**
 * Returns a unit and length that best fits the value range of the input unit and length
 */
var optimizedUnitForLength = function (_a) {
    var unit = _a.unit, length = _a.length;
    return unit === units_1.METERS && length > 1500
        ? { unit: units_1.KILOMETERS, length: distance_1.getDistanceFromMeters(length, units_1.KILOMETERS) }
        : { unit: unit, length: length };
};
exports.optimizedUnitForLength = optimizedUnitForLength;
/**
 * Caclulates distance between two points on a map on returns the optimizedUnitForLength value for it
 */
var optimizedUnitForDistanceBetweenPoints = function (a, b, unit) {
    return optimizedUnitForLength({
        length: distanceBetweenPoints(a, b, unit),
        unit: unit,
    });
};
exports.optimizedUnitForDistanceBetweenPoints = optimizedUnitForDistanceBetweenPoints;
//# sourceMappingURL=measurements.js.map