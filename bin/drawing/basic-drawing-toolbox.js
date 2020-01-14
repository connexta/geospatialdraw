"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicDrawingToolbox = /** @class */ (function () {
    function BasicDrawingToolbox() {
        var _this = this;
        this.listener = null;
        this.toolboxListener = function (geo) {
            if (_this.listener !== null) {
                _this.listener(geo);
            }
        };
        this.toolbox = new Map();
    }
    BasicDrawingToolbox.prototype.getToolForShape = function (shape) {
        if (this.toolbox.has(shape)) {
            // @ts-ignore already calls has() so undefined is not possible here
            return this.toolbox.get(shape);
        }
        else {
            throw new Error("Invalid shape \"" + shape + "\"!");
        }
    };
    BasicDrawingToolbox.prototype.getToolsList = function () {
        return Array.from(this.toolbox.values());
    };
    BasicDrawingToolbox.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    BasicDrawingToolbox.prototype.removeListener = function () {
        this.listener = null;
    };
    return BasicDrawingToolbox;
}());
exports.default = BasicDrawingToolbox;
//# sourceMappingURL=basic-drawing-toolbox.js.map