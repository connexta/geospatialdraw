"use strict";
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
var coordinates = __importStar(require("./coordinates"));
exports.coordinates = coordinates;
var drawing = __importStar(require("./drawing"));
exports.drawing = drawing;
var menu = __importStar(require("./menu"));
exports.menu = menu;
var geometry = __importStar(require("./geometry"));
exports.geometry = geometry;
var renderer_1 = __importDefault(require("./renderer"));
var shapes = __importStar(require("./shapes"));
exports.shapes = shapes;
var renderer;
(function (renderer) {
    renderer.Renderer = renderer_1.default;
})(renderer = exports.renderer || (exports.renderer = {}));
//# sourceMappingURL=index.js.map