"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var utm_point_editor_1 = __importDefault(require("./utm-point-editor"));
var Common = __importStar(require("./common-styles"));
var bbox_1 = require("geospatialdraw/bin/coordinates/geometry/bbox");
var Root = Common.BBoxRoot;
var PointGroup = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  margin-right: ", ";\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 1;\n"], ["\n  margin: 0;\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  margin-right: ", ";\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 1;\n"])), function (props) { return props.theme.minimumFontSize; }, function (props) { return props.theme.minimumSpacing; });
var Label = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  margin-bottom: ", ";\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  font-weight: bold;\n"], ["\n  margin: 0;\n  margin-bottom: ", ";\n  padding: 0;\n  font-size: ", ";\n  display: flex;\n  font-weight: bold;\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) { return props.theme.minimumFontSize; });
var UTMBBoxEditor = function (_a) {
    var bbox = _a.bbox, setBBox = _a.setBBox;
    var _b = bbox_1.bboxToCoordinatePair(bbox), upperLeft = _b[0], lowerRight = _b[1];
    return (React.createElement(Root, { flexDirection: "row" },
        React.createElement(PointGroup, null,
            React.createElement(Label, null, "Upper Left"),
            React.createElement(utm_point_editor_1.default, { lat: upperLeft.lat, lon: upperLeft.lon, setCoordinate: function (lat, lon) {
                    setBBox(bbox_1.coordinatePairToBBox([{ lat: lat, lon: lon }, lowerRight]));
                } })),
        React.createElement(PointGroup, null,
            React.createElement(Label, null, "Lower Right"),
            React.createElement(utm_point_editor_1.default, { lat: lowerRight.lat, lon: lowerRight.lon, setCoordinate: function (lat, lon) {
                    setBBox(bbox_1.coordinatePairToBBox([{ lat: lat, lon: lon }, upperLeft]));
                } }))));
};
exports.default = UTMBBoxEditor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=utm-bbox-editor.js.map