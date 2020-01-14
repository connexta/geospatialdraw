"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
var GeoJSON_1 = __importDefault(require("ol/format/GeoJSON"));
var turf = __importStar(require("@turf/turf"));
var shape_1 = require("./shape");
/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
var ShapeDetector = /** @class */ (function () {
    /**
     * Constructs an instance of the ShapeDetector
     */
    function ShapeDetector() {
        this.geoFormat = new GeoJSON_1.default();
    }
    /**
     * Gets the shape of GeometryJSON object
     * @param geoJSON - GeometryJSON object
     * @returns Shape of geometry
     */
    ShapeDetector.prototype.shapeFromGeoJSON = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        return this.shapeFromFeature(feature);
    };
    /**
     * Gets the shape of an Open Layers feature
     * @param feature - Open Layers feature
     * @returns Shape of geometry
     */
    ShapeDetector.prototype.shapeFromFeature = function (feature) {
        if (this.isLineFeature(feature)) {
            return shape_1.LINE;
        }
        else if (this.isBoundingBoxFeature(feature)) {
            return shape_1.BOUNDING_BOX;
        }
        else if (this.isPointFeature(feature)) {
            return shape_1.POINT;
        }
        else if (this.isPointRadiusFeature(feature)) {
            return shape_1.POINT_RADIUS;
        }
        else {
            return shape_1.POLYGON;
        }
    };
    ShapeDetector.prototype.getGeometryType = function (feature) {
        var geometry = feature.getGeometry();
        return geometry ? geometry.getType() : GeometryType_1.default.POLYGON;
    };
    ShapeDetector.prototype.getFeatureBufferWidth = function (feature) {
        return (feature.get('buffer') || { width: 0 }).width;
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a line
     */
    ShapeDetector.prototype.isLineFeature = function (feature) {
        return this.getGeometryType(feature) === GeometryType_1.default.LINE_STRING;
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point
     */
    ShapeDetector.prototype.isPointFeature = function (feature) {
        return (this.getGeometryType(feature) === GeometryType_1.default.POINT &&
            this.getFeatureBufferWidth(feature) <= 0);
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a bounding box
     */
    ShapeDetector.prototype.isBoundingBoxFeature = function (feature) {
        if (!this.isPolygonFeature(feature)) {
            return false;
        }
        else {
            var coordinates_1 = feature.getGeometry().getCoordinates()[0];
            var geometry = feature.getGeometry();
            var extent = geometry
                ? geometry.getExtent()
                : [0, 0, 0, 0];
            var expectedCoordinates = turf.bboxPolygon(extent)
                .geometry.coordinates[0];
            return (coordinates_1.length === 5 &&
                expectedCoordinates.every(function (expectedPoint) {
                    return coordinates_1.some(function (point) {
                        return point[0] === expectedPoint[0] && point[1] === expectedPoint[1];
                    });
                }));
        }
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point radius
     */
    ShapeDetector.prototype.isPointRadiusFeature = function (feature) {
        return (this.getGeometryType(feature) === GeometryType_1.default.POINT &&
            this.getFeatureBufferWidth(feature) > 0);
    };
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a polygon
     */
    ShapeDetector.prototype.isPolygonFeature = function (feature) {
        return this.getGeometryType(feature) === GeometryType_1.default.POLYGON;
    };
    return ShapeDetector;
}());
exports.default = ShapeDetector;
//# sourceMappingURL=shape-detector.js.map