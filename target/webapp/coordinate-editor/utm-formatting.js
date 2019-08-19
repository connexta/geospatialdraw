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
var usng_js_1 = require("usng.js");
var UnitConverter = new usng_js_1.Converter();
var utmToString = function (_a) {
    var easting = _a.easting, northing = _a.northing, zone = _a.zone, hemisphere = _a.hemisphere;
    return UnitConverter.serializeUTMUPS({
        easting: easting,
        northing: northing,
        zoneNumber: zone,
        northPole: hemisphere === 'N',
    });
};
exports.utmToString = utmToString;
//# sourceMappingURL=utm-formatting.js.map