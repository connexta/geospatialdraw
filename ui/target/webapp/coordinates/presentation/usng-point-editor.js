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
var Common = __importStar(require("./common-styles"));
var usng_input_1 = __importDefault(require("./usng-input"));
var usng_1 = __importDefault(require("geospatialdraw/bin/coordinates/react-hooks/usng"));
var Root = Common.Column;
var TextGroup = Common.Row;
var Label = Common.Label;
var USNGPointEditor = function (_a) {
    var initLat = _a.lat, initLon = _a.lon, setCoordinate = _a.setCoordinate;
    var _b = usng_1.default({
        lat: initLat,
        lon: initLon,
    }), _c = _b[0], lat = _c.lat, lon = _c.lon, usng = _b[1], setUSNG = _b[2];
    React.useEffect(function () {
        setCoordinate(lat, lon);
    }, [lat, lon]);
    return (React.createElement(Root, null,
        React.createElement(TextGroup, null,
            React.createElement(Label, null, "USNG/MGRS"),
            React.createElement(usng_input_1.default, { value: usng, onChange: setUSNG }))));
};
exports.default = USNGPointEditor;
//# sourceMappingURL=usng-point-editor.js.map