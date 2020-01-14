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
var lat_lon_dms_bbox_editor_1 = __importDefault(require("../presentation/lat-lon-dms-bbox-editor"));
var lat_lon_bbox_editor_1 = __importDefault(require("../presentation/lat-lon-bbox-editor"));
var usng_bbox_editor_1 = __importDefault(require("../presentation/usng-bbox-editor"));
var utm_bbox_editor_1 = __importDefault(require("../presentation/utm-bbox-editor"));
var editorMap = function (unit) {
    switch (unit) {
        case Units.LAT_LON:
            return lat_lon_bbox_editor_1.default;
        case Units.LAT_LON_DMS:
            return lat_lon_dms_bbox_editor_1.default;
        case Units.USNG:
            return usng_bbox_editor_1.default;
        case Units.UTM:
            return utm_bbox_editor_1.default;
        default:
            throw new Error("Unit \"" + unit + "\" not supported!");
    }
};
/**
 * Edits bounding box for all coordinate units
 */
var BBoxEditor = function (_a) {
    var bbox = _a.bbox, setBBox = _a.setBBox, unit = _a.unit;
    var EditorTag = editorMap(unit);
    return React.createElement(EditorTag, { bbox: bbox, setBBox: setBBox });
};
exports.default = BBoxEditor;
//# sourceMappingURL=bbox-editor.js.map