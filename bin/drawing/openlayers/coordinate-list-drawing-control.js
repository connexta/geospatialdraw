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
var modifiable_drawing_control_1 = __importDefault(require("./modifiable-drawing-control"));
exports.LAST_INDEX = Number.MAX_SAFE_INTEGER;
/**
 * Drawing Control for shapes that contain a list of coordinates on an Open Layers Map
 */
var CoordinateListDrawingControl = /** @class */ (function (_super) {
    __extends(CoordinateListDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function CoordinateListDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.animationFrameId = 0;
        _this.animationFrame = function () { };
        return _this;
    }
    CoordinateListDrawingControl.prototype.onStartDrawing = function (e) {
        _super.prototype.onStartDrawing.call(this, e);
        this.startDrawAnimation(e.feature, exports.LAST_INDEX);
    };
    CoordinateListDrawingControl.prototype.onCompleteDrawing = function (e) {
        this.stopDrawAnimation();
        _super.prototype.onCompleteDrawing.call(this, e);
    };
    CoordinateListDrawingControl.prototype.onStartModify = function (e) {
        var feature = e.features.getArray()[0];
        var pointIndex = this.getClosestPointIndex(feature, e.mapBrowserEvent.coordinate);
        _super.prototype.onStartModify.call(this, e);
        this.startDrawAnimation(feature, pointIndex);
    };
    CoordinateListDrawingControl.prototype.onCompleteModify = function (e) {
        this.stopDrawAnimation();
        _super.prototype.onCompleteModify.call(this, e);
    };
    CoordinateListDrawingControl.prototype.startDrawAnimation = function (feature, pointIndex) {
        var _this = this;
        var revision = feature.getRevision();
        var coordinatesLength = this.getFeatureCoordinates(feature).length;
        this.animationFrame = function () {
            var update = feature.getRevision();
            if (update !== revision) {
                var updatedLength = _this.getFeatureCoordinates(feature).length;
                if (coordinatesLength !== updatedLength) {
                    pointIndex;
                }
                _this.updateLabelAtPoint(feature, pointIndex);
            }
            _this.animationFrameId = requestAnimationFrame(_this.animationFrame);
        };
        this.animationFrame();
    };
    CoordinateListDrawingControl.prototype.stopDrawAnimation = function () {
        cancelAnimationFrame(this.animationFrameId);
    };
    CoordinateListDrawingControl.prototype.updateLabel = function (feature) {
        this.updateLabelAtPoint(feature, exports.LAST_INDEX);
    };
    CoordinateListDrawingControl.prototype.getClosestPointIndex = function (feature, point) {
        var coordinates = this.getFeatureCoordinates(feature);
        if (coordinates.length > 0) {
            var distanceMap = coordinates
                .map(function (c, index) { return ({ distance: turf.distance(point, c), index: index }); })
                .sort(function (a, b) { return a.distance - b.distance; });
            return distanceMap[0].index;
        }
        else {
            return -1;
        }
    };
    CoordinateListDrawingControl.prototype.getPointAtIndex = function (feature, index) {
        var coordinates = this.getFeatureCoordinates(feature);
        if (index === exports.LAST_INDEX) {
            index = coordinates.length - 1;
        }
        else if (index < 0 || index >= coordinates.length) {
            throw new Error("Invalid index " + index + " into coordinates for feature " + feature);
        }
        return coordinates[index];
    };
    return CoordinateListDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = CoordinateListDrawingControl;
//# sourceMappingURL=coordinate-list-drawing-control.js.map