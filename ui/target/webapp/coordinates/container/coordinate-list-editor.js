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
var React = __importStar(require("react"));
var coordinate_list_editor_1 = __importDefault(require("../presentation/coordinate-list-editor"));
var coordinate_list_1 = __importDefault(require("geospatialdraw/bin/coordinates/react-hooks/coordinate-list"));
var CoordinateListEditorContainer = function (_a) {
    var initCoordinates = _a.coordinateList, coordinateUnit = _a.coordinateUnit, buffer = _a.buffer, bufferUnit = _a.bufferUnit, onChange = _a.onChange;
    var _b = coordinate_list_1.default(initCoordinates, 0), lat = _b.lat, lon = _b.lon, coordinateList = _b.coordinateList, setSelectedIndex = _b.setSelectedIndex, selectedIndex = _b.selectedIndex, addCoordinateAfter = _b.addCoordinateAfter, deleteCoordinate = _b.deleteCoordinate, setCoordinate = _b.setCoordinate;
    React.useEffect(function () {
        if (JSON.stringify(coordinateList) !== JSON.stringify(initCoordinates)) {
            onChange(coordinateList, buffer, bufferUnit);
        }
    }, [coordinateList]);
    return (React.createElement(coordinate_list_editor_1.default, { selectedIndex: selectedIndex, buffer: buffer, bufferUnit: bufferUnit, coordinateList: coordinateList, coordinateUnit: coordinateUnit, lat: lat, lon: lon, setBuffer: function (value) { return onChange(coordinateList, value, bufferUnit); }, setUnit: function (value) { return onChange(coordinateList, buffer, value); }, setCoordinate: function (lat, lon) {
            setCoordinate({ lat: lat, lon: lon });
        }, addCoordinate: addCoordinateAfter, deleteCoordinate: deleteCoordinate, selectCoordinate: setSelectedIndex }));
};
exports.default = CoordinateListEditorContainer;
//# sourceMappingURL=coordinate-list-editor.js.map