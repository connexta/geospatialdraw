"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var turf = __importStar(require("@turf/turf"));
var defaultPropertiesToString = function (properties) {
    return JSON.stringify(properties);
};
/**
 * React hook for memoizing GeometryJSON
 * so that changes to GeometryJSON objects can
 * be tracked more efficiently than using JSON.stringify
 * @params geometry - GeometryJSON value
 * @params propertiesToString - function for serializing
 * properties on the GeometryJSON. This defaults to JSON.stringify
 * @returns memo
 */
var useGeometryJSONMemo = function (geometry, propertiesToString) {
    if (propertiesToString === void 0) { propertiesToString = defaultPropertiesToString; }
    var properties = geometry === null ? '' : propertiesToString(geometry.properties);
    var coordinates = (geometry === null ? [] : turf.coordAll(geometry));
    return react_1.useMemo(function () {
        return ({
            properties: properties,
            coordinates: coordinates,
        });
    }, [geometry]);
};
exports.default = useGeometryJSONMemo;
//# sourceMappingURL=memo.js.map