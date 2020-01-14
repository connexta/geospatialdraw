"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dms_value_editor_1 = require("./dms-value-editor");
var Common = __importStar(require("./common-styles"));
var dms_1 = __importDefault(require("geospatialdraw/bin/coordinates/react-hooks/dms"));
var Root = Common.Column;
var TextGroup = Common.SpacedInputLabelRow;
var Label = Common.Label;
var LatLonDMSPointEditor = function (_a) {
    var initLat = _a.lat, initLon = _a.lon, setCoordinate = _a.setCoordinate;
    var _b = dms_1.default({
        lat: initLat,
        lon: initLon,
    }), _c = _b[0], lat = _c.lat, lon = _c.lon, dms = _b[1], setDMS = _b[2];
    React.useEffect(function () {
        setCoordinate(lat, lon);
    }, [lat, lon]);
    return (React.createElement(Root, null,
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "Latitude"),
            React.createElement(dms_value_editor_1.DMSLatitudeEditor, { value: dms.lat, setValue: function (value) {
                    setDMS(__assign({}, dms, { lat: value }));
                } })),
        React.createElement(TextGroup, { style: { marginBottom: 0 } },
            React.createElement(Label, null, "Longitude"),
            React.createElement(dms_value_editor_1.DMSLongitudeEditor, { value: dms.lon, setValue: function (value) {
                    setDMS(__assign({}, dms, { lon: value }));
                } }))));
};
exports.default = LatLonDMSPointEditor;
//# sourceMappingURL=lat-lon-dms-point-editor.js.map