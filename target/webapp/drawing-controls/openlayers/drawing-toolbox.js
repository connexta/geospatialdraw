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
var bounding_box_drawing_control_1 = require("./bounding-box-drawing-control");
var line_drawing_control_1 = require("./line-drawing-control");
var point_drawing_control_1 = require("./point-drawing-control");
var point_radius_drawing_control_1 = require("./point-radius-drawing-control");
var polygon_drawing_control_1 = require("./polygon-drawing-control");
var drawing_context_1 = require("./drawing-context");
var basic_drawing_toolbox_1 = require("../basic-drawing-toolbox");
/**
 * Open Layers drawing toolbox
 */
var OpenLayersDrawingToolbox = /** @class */ (function (_super) {
    __extends(OpenLayersDrawingToolbox, _super);
    /**
     * Constructs an instance of Open Layers drawing toolbox
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    function OpenLayersDrawingToolbox(_a) {
        var map = _a.map, drawingStyle = _a.drawingStyle;
        var _this = _super.call(this) || this;
        _this.drawingContext = new drawing_context_1.default({ map: map, drawingStyle: drawingStyle });
        _this.toolbox.set('Polygon', new polygon_drawing_control_1.default(_this.drawingContext, _this.toolboxListener));
        _this.toolbox.set('Line', new line_drawing_control_1.default(_this.drawingContext, _this.toolboxListener));
        _this.toolbox.set('Point Radius', new point_radius_drawing_control_1.default(_this.drawingContext, _this.toolboxListener));
        _this.toolbox.set('Point', new point_drawing_control_1.default(_this.drawingContext, _this.toolboxListener));
        _this.toolbox.set('Bounding Box', new bounding_box_drawing_control_1.default(_this.drawingContext, _this.toolboxListener));
        return _this;
    }
    return OpenLayersDrawingToolbox;
}(basic_drawing_toolbox_1.default));
exports.default = OpenLayersDrawingToolbox;
//# sourceMappingURL=drawing-toolbox.js.map