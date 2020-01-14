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
var geometry_1 = require("geospatialdraw/bin/coordinates/geometry");
/**
 * Edits point radius/circle geo
 */
var CircleGeoEditor = function (_a) {
    var geo = _a.geo, coordinateUnit = _a.coordinateUnit, onUpdateGeo = _a.onUpdateGeo;
    var _b = geometry_1.geoToPointRadiusProps(geo), id = _b.id, properties = _b.properties, lat = _b.lat, lon = _b.lon, radius = _b.radius, radiusUnit = _b.radiusUnit;
    return (React.createElement(point_circle_editor_1.CircleEditor, { coordinateUnit: coordinateUnit, lat: lat, lon: lon, radius: radius, radiusUnit: radiusUnit, setCoordinate: function (latValue, lonValue) {
            onUpdateGeo(geometry_1.pointRadiusPropsToGeo({
                id: id,
                properties: properties,
                lat: latValue,
                lon: lonValue,
                radius: radius,
                radiusUnit: radiusUnit,
            }));
        }, setRadius: function (value) {
            onUpdateGeo(geometry_1.pointRadiusPropsToGeo({
                id: id,
                properties: properties,
                lat: lat,
                lon: lon,
                radius: value,
                radiusUnit: radiusUnit,
            }));
        }, setRadiusUnit: function (value) {
            onUpdateGeo(geometry_1.pointRadiusPropsToGeo({
                id: id,
                properties: properties,
                lat: lat,
                lon: lon,
                radius: radius,
                radiusUnit: value,
            }));
        } }));
};
exports.CircleGeoEditor = CircleGeoEditor;
/**
 * Edits point radius/circle geo in dialog
 */
var CircleEditorDialog = geo_editor_to_dialog_1.geoEditorToDialog(CircleGeoEditor, shape_1.POINT_RADIUS);
exports.CircleEditorDialog = CircleEditorDialog;
CircleEditorDialog.displayName = 'CircleEditorDialog';
//# sourceMappingURL=circle-editor-dialog.js.map