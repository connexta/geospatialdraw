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
var geo_editor_to_dialog_1 = require("./geo-editor-to-dialog");
var point_circle_editor_1 = require("../presentation/point-circle-editor");
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var point_circle_1 = require("geospatialdraw/bin/coordinates/geometry/point-circle");
/**
 * Edits point geo
 */
var PointGeoEditor = function (_a) {
    var geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
    var _b = point_circle_1.geoToPointProps(geo), id = _b.id, properties = _b.properties, lat = _b.lat, lon = _b.lon;
    return (React.createElement(point_circle_editor_1.FixedHeightPointEditor, { coordinateUnit: coordinateUnit, lat: lat, lon: lon, setCoordinate: function (latValue, lonValue) {
            onUpdateGeo(point_circle_1.pointPropsToGeo({
                id: id,
                properties: properties,
                lat: latValue,
                lon: lonValue,
            }));
        } }));
};
exports.PointGeoEditor = PointGeoEditor;
/**
 * Edits point geo in dialog
 */
var PointEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(PointGeoEditor, shape_1.POINT);
exports.PointEditorDialog = PointEditorDialog;
PointEditorDialog.displayName = 'PointEditorDialog';
//# sourceMappingURL=point-editor-dialog.js.map