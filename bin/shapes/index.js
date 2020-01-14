"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shape_1 = require("./shape");
exports.POLYGON = shape_1.POLYGON;
exports.POINT = shape_1.POINT;
exports.POINT_RADIUS = shape_1.POINT_RADIUS;
exports.CIRCLE = shape_1.CIRCLE;
exports.LINE = shape_1.LINE;
exports.BOUNDING_BOX = shape_1.BOUNDING_BOX;
exports.BBOX = shape_1.BBOX;
var shape_detector_1 = __importDefault(require("./shape-detector"));
exports.ShapeDetector = shape_detector_1.default;
//# sourceMappingURL=index.js.map