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
    return (React.createElement("svg", { width: "30px", height: "30px", x: "0px", y: "0px", viewBox: "0 0 20 20" },
        React.createElement("path", { fill: color, d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" })));
};
exports.default = DrawIcon;
//# sourceMappingURL=edit-coordinates.js.map