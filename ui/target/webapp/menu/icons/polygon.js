"use strict";
/** @internal */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var DrawIcon = function (_a) {
    var color = _a.color;
    return (React.createElement("svg", { width: "30px", height: "30px", x: "0px", y: "0px", viewBox: "0 0 360 360" },
        React.createElement("polygon", { fill: "none", stroke: color, strokeWidth: "15", strokeMiterlimit: "10", points: "100.5,279.1 54.7,103.9 168.3,167 291.7,49.5 274.5,270.2" })));
};
exports.default = DrawIcon;
//# sourceMappingURL=polygon.js.map