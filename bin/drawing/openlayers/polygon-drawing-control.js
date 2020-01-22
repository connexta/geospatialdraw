"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Feature_1 = __importDefault(require("ol/Feature"));
var GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
var Polygon_1 = __importDefault(require("ol/geom/Polygon"));
var coordinate_list_drawing_control_1 = __importDefault(require("./coordinate-list-drawing-control"));
var shape_1 = require("../../shapes/shape");
var units_1 = require("../../geometry/units");
var measurements_1 = require("../../geometry/measurements");
var utilities_1 = require("../../geometry/utilities");
var distance_1 = require("../../internal/distance");
/**
 * Drawing Control for drawing a polygon on an Open Layers Map
 */
var PolygonDrawingControl = /** @class */ (function (_super) {
    __extends(PolygonDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function PolygonDrawingControl(context, receiver) {
        return _super.call(this, context, receiver) || this;
    }
    PolygonDrawingControl.prototype.getShape = function () {
        return shape_1.POLYGON;
    };
    PolygonDrawingControl.prototype.getGeoType = function () {
        return GeometryType_1.default.POLYGON;
    };
    PolygonDrawingControl.prototype.makeEmptyFeature = function () {
        return new Feature_1.default(new Polygon_1.default([
            [
                [0, 0],
                [0, 0],
            ],
        ]));
    };
    PolygonDrawingControl.prototype.updateLabelAtPoint = function (feature, pointIndex) {
        if (pointIndex >= 0) {
            var bufferUnit = utilities_1.getBufferPropOrDefault(this.properties).unit;
            var json = this.featureToGeo(feature);
            var lengthInBufferUnit = distance_1.getDistanceFromMeters(turf.length(json), bufferUnit);
            var _a = measurements_1.optimizedUnitForLength({
                unit: bufferUnit,
                length: lengthInBufferUnit,
            }), unit = _a.unit, length_1 = _a.length;
            var area = distance_1.getSquareDistanceFromMeters(turf.area(json), unit);
            var text = this.formatLabelNumber(length_1) + " " + units_1.abbreviateUnit(unit) + "\n " + this.formatLabelNumber(area) + " " + units_1.abbreviateUnit(unit) + "\u00B2";
            this.context.updateLabel(this.getPointAtIndex(feature, pointIndex), text);
        }
    };
    PolygonDrawingControl.prototype.getFeatureCoordinates = function (feature) {
        var coordinates = feature.getGeometry().getCoordinates()[0].slice();
        coordinates.splice(-1);
        return coordinates;
    };
    return PolygonDrawingControl;
}(coordinate_list_drawing_control_1.default));
exports.default = PolygonDrawingControl;
//# sourceMappingURL=polygon-drawing-control.js.map