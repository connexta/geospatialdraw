"use strict";
/** @internal */
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("geospatialdraw/bin/geometry/units");
var units_2 = require("geospatialdraw/bin/coordinates/units");
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var coordinateUnitList = [units_2.LAT_LON, units_2.LAT_LON_DMS, units_2.USNG, units_2.UTM];
exports.coordinateUnitList = coordinateUnitList;
var lengthUnitList = [units_1.KILOMETERS, units_1.METERS, units_1.MILES, units_1.NAUTICAL_MILES, units_1.YARDS, units_1.FEET];
exports.lengthUnitList = lengthUnitList;
var shapeList = [shape_1.LINE, shape_1.POLYGON, shape_1.BOUNDING_BOX, shape_1.POINT_RADIUS, shape_1.POINT];
exports.shapeList = shapeList;
//# sourceMappingURL=options-lists.js.map