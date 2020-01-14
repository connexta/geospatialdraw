"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shape_factory_1 = require("../../geometry/shape-factory");
/** @internal */
var bboxToExtent = function (_a) {
    var west = _a.west, south = _a.south, east = _a.east, north = _a.north;
    return [
        Math.min(west, east),
        Math.min(south, north),
        Math.max(west, east),
        Math.max(south, north),
    ];
};
/** @internal */
var extentToBBox = function (_a) {
    var west = _a[0], south = _a[1], east = _a[2], north = _a[3];
    return ({
        west: west,
        south: south,
        east: east,
        north: north,
    });
};
var bboxPropsToGeo = function (_a) {
    var id = _a.id, bbox = _a.bbox, properties = _a.properties;
    return shape_factory_1.makeBBoxGeo(id, bboxToExtent(bbox), properties);
};
exports.bboxPropsToGeo = bboxPropsToGeo;
var geoToBBoxProps = function (geo) { return ({
    id: geo.properties.id,
    bbox: extentToBBox(geo.bbox),
    properties: geo.properties,
}); };
exports.geoToBBoxProps = geoToBBoxProps;
var coordinatePairToBBox = function (coordinates) { return ({
    west: Math.min(coordinates[0].lon, coordinates[1].lon),
    south: Math.min(coordinates[0].lat, coordinates[1].lat),
    east: Math.max(coordinates[0].lon, coordinates[1].lon),
    north: Math.max(coordinates[0].lat, coordinates[1].lat),
}); };
exports.coordinatePairToBBox = coordinatePairToBBox;
/**
 * @returns LatLonDD coordinate pair as [upperLeft, lowerRight]
 */
var bboxToCoordinatePair = function (_a) {
    var west = _a.west, south = _a.south, east = _a.east, north = _a.north;
    return [
        { lat: north, lon: west },
        { lat: south, lon: east },
    ];
};
exports.bboxToCoordinatePair = bboxToCoordinatePair;
//# sourceMappingURL=bbox.js.map