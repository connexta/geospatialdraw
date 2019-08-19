"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("./units");
var DEFAULT_PROPERTIES = {
    shape: 'Polygon',
    id: '',
    color: 'blue',
    buffer: 0,
    bufferUnit: units_1.METERS,
};
exports.DEFAULT_PROPERTIES = DEFAULT_PROPERTIES;
var DEFAULT_POLYGON = {
    type: 'Polygon',
    coordinates: [[[0, 0]]],
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
var CIRCLE_BUFFER_PROPERTY_VALUE = 'circle';
exports.CIRCLE_BUFFER_PROPERTY_VALUE = CIRCLE_BUFFER_PROPERTY_VALUE;
var POLYGON_LINE_BUFFER_PROPERTY_VALUE = 'polygon/line';
exports.POLYGON_LINE_BUFFER_PROPERTY_VALUE = POLYGON_LINE_BUFFER_PROPERTY_VALUE;
var BUFFER_SHAPE_PROPERTY = 'bufferShape';
exports.BUFFER_SHAPE_PROPERTY = BUFFER_SHAPE_PROPERTY;
//# sourceMappingURL=geometry.js.map