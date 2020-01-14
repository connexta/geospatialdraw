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
var Feature_1 = __importDefault(require("ol/Feature"));
var GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
var Point_1 = __importDefault(require("ol/geom/Point"));
var modifiable_drawing_control_1 = __importDefault(require("./modifiable-drawing-control"));
var shape_1 = require("../../shapes/shape");
/**
 * Drawing Control for drawing a point on an Open Layers Map
 */
var PointDrawingControl = /** @class */ (function (_super) {
    __extends(PointDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function PointDrawingControl(context, receiver) {
        return _super.call(this, context, receiver) || this;
    }
    PointDrawingControl.prototype.getShape = function () {
        return shape_1.POINT;
    };
    PointDrawingControl.prototype.getGeoType = function () {
        return GeometryType_1.default.POINT;
    };
    PointDrawingControl.prototype.cancelDrawing = function () {
        // the snap interaction breaks after using point drawing
        this.context.remakeInteractions();
        _super.prototype.cancelDrawing.call(this);
    };
    PointDrawingControl.prototype.makeEmptyFeature = function () {
        return new Feature_1.default(new Point_1.default([0, 0]));
    };
    return PointDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = PointDrawingControl;
//# sourceMappingURL=point-drawing-control.js.map