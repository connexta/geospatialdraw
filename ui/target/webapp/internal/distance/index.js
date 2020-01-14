"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("geospatialdraw/bin/geometry/units");
var METERS_KILOMETERS = 1000;
var METERS_FEET = 0.3048;
var METERS_YARDS = 0.9144;
var METERS_MILES = 1609.344;
var METERS_NAUTICAL_MILES = 1852;
var getDistanceInMeters = function (distance, units) {
    switch (units) {
        case units_1.KILOMETERS:
            return distance * METERS_KILOMETERS;
        case units_1.FEET:
            return distance * METERS_FEET;
        case units_1.YARDS:
            return distance * METERS_YARDS;
        case units_1.MILES:
            return distance * METERS_MILES;
        case units_1.NAUTICAL_MILES:
            return distance * METERS_NAUTICAL_MILES;
        case units_1.METERS:
        default:
            return distance;
    }
};
exports.getDistanceInMeters = getDistanceInMeters;
var getDistanceFromMeters = function (distance, units) {
    switch (units) {
        case units_1.KILOMETERS:
            return distance / METERS_KILOMETERS;
        case units_1.FEET:
            return distance / METERS_FEET;
        case units_1.YARDS:
            return distance / METERS_YARDS;
        case units_1.MILES:
            return distance / METERS_MILES;
        case units_1.NAUTICAL_MILES:
            return distance / METERS_NAUTICAL_MILES;
        case units_1.METERS:
        default:
            return distance;
    }
};
exports.getDistanceFromMeters = getDistanceFromMeters;
//# sourceMappingURL=index.js.map