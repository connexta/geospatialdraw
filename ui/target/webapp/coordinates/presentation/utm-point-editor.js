"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var styled_components_1 = __importDefault(require("styled-components"));
var number_input_1 = __importDefault(require("./number-input"));
var Common = __importStar(require("./common-styles"));
var utm_1 = require("geospatialdraw/bin/coordinates/react-hooks/utm");
var MAX_EASTING = utm_1.UTM_BOUNDS.MAX_EASTING, MIN_EASTING = utm_1.UTM_BOUNDS.MIN_EASTING, MAX_NORTHING = utm_1.UTM_BOUNDS.MAX_NORTHING, MIN_NORTHING = utm_1.UTM_BOUNDS.MIN_NORTHING, MAX_ZONE = utm_1.UTM_BOUNDS.MAX_ZONE;
var Root = Common.Column;
var InputGroup = styled_components_1.default.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  margin-bottom: ", ";\n"], ["\n  margin: 0;\n  padding: 0;\n  display: flex;\n  margin-bottom: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
var SelectGroup = Common.Row;
var Label = Common.Label;
var HemisphereButton = Common.SpacedToggleButton;
var UTMInput = styled_components_1.default(number_input_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 6em;\n"], ["\n  width: 6em;\n"])));
var UTMPointEditor = function (_a) {
    var initLat = _a.lat, initLon = _a.lon, setCoordinate = _a.setCoordinate;
    var _b = utm_1.useUTMCoordinates({
        lat: initLat,
        lon: initLon,
    }), _c = _b[0], lat = _c.lat, lon = _c.lon, utm = _b[1], setUTM = _b[2];
    var northing = utm.northing, easting = utm.easting, zone = utm.zone, hemisphere = utm.hemisphere;
    React.useEffect(function () {
        setCoordinate(lat, lon);
    }, [lat, lon]);
    return (React.createElement(Root, null,
        React.createElement(InputGroup, null,
            React.createElement(Label, null, "Easting"),
            React.createElement(UTMInput, { value: easting, maxValue: MAX_EASTING, minValue: MIN_EASTING, decimalPlaces: 0, onChange: function (value) {
                    setUTM(__assign({}, utm, { easting: value }));
                } })),
        React.createElement(InputGroup, null,
            React.createElement(Label, null, "Northing"),
            React.createElement(UTMInput, { value: northing, maxValue: MAX_NORTHING, minValue: MIN_NORTHING, decimalPlaces: 0, onChange: function (value) {
                    setUTM(__assign({}, utm, { northing: value }));
                } })),
        React.createElement(InputGroup, null,
            React.createElement(Label, null, "Zone"),
            React.createElement("select", { value: zone, onChange: function (_a) {
                    var value = _a.currentTarget.value;
                    setUTM(__assign({}, utm, { zone: parseInt(value) }));
                } }, Array(MAX_ZONE + 1)
                .fill(0)
                .map(function (_, zone) { return (React.createElement("option", { key: zone, value: zone }, zone)); }))),
        React.createElement(SelectGroup, null,
            React.createElement(Label, null, "Hemisphere"),
            React.createElement(HemisphereButton, { title: "Northern Hemisphere", isSelected: hemisphere === 'N', onClick: function () {
                    setUTM(__assign({}, utm, { hemisphere: 'N' }));
                } }, "N"),
            React.createElement(HemisphereButton, { title: "Southern Hemisphere", isSelected: hemisphere === 'S', onClick: function () {
                    setUTM(__assign({}, utm, { hemisphere: 'S' }));
                } }, "S"))));
};
exports.default = UTMPointEditor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=utm-point-editor.js.map