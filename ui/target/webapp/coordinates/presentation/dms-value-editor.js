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
var dms_formatting_1 = require("geospatialdraw/bin/coordinates/dms-formatting");
var number_input_1 = __importDefault(require("./number-input"));
var Common = __importStar(require("./common-styles"));
var SmallInput = styled_components_1.default(number_input_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 3em;\n  margin-right: ", ";\n"], ["\n  width: 3em;\n  margin-right: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
SmallInput.displayName = 'SmallInput';
var WideInput = styled_components_1.default(number_input_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 5em;\n  margin-right: ", ";\n"], ["\n  width: 5em;\n  margin-right: ", ";\n"])), function (props) { return props.theme.minimumSpacing; });
WideInput.displayName = 'WideInput';
var HeadingButton = Common.SpacedToggleButton;
HeadingButton.displayName = 'HeadingButton';
var DMSValueEditor = function (_a) {
    var setValue = _a.setValue, maxDegrees = _a.maxDegrees, negativeHeadingTooltip = _a.negativeHeadingTooltip, positiveHeadingTooltip = _a.positiveHeadingTooltip, negativeHeadingName = _a.negativeHeadingName, positiveHeadingName = _a.positiveHeadingName, value = _a.value;
    var display = dms_formatting_1.dmsSetSign(value, 1);
    var sign = dms_formatting_1.dmsSign(value);
    return (React.createElement(React.Fragment, null,
        React.createElement(SmallInput, { maxValue: maxDegrees, minValue: 0, value: display.degree, decimalPlaces: 0, placeholder: "DD", onChange: function (n) {
                var degree = n * sign;
                var minute = n < maxDegrees ? value.minute : 0;
                var second = n < maxDegrees ? value.second : 0;
                setValue({
                    degree: degree,
                    minute: minute,
                    second: second,
                });
            } }),
        React.createElement(SmallInput, { type: "text", maxValue: display.degree >= maxDegrees ? 0 : 59, minValue: 0, decimalPlaces: 0, value: display.minute, placeholder: "MM", onChange: function (n) {
                return setValue(__assign({}, value, { minute: n }));
            } }),
        React.createElement(WideInput, { type: "text", maxValue: display.degree >= maxDegrees ? 0 : 59, minValue: 0, decimalPlaces: dms_formatting_1.SECONDS_PRECISION, value: display.second, placeholder: "SS", onChange: function (n) {
                return setValue(__assign({}, value, { second: n }));
            } }),
        React.createElement(HeadingButton, { title: positiveHeadingTooltip, isSelected: sign === 1, onClick: function () { return setValue(dms_formatting_1.dmsSetSign(value, 1)); } }, positiveHeadingName),
        React.createElement(HeadingButton, { title: negativeHeadingTooltip, isSelected: sign === -1, onClick: function () { return setValue(dms_formatting_1.dmsSetSign(value, -1)); } }, negativeHeadingName)));
};
exports.DMSValueEditor = DMSValueEditor;
var DMSLatitudeEditor = function (props) { return (React.createElement(DMSValueEditor, __assign({ maxDegrees: 90, negativeHeadingName: "S", negativeHeadingTooltip: "Southern Hemisphere", positiveHeadingName: "N", positiveHeadingTooltip: "Northern Hemisphere" }, props))); };
exports.DMSLatitudeEditor = DMSLatitudeEditor;
var DMSLongitudeEditor = function (props) { return (React.createElement(DMSValueEditor, __assign({ maxDegrees: 180, negativeHeadingName: "W", negativeHeadingTooltip: "Western Hemisphere", positiveHeadingName: "E", positiveHeadingTooltip: "Eastern Hemisphere" }, props))); };
exports.DMSLongitudeEditor = DMSLongitudeEditor;
var templateObject_1, templateObject_2;
//# sourceMappingURL=dms-value-editor.js.map