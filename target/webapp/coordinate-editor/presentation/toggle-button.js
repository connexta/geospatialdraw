"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
var styled_components_1 = require("styled-components");
var colors_1 = require("./colors");
var ToggleButton = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: ", ";\n  background-color: ", ";\n  cursor: pointer;\n  color: ", ";\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], ["\n  padding: ", ";\n  background-color: ",
    ";\n  cursor: pointer;\n  color: ", ";\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"])), function (props) { return props.theme.minimumSpacing; }, function (props) {
    return props.isSelected ? props.theme.primaryColor : 'transparent';
}, colors_1.Black, colors_1.Black, colors_1.White);
exports.default = ToggleButton;
var templateObject_1;
//# sourceMappingURL=toggle-button.js.map