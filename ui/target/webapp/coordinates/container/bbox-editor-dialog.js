"use strict";
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
var React = __importStar(require("react"));
var bbox_editor_1 = __importDefault(require("./bbox-editor"));
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var bbox_1 = require("geospatialdraw/bin/coordinates/geometry/bbox");
/**
 * Edits bounding box geo
 */
var BBoxGeoEditor = function (_a) {
    var geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
    var _b = bbox_1.geoToBBoxProps(geo), id = _b.id, properties = _b.properties, bbox = _b.bbox;
    return (React.createElement(bbox_editor_1.default, { bbox: bbox, setBBox: function (value) {
            onUpdateGeo(bbox_1.bboxPropsToGeo({
                id: id,
                properties: properties,
                bbox: value,
            }));
        }, unit: coordinateUnit }));
};
exports.BBoxGeoEditor = BBoxGeoEditor;
/**
 * Edits bounding box in dialog
 */
var BBoxEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(BBoxGeoEditor, shape_1.BOUNDING_BOX);
exports.BBoxEditorDialog = BBoxEditorDialog;
BBoxEditorDialog.displayName = 'BBoxEditorDialog';
//# sourceMappingURL=bbox-editor-dialog.js.map