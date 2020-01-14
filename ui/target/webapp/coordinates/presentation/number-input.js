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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var number_1 = __importDefault(require("geospatialdraw/bin/coordinates/react-hooks/number"));
/**
 * Number input field
 */
var NumberInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, maxValue = _a.maxValue, minValue = _a.minValue, decimalPlaces = _a.decimalPlaces, rest = __rest(_a, ["value", "onChange", "maxValue", "minValue", "decimalPlaces"]);
    var _b = number_1.default(value, {
        maxValue: maxValue,
        minValue: minValue,
        decimalPlaces: decimalPlaces,
    }), number = _b[0], text = _b[1], setText = _b[2], formattedText = _b[3];
    return (React.createElement("input", __assign({ type: "text", value: text, onChange: function (_a) {
            var textValue = _a.currentTarget.value;
            setText(textValue);
        }, onBlur: function () {
            setText(formattedText);
            if (number !== null) {
                onChange(number);
            }
        } }, rest)));
};
exports.default = NumberInput;
//# sourceMappingURL=number-input.js.map