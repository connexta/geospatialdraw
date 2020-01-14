"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useSyncedCoordinates = function (prop, state, update) {
    react_1.useEffect(function () {
        if (prop.lat !== state.lat || prop.lon !== state.lon) {
            update(prop);
        }
    }, [prop.lat, prop.lon]);
};
exports.default = useSyncedCoordinates;
//# sourceMappingURL=sync-coordinates.js.map