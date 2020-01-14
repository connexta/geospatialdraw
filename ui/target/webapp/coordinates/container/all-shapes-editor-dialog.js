"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var bbox_editor_dialog_1 = require("./bbox-editor-dialog");
var circle_editor_dialog_1 = require("./circle-editor-dialog");
var line_editor_dialog_1 = require("./line-editor-dialog");
var point_editor_dialog_1 = require("./point-editor-dialog");
var polygon_editor_dialog_1 = require("./polygon-editor-dialog");
var AllShapesEditorDialog = function (_a) {
    var shape = _a.shape, geo = _a.geo, onOk = _a.onOk;
    switch (shape) {
        case shape_1.POLYGON:
            return React.createElement(polygon_editor_dialog_1.PolygonEditorDialog, { geo: geo, onOk: onOk });
        case shape_1.LINE:
            return React.createElement(line_editor_dialog_1.LineEditorDialog, { geo: geo, onOk: onOk });
        case shape_1.POINT:
            return React.createElement(point_editor_dialog_1.PointEditorDialog, { geo: geo, onOk: onOk });
        case shape_1.POINT_RADIUS:
            return React.createElement(circle_editor_dialog_1.CircleEditorDialog, { geo: geo, onOk: onOk });
        case shape_1.BOUNDING_BOX:
            return React.createElement(bbox_editor_dialog_1.BBoxEditorDialog, { geo: geo, onOk: onOk });
        default:
            throw new Error("Shape " + shape + " is not supported!");
    }
};
exports.default = AllShapesEditorDialog;
//# sourceMappingURL=all-shapes-editor-dialog.js.map