"use strict";
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
var polished_1 = require("polished");
var Black = function (props) {
    return polished_1.readableColor(props.theme.backgroundContent);
};
exports.Black = Black;
var Silver = function (props) { return polished_1.darken(0.2)(White(props)); };
exports.Silver = Silver;
var Grey = function (props) { return polished_1.darken(0.4)(White(props)); };
exports.Grey = Grey;
var White = function (props) { return props.theme.backgroundContent; };
exports.White = White;
var ButtonColor = function (props) { return props.theme.primaryColor; };
exports.ButtonColor = ButtonColor;
var SubmitButtonColor = function (props) { return props.theme.positiveColor; };
exports.SubmitButtonColor = SubmitButtonColor;
//# sourceMappingURL=colors.js.map