"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("../shapes/shape");
var units_1 = require("./units");
var DEFAULT_PROPERTIES = {
    shape: shape_1.POLYGON,
    id: '',
    color: '',
    buffer: {
        width: 0,
        unit: units_1.METERS,
    },
};
exports.DEFAULT_PROPERTIES = DEFAULT_PROPERTIES;
var DEFAULT_POLYGON = {
    type: 'Polygon',
    coordinates: [
        [
            [0, 0],
            [0, 0],
        ],
    ],
};
var DEFAULT_POINT = {
    type: 'Point',
    coordinates: [0, 0],
};
var DEFAULT_GEOMETRY = {
    Polygon: DEFAULT_POLYGON,
    'Bounding Box': DEFAULT_POLYGON,
    'Point Radius': DEFAULT_POINT,
    Line: {
        type: 'LineString',
        coordinates: [[0, 0]],
    },
    Point: DEFAULT_POINT,
};
exports.DEFAULT_GEOMETRY = DEFAULT_GEOMETRY;
/**
 * Class name added to feature "class" property to identify buffer features
 * in user defined styles.
 */
var BUFFER_CLASSNAME = 'buffer';
exports.BUFFER_CLASSNAME = BUFFER_CLASSNAME;
/**
 * Class name added to feature "class" property to identify label features
 * in user defined styles.
 */
var LABEL_CLASSNAME = 'label';
exports.LABEL_CLASSNAME = LABEL_CLASSNAME;
/**
 * Class name added to feature "class" property to identify hidden features
 * in user defined styles.
 */
var HIDDEN_CLASSNAME = 'hidden';
exports.HIDDEN_CLASSNAME = HIDDEN_CLASSNAME;
//# sourceMappingURL=geometry.js.map