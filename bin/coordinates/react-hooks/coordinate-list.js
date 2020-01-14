"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Adds an interface for editing a list of coordinates to a react component
 * @param initCoordinates - array of default [lon, lat] coordinate values
 * @param initSelectedIndex - default selected index
 * @returns {
 *   coordinateList - array of [lon, lat] coordinate values
 *   setCoordinateList - sets coordinateList
 *   setSelectedIndex - selected index into coordinateList
 *   addCoordinateBefore - adds a new empty coordinate before the selected index
 *   addCoordinateAfter - adds a new empty coordinate after the selected index
 *   deleteCoordinate - deletes coordinate at selected index
 *   setCoordinate - sets the coordinate at selected index
 * }
 */
var useCoordinateList = function (initCoordinates, initSelectedIndex) {
    var _a = react_1.useState(initCoordinates), coordinateList = _a[0], setCoordinateList = _a[1];
    var _b = react_1.useState(initSelectedIndex), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var boundedSetSelectedIndex = function (i, maxIndex) {
        if (maxIndex === void 0) { maxIndex = coordinateList.length - 1; }
        return setSelectedIndex(Math.min(Math.max(0, i), Math.max(0, maxIndex)));
    };
    var addCoordinateBefore = function () {
        addCoordinate(selectedIndex);
    };
    var addCoordinateAfter = function () {
        addCoordinate(selectedIndex + 1);
    };
    var addCoordinate = function (value) {
        var updatedCoordinates = coordinateList.slice();
        updatedCoordinates.splice(value, 0, [0, 0]);
        setCoordinateList(updatedCoordinates);
    };
    var deleteCoordinate = function () {
        if (coordinateList.length > 1) {
            var updatedCoordinates = coordinateList.slice();
            updatedCoordinates.splice(selectedIndex, 1);
            boundedSetSelectedIndex(selectedIndex, updatedCoordinates.length - 1);
            setCoordinateList(updatedCoordinates);
        }
    };
    var setCoordinate = function (_a) {
        var lat = _a.lat, lon = _a.lon;
        var updatedCoordinates = coordinateList.slice();
        updatedCoordinates.splice(selectedIndex, 1, [lon, lat]);
        setCoordinateList(updatedCoordinates);
    };
    react_1.useEffect(function () {
        if (JSON.stringify(initCoordinates) !== JSON.stringify(coordinateList)) {
            setCoordinateList(initCoordinates);
        }
    }, [initCoordinates]);
    react_1.useEffect(function () {
        if (initSelectedIndex !== selectedIndex) {
            boundedSetSelectedIndex(initSelectedIndex);
        }
    }, [initSelectedIndex]);
    return {
        lat: coordinateList[selectedIndex][1],
        lon: coordinateList[selectedIndex][0],
        coordinateList: coordinateList,
        setCoordinateList: setCoordinateList,
        setSelectedIndex: boundedSetSelectedIndex,
        selectedIndex: selectedIndex,
        addCoordinateBefore: addCoordinateBefore,
        addCoordinateAfter: addCoordinateAfter,
        deleteCoordinate: deleteCoordinate,
        setCoordinate: setCoordinate,
    };
};
exports.default = useCoordinateList;
//# sourceMappingURL=coordinate-list.js.map