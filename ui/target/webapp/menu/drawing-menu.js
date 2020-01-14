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
var styled_components_1 = __importDefault(require("styled-components"));
var shape_1 = require("geospatialdraw/bin/shapes/shape");
var polished_1 = require("polished");
var icons_1 = require("./icons");
var react_hooks_1 = __importDefault(require("geospatialdraw/bin/menu/react-hooks"));
var InvisibleBackground = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
var TitleContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  flex-shrink: 1;\n  height: 100%;\n  font-size: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  flex-grow: 1;\n  flex-shrink: 1;\n  height: 100%;\n  font-size: ", ";\n"])), function (props) { return props.theme.largeFontSize; });
var TitleLabel = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  align-self: center;\n  padding-left: ", ";\n  padding-right: ", ";\n  flex: 0 0 auto;\n"], ["\n  color: ", ";\n  align-self: center;\n  padding-left: ", ";\n  padding-right: ", ";\n  flex: 0 0 auto;\n"])), function (props) { return polished_1.readableColor(props.theme.positiveColor); }, function (props) { return props.theme.largeSpacing; }, function (props) { return props.theme.minimumSpacing; });
var Title = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: ", ";\n  font-weight: bold;\n  align-self: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 0 1 auto;\n"], ["\n  color: ", ";\n  font-weight: bold;\n  align-self: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 0 1 auto;\n"])), function (props) { return polished_1.readableColor(props.theme.positiveColor); });
var ShapeMenu = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  border-right: 1px solid ", ";\n  border-left: 1px solid ", ";\n  font-size: ", ";\n"], ["\n  height: 100%;\n  display: flex;\n  border-right: 1px solid ", ";\n  border-left: 1px solid ", ";\n  font-size: ", ";\n"])), function (props) { return props.theme.backgroundSlideout; }, function (props) { return props.theme.backgroundSlideout; }, function (props) { return props.theme.minimumFontSize; });
var ToolMenu = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  height: 100%;\n  display: flex;\n  font-size: ", ";\n"], ["\n  height: 100%;\n  display: flex;\n  font-size: ", ";\n"])), function (props) { return props.theme.minimumFontSize; });
var ControlsGroup = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: right;\n  flex: 0 0 auto;\n"], ["\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: row;\n  align-items: right;\n  flex: 0 0 auto;\n"])));
var Button = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  height: 100%;\n  font-size: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 5em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"], ["\n  height: 100%;\n  font-size: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: ", ";\n  padding: 0;\n  margin: 0;\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  width: 5em;\n  background-color: ", ";\n  :hover {\n    opacity: 1;\n  }\n"])), function (props) { return props.theme.largeFontSize; }, function (props) { return props.theme.minimumButtonSize; }, function (props) { return props.theme.minimumOpacity; }, function (props) { return polished_1.readableColor(props.theme[props.buttonType]); }, function (props) { return props.theme[props.buttonType]; });
var SelectableButton = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: calc(", " * 1.5);\n  padding: ", ";\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  border: 1px solid\n    ", ";\n  :hover {\n    opacity: 1;\n    border: 1px solid ", ";\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: calc(", " * 1.5);\n  padding: ", ";\n  opacity: ", ";\n  cursor: pointer;\n  color: ", ";\n  border: 1px solid\n    ",
    ";\n  :hover {\n    opacity: 1;\n    border: 1px solid ", ";\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.largeFontSize;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediumSpacing;
}, function (props) { return (props.isSelected ? 1 : props.theme.minimumOpacity); }, function (props) { return polished_1.readableColor(props.theme.positiveColor); }, function (props) {
    return props.isSelected
        ? polished_1.readableColor(props.theme.positiveColor)
        : 'transparent';
}, function (props) { return polished_1.readableColor(props.theme.positiveColor); });
var DrawingBackground = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  background-color: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  background-color: ", ";\n"])), function (props) { return polished_1.transparentize(0.2, props.theme.positiveColor); });
var DrawingMenu = function (_a) {
    var toolbox = _a.toolbox, shape = _a.shape, isActive = _a.isActive, geometry = _a.geometry, onCancel = _a.onCancel, onOk = _a.onOk, onSetShape = _a.onSetShape, onUpdate = _a.onUpdate, title = _a.title, saveAndContinue = _a.saveAndContinue, showCoordinateEditor = _a.showCoordinateEditor, toggleCoordinateEditor = _a.toggleCoordinateEditor, disabledShapes = _a.disabledShapes, defaultGeoProperties = _a.defaultGeoProperties, _b = _a.iconColor, iconColor = _b === void 0 ? '#FFFFFF' : _b, rest = __rest(_a, ["toolbox", "shape", "isActive", "geometry", "onCancel", "onOk", "onSetShape", "onUpdate", "title", "saveAndContinue", "showCoordinateEditor", "toggleCoordinateEditor", "disabledShapes", "defaultGeoProperties", "iconColor"]);
    react_hooks_1.default({
        toolbox: toolbox,
        shape: shape,
        isActive: isActive,
        geometry: geometry,
        onUpdate: onUpdate,
        showCoordinateEditor: showCoordinateEditor,
        defaultGeoProperties: defaultGeoProperties,
    });
    var renderShapeButton = function (renderedShape, icon) {
        return disabledShapes && disabledShapes.includes(renderedShape) ? null : (React.createElement(SelectableButton, { isSelected: shape === renderedShape, onClick: function () { return onSetShape(renderedShape); }, title: "Draw " + renderedShape }, icon));
    };
    var Background = isActive ? DrawingBackground : InvisibleBackground;
    var acceptEditButton = saveAndContinue ? 'Next' : 'Apply';
    var acceptEditAlt = saveAndContinue
        ? 'Save And Continue Drawing'
        : 'Accept Edit';
    return (React.createElement(Background, __assign({}, rest),
        React.createElement(TitleContainer, null, title === undefined ? null : (React.createElement(React.Fragment, null,
            React.createElement(TitleLabel, null, "Editing Shape:"),
            React.createElement(Title, null, title)))),
        React.createElement(ControlsGroup, null,
            React.createElement(ShapeMenu, null,
                renderShapeButton(shape_1.LINE, React.createElement(icons_1.LineIcon, { color: iconColor })),
                renderShapeButton(shape_1.POLYGON, React.createElement(icons_1.PolygonIcon, { color: iconColor })),
                renderShapeButton(shape_1.BOUNDING_BOX, React.createElement(icons_1.BboxIcon, { color: iconColor })),
                renderShapeButton(shape_1.POINT_RADIUS, React.createElement(icons_1.CircleIcon, { color: iconColor })),
                renderShapeButton(shape_1.POINT, React.createElement(icons_1.PointIcon, { color: iconColor }))),
            showCoordinateEditor === undefined ||
                toggleCoordinateEditor === undefined ? null : (React.createElement(ToolMenu, null,
                React.createElement(SelectableButton, { isSelected: showCoordinateEditor, onClick: toggleCoordinateEditor, title: "Edit Coordinates" },
                    React.createElement(icons_1.EditCoordinatesIcon, { color: iconColor })))),
            React.createElement(Button, { isSubmit: false, buttonType: "positiveColor", onClick: onCancel, title: "Cancel Edit" }, "Cancel"),
            React.createElement(Button, { isSubmit: false, buttonType: "primaryColor", onClick: onOk, title: acceptEditAlt }, acceptEditButton))));
};
exports.default = DrawingMenu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=drawing-menu.js.map