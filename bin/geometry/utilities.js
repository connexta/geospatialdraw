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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var turf = __importStar(require("@turf/turf"));
var shape_1 = require("../shapes/shape");
var shape_detector_1 = __importDefault(require("../shapes/shape-detector"));
var units_1 = require("./units");
var geometry_1 = require("./geometry");
var distance_1 = require("../internal/distance");
function cloneDeep(o) {
    return JSON.parse(JSON.stringify(o));
}
var MINIMUM_BUFFERED_POLYGON_COORDINATE_LENGTH = 4;
var MINIMUM_BUFFERED_LINE_COORDINATE_LENGTH = 2;
var shapeDetector = new shape_detector_1.default();
/**
 * Returns a buffer property for the geometry
 * providing a default empty value if there is no
 * buffer property present
 * @param properties - GeometryJSON properties
 *
 * @returns Buffer
 */
var getBufferPropOrDefault = function (properties) {
    return properties.buffer ? properties.buffer : { width: 0, unit: units_1.METERS };
};
exports.getBufferPropOrDefault = getBufferPropOrDefault;
/**
 * Creates a full GeometryJSON object from a Feature or Geometry GeoJSON object
 *
 * @param id - unique id for geometry
 * @param json - GeoJSON object
 *
 * @returns GeometryJSON
 */
var geoJSONToGeometryJSON = function (id, json) {
    var shape = shapeDetector.shapeFromGeoJSON(json);
    var properties = json.properties || {};
    var _a = getBufferPropOrDefault(properties), width = _a.width, unit = _a.unit;
    return makeGeometry(id, json, properties.color || '', shape, width, unit, properties);
};
exports.geoJSONToGeometryJSON = geoJSONToGeometryJSON;
/**
 * Creates a full GeometryJSON object from a GeoJSON Geometry object
 *
 * @param id - unique id for geometry
 * @param geometryGeoJSON - GeoJSON Geometry object to extend
 * @param color - CSS color for geometry
 * @param shape - geometry shape
 * @param [buffer] - buffer size
 * @param [bufferUnit] - buffer size unit of measurement
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makeGeometry = function (id, geometryGeoJSON, color, shape, buffer, bufferUnit, properties) {
    if (buffer === void 0) { buffer = 0; }
    if (bufferUnit === void 0) { bufferUnit = units_1.METERS; }
    if (properties === void 0) { properties = {}; }
    var geometry = turf.getGeom(cloneDeep(geometryGeoJSON));
    var json = {
        type: 'Feature',
        properties: __assign({}, properties, { id: id,
            color: color,
            shape: shape, buffer: {
                width: buffer,
                unit: bufferUnit,
            } }),
        geometry: geometry,
        bbox: [0, 0, 0, 0],
    };
    json.bbox = geoToExtent(makeBufferedGeo(json));
    return json;
};
exports.makeGeometry = makeGeometry;
/**
 * Creates an empty GeometryJSON object
 *
 * @param id - unique id for geometry
 * @param shape - geometry shape
 * @param [properties] - hash of properties to pass to new GeometryJSON
 *
 * @returns GeometryJSON
 */
var makeEmptyGeometry = function (id, shape, properties) {
    if (properties === void 0) { properties = {}; }
    return ({
        type: 'Feature',
        properties: __assign({}, geometry_1.DEFAULT_PROPERTIES, properties, { shape: shape,
            id: id, buffer: {
                width: shape === shape_1.POINT_RADIUS ? Number.MIN_VALUE : 0,
                unit: units_1.METERS,
            } }),
        bbox: [0, 0, 0, 0],
        geometry: cloneDeep(geometry_1.DEFAULT_GEOMETRY[shape]),
    });
};
exports.makeEmptyGeometry = makeEmptyGeometry;
/**
 * Creates a buffered GeometryJSON object from a source
 * GeometryJSON object using it's geometry and buffer values
 *
 * @param geo - source GeometryJSON object
 *
 * @returns GeometryJSON with buffer applied
 */
var makeBufferedGeo = function (geo) {
    if (((geo.geometry.type === 'Polygon' &&
        geo.geometry.coordinates[0].length >=
            MINIMUM_BUFFERED_POLYGON_COORDINATE_LENGTH) ||
        (geo.geometry.type === 'LineString' &&
            geo.geometry.coordinates.length >=
                MINIMUM_BUFFERED_LINE_COORDINATE_LENGTH) ||
        geo.geometry.type === 'Point') &&
        geo.properties.shape !== shape_1.BOUNDING_BOX &&
        geo.properties.buffer &&
        geo.properties.buffer.width > 0) {
        // Copy JSON since turf.buffer has side effects
        geo = cloneDeep(geo);
        var _a = getBufferPropOrDefault(geo.properties), width = _a.width, unit = _a.unit;
        var radius = distance_1.getDistanceInMeters(width, unit);
        var bufferedGeo = void 0;
        if (geo.geometry.type === 'Point') {
            if (radius > 0) {
                var point = geo.geometry;
                bufferedGeo = turf.circle(point.coordinates, radius, {
                    units: 'meters',
                });
                bufferedGeo = __assign({}, geo, { geometry: bufferedGeo.geometry });
            }
            else {
                bufferedGeo = geo;
            }
        }
        else {
            bufferedGeo = turf.buffer(geo, radius, {
                units: 'meters',
            });
        }
        if (bufferedGeo === undefined) {
            return geo;
        }
        else if (bufferedGeo.properties) {
            bufferedGeo.properties.class = (bufferedGeo.properties.class || []).concat(geometry_1.BUFFER_CLASSNAME);
        }
        return bufferedGeo;
    }
    return geo;
};
exports.makeBufferedGeo = makeBufferedGeo;
/**
 * Converts an arbitrary bbox value from GeoJSON to a 2D extent value
 *
 * @param bbox - 2D/3D GeoJSON bbox value
 *
 * @returns Extent
 */
var bboxToExtent = function (bbox) { return [
    bbox[0],
    bbox[1],
    bbox[2],
    bbox[3],
]; };
exports.bboxToExtent = bboxToExtent;
/**
 * Calculates the 2D extent of a GeometryJSON object
 *
 * @param geo - GeometryJSON or Geometry object
 *
 * @returns Extent
 */
var geoToExtent = function (geo) {
    return bboxToExtent(turf.bbox(geo));
};
exports.geoToExtent = geoToExtent;
var bboxMinX = 0;
var bboxMinY = 1;
var bboxMaxX = 2;
var bboxMaxY = 3;
/**
 * Calculates the combined 2D extent of an array of 2D extents
 *
 * @param extentList - array of extents if this is empty then [0, 0, 0, 0] is returned
 *
 * @returns Extent
 */
var combineExtents = function (extentList) {
    return extentList.length > 0
        ? extentList.reduce(function (total, current) {
            total[bboxMinX] = Math.min(total[bboxMinX], current[bboxMinX]);
            total[bboxMinY] = Math.min(total[bboxMinY], current[bboxMinY]);
            total[bboxMaxX] = Math.max(total[bboxMaxX], current[bboxMaxX]);
            total[bboxMaxY] = Math.max(total[bboxMaxY], current[bboxMaxY]);
            return total;
        }, [
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER,
        ])
        : [0, 0, 0, 0];
};
exports.combineExtents = combineExtents;
//# sourceMappingURL=utilities.js.map