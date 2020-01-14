"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var memo_1 = __importDefault(require("../geometry/memo"));
/**
 * React hook for drawing menu functionality.
 * Updates toolbox control with input from react component.
 * @params object - drawing menu props
 */
var useDrawingMenu = function (_a) {
    var isActive = _a.isActive, showCoordinateEditor = _a.showCoordinateEditor, onUpdate = _a.onUpdate, shape = _a.shape, toolbox = _a.toolbox, geometry = _a.geometry, defaultGeoProperties = _a.defaultGeoProperties;
    var geometryMemo = memo_1.default(geometry);
    react_1.useEffect(function () {
        var cancelShapeDrawing = function () {
            toolbox.getToolsList().forEach(function (control) {
                control.cancelDrawing();
            });
        };
        if (shape === null || !toolbox.getToolForShape(shape).isInputBlocked()) {
            cancelShapeDrawing();
            if (isActive && !showCoordinateEditor && shape !== null) {
                var control = toolbox.getToolForShape(shape);
                if (defaultGeoProperties) {
                    control.setProperties(defaultGeoProperties);
                }
                control.startDrawing();
                if (geometry !== null) {
                    control.setGeo(geometry);
                }
            }
        }
        return cancelShapeDrawing;
    }, [geometryMemo, shape, isActive, showCoordinateEditor]);
    react_1.useEffect(function () {
        toolbox.setListener(onUpdate);
        return function () {
            toolbox.removeListener();
        };
    }, [toolbox]);
};
exports.default = useDrawingMenu;
//# sourceMappingURL=react-hooks.js.map