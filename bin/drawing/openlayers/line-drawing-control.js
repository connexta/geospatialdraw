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
var LineString_1 = __importDefault(require("ol/geom/LineString"));
var coordinate_list_drawing_control_1 = __importDefault(require("./coordinate-list-drawing-control"));
var shape_1 = require("../../shapes/shape");
var units_1 = require("../../geometry/units");
var measurements_1 = require("../../geometry/measurements");
var utilities_1 = require("../../geometry/utilities");
var distance_1 = require("../../internal/distance");
/**
 * Drawing Control for drawing a line on an Open Layers Map
 */
var LineDrawingControl = /** @class */ (function (_super) {
    __extends(LineDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function LineDrawingControl(context, receiver) {
        return _super.call(this, context, receiver) || this;
    }
    LineDrawingControl.prototype.getShape = function () {
        return shape_1.LINE;
    };
    LineDrawingControl.prototype.getGeoType = function () {
        return GeometryType_1.default.LINE_STRING;
    };
    LineDrawingControl.prototype.makeEmptyFeature = function () {
        return new Feature_1.default(new LineString_1.default([[0, 0]]));
    };
    LineDrawingControl.prototype.updateLabel = function (feature) {
        var geometry = feature.getGeometry();
        var coordinates = geometry
            ? geometry.getCoordinates()
            : [];
        if (coordinates.length > 0) {
            var bufferUnit = utilities_1.getBufferPropOrDefault(this.properties).unit;
            var point = coordinates[coordinates.length - 1];
            var json = this.featureToGeo(feature);
            var lengthInBufferUnit = distance_1.getDistanceFromMeters(turf.length(json), bufferUnit);
            var _a = measurements_1.optimizedUnitForLength({
                unit: bufferUnit,
                length: lengthInBufferUnit,
            }), unit = _a.unit, length_1 = _a.length;
            var text = this.formatLabelNumber(length_1) + " " + units_1.abbreviateUnit(unit);
            this.context.updateLabel(point, text);
        }
    };
    return LineDrawingControl;
}(coordinate_list_drawing_control_1.default));
exports.default = LineDrawingControl;
//# sourceMappingURL=line-drawing-control.js.map