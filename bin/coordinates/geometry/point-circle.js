"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("../../geometry/units");
var shape_factory_1 = require("../../geometry/shape-factory");
var LAT_COORDINATE = 1;
var LON_COORDINATE = 0;
var pointPropsToGeo = function (_a) {
    var id = _a.id, lat = _a.lat, lon = _a.lon, properties = _a.properties;
    return shape_factory_1.makePointGeo(id, lat, lon, properties);
};
exports.pointPropsToGeo = pointPropsToGeo;
var pointRadiusPropsToGeo = function (_a) {
    var id = _a.id, lat = _a.lat, lon = _a.lon, radius = _a.radius, radiusUnit = _a.radiusUnit, properties = _a.properties;
    return shape_factory_1.makePointRadiusGeo(id, lat, lon, radius, radiusUnit, properties);
};
exports.pointRadiusPropsToGeo = pointRadiusPropsToGeo;
var geoToPointProps = function (_a) {
    var properties = _a.properties, geometry = _a.geometry;
    var coordinates = geometry.coordinates;
    return {
        id: properties.id,
        lat: coordinates[LAT_COORDINATE],
        lon: coordinates[LON_COORDINATE],
        properties: properties,
    };
};
exports.geoToPointProps = geoToPointProps;
var geoToPointRadiusProps = function (_a) {
    var properties = _a.properties, geometry = _a.geometry;
    var coordinates = geometry.coordinates;
    return {
        id: properties.id,
        lat: coordinates[LAT_COORDINATE],
        lon: coordinates[LON_COORDINATE],
        radius: properties.buffer ? properties.buffer.width : 0,
        radiusUnit: properties.buffer ? properties.buffer.unit : units_1.METERS,
        properties: properties,
    };
};
exports.geoToPointRadiusProps = geoToPointRadiusProps;
//# sourceMappingURL=point-circle.js.map