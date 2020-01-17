"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var FEET = 'feet';
exports.FEET = FEET;
var KILOMETERS = 'kilometers';
exports.KILOMETERS = KILOMETERS;
var METERS = 'meters';
exports.METERS = METERS;
var MILES = 'miles';
exports.MILES = MILES;
var NAUTICAL_MILES = 'nautical miles';
exports.NAUTICAL_MILES = NAUTICAL_MILES;
var YARDS = 'yards';
exports.YARDS = YARDS;
var abbreviations = (_a = {},
    _a[FEET] = 'ft',
    _a[KILOMETERS] = 'km',
    _a[METERS] = 'm',
    _a[MILES] = 'mi',
    _a[NAUTICAL_MILES] = 'nm',
    _a[YARDS] = 'yd',
    _a);
var abbreviateUnit = function (unit) { return abbreviations[unit]; };
exports.abbreviateUnit = abbreviateUnit;
//# sourceMappingURL=units.js.map