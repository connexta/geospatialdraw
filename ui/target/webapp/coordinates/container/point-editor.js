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
var Units = __importStar(require("geospatialdraw/bin/coordinates/units"));
var lat_lon_dms_point_editor_1 = __importDefault(require("../presentation/lat-lon-dms-point-editor"));
var lat_lon_point_editor_1 = __importDefault(require("../presentation/lat-lon-point-editor"));
var usng_point_editor_1 = __importDefault(require("../presentation/usng-point-editor"));
var utm_point_editor_1 = __importDefault(require("../presentation/utm-point-editor"));
var editorMap = function (unit) {
    switch (unit) {
        case Units.LAT_LON:
            return lat_lon_point_editor_1.default;
        case Units.LAT_LON_DMS:
            return lat_lon_dms_point_editor_1.default;
        case Units.USNG:
            return usng_point_editor_1.default;
        case Units.UTM:
            return utm_point_editor_1.default;
        default:
            throw new Error("Unit \"" + unit + "\" not supported!");
    }
};
/**
 * Edits point in all coordinate units
 */
var PointEditor = function (_a) {
    var lat = _a.lat, lon = _a.lon, setCoordinate = _a.setCoordinate, unit = _a.unit;
    var EditorTag = editorMap(unit);
    return React.createElement(EditorTag, { lat: lat, lon: lon, setCoordinate: setCoordinate });
};
PointEditor.displayName = 'PointEditor';
exports.default = PointEditor;
//# sourceMappingURL=point-editor.js.map