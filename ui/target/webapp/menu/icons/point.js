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
        React.createElement("circle", { fill: color, cx: "180", cy: "184", r: "24.7" }),
        React.createElement("path", { fill: color, d: "M180.3,61.7C113.3,61.7,59,116,59,183s54.3,121.3,121.3,121.3S301.7,250,301.7,183S247.3,61.7,180.3,61.7z M180.3,291c-59.6,0-108-48.3-108-108s48.3-108,108-108c59.6,0,108,48.3,108,108S240,291,180.3,291z" }),
        React.createElement("rect", { x: "30.9", y: "180", fill: color, width: "68.5", height: "7.9" }),
        React.createElement("rect", { x: "260.6", y: "180", fill: color, width: "68.5", height: "7.9" }),
        React.createElement("rect", { x: "145.8", y: "290.9", transform: "rotate(-90 180 294.817)", fill: color, width: "68.5", height: "7.9" }),
        React.createElement("rect", { x: "145.8", y: "61.2", transform: "rotate(-90 180 65.183)", fill: color, width: "68.5", height: "7.9" })));
};
exports.default = DrawIcon;
//# sourceMappingURL=point.js.map