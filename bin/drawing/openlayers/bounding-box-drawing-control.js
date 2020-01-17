"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Feature_1 = __importDefault(require("ol/Feature"));
var Extent_1 = __importDefault(require("ol/interaction/Extent"));
var GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
var Polygon_1 = __importDefault(require("ol/geom/Polygon"));
var turf = __importStar(require("@turf/turf"));
var basic_drawing_control_1 = __importDefault(require("./basic-drawing-control"));
var shape_1 = require("../../shapes/shape");
var units_1 = require("../../geometry/units");
var measurements_1 = require("../../geometry/measurements");
var utilities_1 = require("../../geometry/utilities");
var BBoxInteraction = /** @class */ (function (_super) {
    __extends(BBoxInteraction, _super);
    function BBoxInteraction(_a) {
        var setInputBlocked = _a.setInputBlocked, rest = __rest(_a, ["setInputBlocked"]);
        var _this = _super.call(this, rest) || this;
        _this.setInputBlocked = setInputBlocked;
        return _this;
    }
    BBoxInteraction.prototype.handleUpEvent = function (e) {
        this.setInputBlocked(false);
        return _super.prototype.handleUpEvent.call(this, e);
    };
    BBoxInteraction.prototype.handleDownEvent = function (e) {
        this.setInputBlocked(true);
        return _super.prototype.handleDownEvent.call(this, e);
    };
    return BBoxInteraction;
}(Extent_1.default));
/**
 * Drawing Control for drawing a bounding box on an Open Layers Map
 */
var BoundingBoxDrawingControl = /** @class */ (function (_super) {
    __extends(BoundingBoxDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function BoundingBoxDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.extentChanged = _this.extentChanged.bind(_this);
        _this.setInputBlocked = _this.setInputBlocked.bind(_this);
        _this.drawInteraction = null;
        _this.cachedGeo = null;
        return _this;
    }
    BoundingBoxDrawingControl.prototype.setInputBlocked = function (value) {
        var oldValue = this.inputBlocked;
        this.inputBlocked = value;
        if (oldValue && !value && this.cachedGeo !== null) {
            this.receiver(this.cachedGeo);
            this.cachedGeo = null;
        }
    };
    BoundingBoxDrawingControl.prototype.getGeoType = function () {
        return GeometryType_1.default.POLYGON;
    };
    BoundingBoxDrawingControl.prototype.getShape = function () {
        return shape_1.BOUNDING_BOX;
    };
    BoundingBoxDrawingControl.prototype.getDefaultStaticStyle = function () {
        var feature = new Feature_1.default(new Polygon_1.default([
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
        ]));
        this.applyPropertiesToFeature(feature);
        var style = this.context.getStyle();
        if (typeof style === 'function') {
            return style(feature, 1);
        }
        else {
            return style;
        }
    };
    BoundingBoxDrawingControl.prototype.setGeo = function (geoJSON) {
        this.cancelDrawing();
        this.setProperties(geoJSON.properties || {});
        var feature = this.geoFormat.readFeature(geoJSON);
        var geometry = feature.getGeometry();
        if (geometry) {
            var extent = geometry.getExtent();
            this.applyPropertiesToFeature(feature);
            this.context.updateFeature(feature);
            this.context.updateBufferFeature(feature);
            this.updateLabel(feature);
            var style = this.getDefaultStaticStyle();
            var drawInteraction = new BBoxInteraction({
                extent: extent,
                pointerStyle: style,
                boxStyle: style,
                setInputBlocked: this.setInputBlocked,
            });
            this.startDrawingInteraction(drawInteraction);
        }
    };
    BoundingBoxDrawingControl.prototype.startDrawing = function () {
        this.context.removeFeature();
        var style = this.getDefaultStaticStyle();
        this.drawInteraction = new BBoxInteraction({
            pointerStyle: style,
            boxStyle: style,
            setInputBlocked: this.setInputBlocked,
        });
        this.startDrawingInteraction(this.drawInteraction);
    };
    BoundingBoxDrawingControl.prototype.startDrawingInteraction = function (drawInteraction) {
        this.drawingActive = true;
        this.context.setDrawInteraction(drawInteraction);
        this.context.setEvent('draw', 'extentchanged', this.extentChanged);
        this.context.addInteractionsWithoutModify();
    };
    BoundingBoxDrawingControl.prototype.extentChanged = function (e) {
        if (e.extent !== null) {
            var geoJSON = this.extentToGeoJSON(e.extent);
            var feature = this.geoFormat.readFeature(geoJSON);
            this.applyPropertiesToFeature(feature);
            this.context.updateFeature(feature);
            this.context.updateBufferFeature(feature);
            this.updateLabel(feature);
            this.cachedGeo = geoJSON;
        }
    };
    BoundingBoxDrawingControl.prototype.extentToGeoJSON = function (bbox) {
        var bboxPolygon = turf.bboxPolygon(bbox);
        return {
            bbox: bbox,
            type: 'Feature',
            properties: __assign({}, this.properties, { shape: this.getShape() }),
            geometry: bboxPolygon.geometry,
        };
    };
    BoundingBoxDrawingControl.prototype.updateLabel = function (feature) {
        var geometry = feature.getGeometry();
        var extent = geometry ? geometry.getExtent() : [0, 0, 0, 0];
        var minX = extent[0];
        var minY = extent[1];
        var maxX = extent[2];
        var maxY = extent[3];
        var bufferUnit = utilities_1.getBufferPropOrDefault(this.properties).unit;
        var unit = measurements_1.optimizedUnitForDistanceBetweenPoints([minX, minY], [maxX, maxY], bufferUnit).unit;
        var length = measurements_1.distanceBetweenPoints([minX, minY], [maxX, minY], unit);
        var width = measurements_1.distanceBetweenPoints([minX, minY], [minX, maxY], unit);
        var area = length * width;
        var text = this.formatLabelNumber(length) + " " + units_1.abbreviateUnit(unit) + " x " + this.formatLabelNumber(width) + " " + units_1.abbreviateUnit(unit) + "\n" + this.formatLabelNumber(area) + " " + units_1.abbreviateUnit(unit) + "\u00B2";
        var coordinates = [(maxX - minX) / 2 + minX, minY];
        this.context.updateLabel(coordinates, text);
    };
    return BoundingBoxDrawingControl;
}(basic_drawing_control_1.default));
exports.default = BoundingBoxDrawingControl;
//# sourceMappingURL=bounding-box-drawing-control.js.map