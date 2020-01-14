"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var turf = __importStar(require("@turf/turf"));
var utilities_1 = require("./utilities");
var shapes_1 = require("../shapes");
var units_1 = require("./units");
var makeGeometryJSONFromGeometry = function (_a) {
    var id = _a.id, geometry = _a.geometry, shape = _a.shape, _b = _a.buffer, buffer = _b === void 0 ? 0 : _b, _c = _a.bufferUnit, bufferUnit = _c === void 0 ? units_1.METERS : _c, _d = _a.properties, properties = _d === void 0 ? {} : _d;
    return utilities_1.makeGeometry(id, geometry, properties && properties.color ? properties.color : '', shape, buffer, bufferUnit, properties);
};
/**
 * Creates a Point GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makePointGeo = function (id, lat, lon, properties) {
    if (properties === void 0) { properties = {}; }
    return makeGeometryJSONFromGeometry({
        id: id,
        geometry: {
            type: 'Point',
            coordinates: [lon, lat],
        },
        shape: shapes_1.POINT,
        properties: properties,
    });
};
exports.makePointGeo = makePointGeo;
/**
 * Creates a Point Radius GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lat - center lattitude
 * @param lon - center longitude
 * @param radius - radius length
 * @param radiusUnit - radius length unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makePointRadiusGeo = function (id, lat, lon, radius, radiusUnit, properties) {
    if (properties === void 0) { properties = {}; }
    return makeGeometryJSONFromGeometry({
        id: id,
        geometry: {
            type: 'Point',
            coordinates: [lon, lat],
        },
        shape: shapes_1.POINT_RADIUS,
        buffer: radius,
        bufferUnit: radiusUnit,
        properties: properties,
    });
};
exports.makePointRadiusGeo = makePointRadiusGeo;
/**
 * Creates a Polygon GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makePolygonGeo = function (id, lonLatCoordinateList, buffer, bufferUnit, properties) {
    if (properties === void 0) { properties = {}; }
    return makeGeometryJSONFromGeometry({
        id: id,
        geometry: {
            type: 'Polygon',
            coordinates: [lonLatCoordinateList.concat([lonLatCoordinateList[0]])],
        },
        shape: shapes_1.POLYGON,
        buffer: buffer,
        bufferUnit: bufferUnit,
        properties: properties,
    });
};
exports.makePolygonGeo = makePolygonGeo;
/**
 * Creates a Line GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param lonLatCoordinateList - array of coordinates in the format of [[longitude, lattitude], ...]
 * @param buffer - buffer size
 * @param bufferUnit - buffer size unit of measurement
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makeLineGeo = function (id, lonLatCoordinateList, buffer, bufferUnit, properties) {
    if (properties === void 0) { properties = {}; }
    return makeGeometryJSONFromGeometry({
        id: id,
        geometry: {
            type: 'LineString',
            coordinates: lonLatCoordinateList,
        },
        shape: shapes_1.LINE,
        buffer: buffer,
        bufferUnit: bufferUnit,
        properties: properties,
    });
};
exports.makeLineGeo = makeLineGeo;
/**
 * Creates a Bounding Box GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param extent - Extent of bounding box
 * @param properties - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makeBBoxGeo = function (id, extent, properties) {
    if (properties === void 0) { properties = {}; }
    return makeGeometryJSONFromGeometry({
        id: id,
        geometry: __assign({}, turf.bboxPolygon(extent).geometry),
        shape: shapes_1.BOUNDING_BOX,
        properties: properties,
    });
};
exports.makeBBoxGeo = makeBBoxGeo;
//# sourceMappingURL=shape-factory.js.map