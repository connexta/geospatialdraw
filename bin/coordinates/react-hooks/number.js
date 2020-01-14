"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/** @internal */
var constrainNumber = function (value, _a) {
    var _b = _a.maxValue, maxValue = _b === void 0 ? Number.POSITIVE_INFINITY : _b, _c = _a.minValue, minValue = _c === void 0 ? Number.NEGATIVE_INFINITY : _c;
    if (value === undefined || value === null || isNaN(value)) {
        return null;
    }
    else {
        var constrained = value;
        if (maxValue !== undefined && !isNaN(maxValue)) {
            constrained = Math.min(constrained, maxValue);
        }
        if (minValue !== undefined && !isNaN(minValue)) {
            constrained = Math.max(constrained, minValue);
        }
        return constrained;
    }
};
/** @internal */
var constrainString = function (value, constraints) {
    var decimalPlaces = constraints.decimalPlaces || 0;
    var n = constrainNumber(value, constraints);
    if (n === null) {
        return '';
    }
    else {
        if (decimalPlaces === undefined || isNaN(decimalPlaces)) {
            return n.toString();
        }
        else {
            return n.toFixed(decimalPlaces);
        }
    }
};
/**
 * Use numeric input state for a numeric input field
 * where the users text value is unconstrained allowing users to type freely
 * as they actively edit the value only applying numeric constraints when the
 * user is finished typing.
 * Example usage:
 * ```
 * const [number, text, setText, formattedText] = useNumberInput(value, {
 *   maxValue,
 *   minValue,
 *   decimalPlaces,
 * })
 * return (
 *   <input
 *     type="text"
 *     value={text}
 *     onChange={({ currentTarget: { value: textValue } }: FormEvent) => {
 *       setText(textValue)
 *     }}
 *     onBlur={() => {
 *       setText(formattedText)
 *       if (number !== null) {
 *         onChange(number)
 *       }
 *     }}
 *     {...rest}
 *   />
 * )
 * ```
 * @param initValue - initial numeric value
 * @param constraints - numeric constraints
 * @returns [value, text, setText, formattedText]
 *
 */
var useNumberInput = function (initValue, constraints) {
    if (constraints === void 0) { constraints = {}; }
    var _a = react_1.useState(constrainString(initValue, constraints)), text = _a[0], setText = _a[1];
    var value = constrainNumber(parseFloat(text), constraints);
    var formattedText = constrainString(value, constraints);
    react_1.useEffect(function () {
        setText(formattedText);
    }, [constraints.decimalPlaces, constraints.maxValue, constraints.minValue]);
    react_1.useEffect(function () {
        if (initValue !== value) {
            setText(constrainString(initValue, constraints));
        }
    }, [initValue]);
    return [value, text, setText, formattedText];
};
exports.default = useNumberInput;
//# sourceMappingURL=number.js.map