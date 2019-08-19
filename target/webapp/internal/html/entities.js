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
var decodeHtml = function (html) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
};
exports.decodeHtml = decodeHtml;
var encodeHtml = function (text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    return textarea.innerHTML;
};
exports.encodeHtml = encodeHtml;
//# sourceMappingURL=entities.js.map