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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var modifiable_drawing_control_1 = __importDefault(require("./modifiable-drawing-control"));
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
        this.startDrawAnimation(e.feature);
    };
    CoordinateListDrawingControl.prototype.onCompleteDrawing = function (e) {
        this.stopDrawAnimation();
        _super.prototype.onCompleteDrawing.call(this, e);
    };
    CoordinateListDrawingControl.prototype.onStartModify = function (e) {
        _super.prototype.onStartModify.call(this, e);
        this.startDrawAnimation(e.features.getArray()[0]);
    };
    CoordinateListDrawingControl.prototype.onCompleteModify = function (e) {
        this.stopDrawAnimation();
        _super.prototype.onCompleteModify.call(this, e);
    };
    CoordinateListDrawingControl.prototype.startDrawAnimation = function (feature) {
        var _this = this;
        var revision = feature.getRevision();
        this.animationFrame = function () {
            var update = feature.getRevision();
            if (update !== revision) {
                _this.updateLabel(feature);
            }
            _this.animationFrameId = requestAnimationFrame(_this.animationFrame);
        };
        this.animationFrame();
    };
    CoordinateListDrawingControl.prototype.stopDrawAnimation = function () {
        cancelAnimationFrame(this.animationFrameId);
    };
    return CoordinateListDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = CoordinateListDrawingControl;
//# sourceMappingURL=coordinate-list-drawing-control.js.map