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
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var coordinate_list_editor_1 = __importDefault(require("./coordinate-list-editor"));
var polygon_line_1 = require("geospatialdraw/bin/coordinates/geometry/polygon-line");
/**
 * Edits line geo
 */
var LineGeoEditor = function (_a) {
    var geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
    var _b = polygon_line_1.geoToLineProps(geo), id = _b.id, properties = _b.properties, coordinates = _b.coordinates, buffer = _b.buffer, bufferUnit = _b.bufferUnit;
    return (React.createElement(coordinate_list_editor_1.default, { coordinateList: coordinates, coordinateUnit: coordinateUnit, buffer: buffer, bufferUnit: bufferUnit, onChange: function (coordinatesValue, bufferValue, bufferUnitValue) {
            onUpdateGeo(polygon_line_1.linePropsToGeo({
                id: id,
                coordinates: coordinatesValue,
                buffer: bufferValue,
                bufferUnit: bufferUnitValue,
                properties: properties,
            }));
        } }));
};
exports.LineGeoEditor = LineGeoEditor;
/**
 * Edits line geo in dialog
 */
var LineEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(LineGeoEditor, shape_1.LINE);
exports.LineEditorDialog = LineEditorDialog;
LineEditorDialog.displayName = 'LineEditorDialog';
//# sourceMappingURL=line-editor-dialog.js.map