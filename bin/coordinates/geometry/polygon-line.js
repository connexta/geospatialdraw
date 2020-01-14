"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("../../geometry/units");
var shape_factory_1 = require("../../geometry/shape-factory");
var polygonPropsToGeo = function (_a) {
    var id = _a.id, coordinates = _a.coordinates, buffer = _a.buffer, bufferUnit = _a.bufferUnit, properties = _a.properties;
    return shape_factory_1.makePolygonGeo(id, coordinates, buffer, bufferUnit, properties);
};
exports.polygonPropsToGeo = polygonPropsToGeo;
var linePropsToGeo = function (_a) {
    var id = _a.id, coordinates = _a.coordinates, buffer = _a.buffer, bufferUnit = _a.bufferUnit, properties = _a.properties;
    return shape_factory_1.makeLineGeo(id, coordinates, buffer, bufferUnit, properties);
};
exports.linePropsToGeo = linePropsToGeo;
var geoToPolygonProps = function (_a) {
    var properties = _a.properties, geometry = _a.geometry;
    var coordinates = geometry.coordinates[0];
    return {
        id: properties.id,
        coordinates: coordinates.length < 2
            ? [[0, 0]]
            : coordinates.slice(0, coordinates.length - 1),
        buffer: properties.buffer ? properties.buffer.width : 0,
        bufferUnit: properties.buffer ? properties.buffer.unit : units_1.METERS,
        properties: properties,
    };
};
exports.geoToPolygonProps = geoToPolygonProps;
var geoToLineProps = function (_a) {
    var properties = _a.properties, geometry = _a.geometry;
    var coordinates = geometry.coordinates;
    return {
        id: properties.id,
        coordinates: coordinates.length < 1 ? [[0, 0]] : coordinates,
        buffer: properties.buffer ? properties.buffer.width : 0,
        bufferUnit: properties.buffer ? properties.buffer.unit : units_1.METERS,
        properties: properties,
    };
};
exports.geoToLineProps = geoToLineProps;
/**
 * Converts a [number, number] lon lat coordinate pair to a LatLonDD object
 */
var coordinateArrayValueToLatLon = function (coordinate) { return ({
    lat: coordinate[1],
    lon: coordinate[0],
}); };
exports.coordinateArrayValueToLatLon = coordinateArrayValueToLatLon;
//# sourceMappingURL=polygon-line.js.map