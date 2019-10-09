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
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var modifiable_drawing_control_1 = require("./modifiable-drawing-control");
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
        return 'Line';
    };
    LineDrawingControl.prototype.getGeoType = function () {
        return 'LineString';
    };
    LineDrawingControl.prototype.makeEmptyFeature = function () {
        return new ol.Feature(new ol.geom.LineString([[0, 0]]));
    };
    return LineDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = LineDrawingControl;
//# sourceMappingURL=line-drawing-control.js.map