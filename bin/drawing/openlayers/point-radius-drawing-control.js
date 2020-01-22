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
var LineString_1 = __importDefault(require("ol/geom/LineString"));
var Point_1 = __importDefault(require("ol/geom/Point"));
var Circle_1 = __importDefault(require("ol/geom/Circle"));
var Draw_1 = __importDefault(require("ol/interaction/Draw"));
var Modify_1 = __importDefault(require("ol/interaction/Modify"));
var GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
var turf = __importStar(require("@turf/turf"));
var basic_drawing_control_1 = __importDefault(require("./basic-drawing-control"));
var shape_1 = require("../../shapes/shape");
var geometry_1 = require("../../geometry/geometry");
var utilities_1 = require("../../geometry/utilities");
var units_1 = require("../../geometry/units");
var distance_1 = require("../../internal/distance");
var measurements_1 = require("../../geometry/measurements");
/**
 * Drawing Control for a circle/point radius on an Open Layers Map
 */
var PointRadiusDrawingControl = /** @class */ (function (_super) {
    __extends(PointRadiusDrawingControl, _super);
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    function PointRadiusDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.animationFrameId = 0;
        _this.animationFrame = function () { };
        _this.onCompleteDrawing = _this.onCompleteDrawing.bind(_this);
        _this.onStartDrawing = _this.onStartDrawing.bind(_this);
        _this.onStartModify = _this.onStartModify.bind(_this);
        _this.onCompleteModify = _this.onCompleteModify.bind(_this);
        _this.initalCenter = [0, 0];
        return _this;
    }
    PointRadiusDrawingControl.prototype.startDrawAnimation = function (feature) {
        var _this = this;
        var revision = feature.getRevision();
        this.animationFrame = function () {
            var update = feature.getRevision();
            if (update !== revision) {
                revision = update;
                var pointFeature = new Feature_1.default(_this.updatePointFromRadiusLine(_this.toLine(feature)));
                _this.applyPropertiesToFeature(pointFeature);
                _this.context.updateBufferFeature(pointFeature, false);
                _this.updateLabel(feature);
            }
            _this.animationFrameId = requestAnimationFrame(_this.animationFrame);
        };
        this.animationFrame();
    };
    PointRadiusDrawingControl.prototype.stopDrawAnimation = function (feature) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrame = function () { };
        var point = this.updatePointFromRadiusLine(this.toLine(feature));
        var pointFeature = new Feature_1.default(point);
        var _a = utilities_1.getBufferPropOrDefault(this.properties), originalWidth = _a.width, originalUnit = _a.unit;
        var _b = measurements_1.optimizedUnitForLength({
            unit: originalUnit,
            length: originalWidth,
        }), width = _b.length, unit = _b.unit;
        this.setProperties(__assign({}, this.properties, { buffer: {
                width: width,
                unit: unit,
            } }));
        var geoJSON = this.writeExtendedGeoJSON(pointFeature);
        return geoJSON;
    };
    PointRadiusDrawingControl.prototype.reorientRadiusLineFeature = function (center) {
        this.initalCenter = center;
        var line = this.makeRadiusLineFromPoint(center);
        var feature = new Feature_1.default(line);
        this.applyPropertiesToFeature(feature);
        this.context.updateFeature(feature);
    };
    PointRadiusDrawingControl.prototype.onCompleteDrawing = function (e) {
        this.inputBlocked = false;
        var feature = e.feature;
        var geoJSON = this.stopDrawAnimation(feature);
        this.applyPropertiesToFeature(feature);
        this.receiver(geoJSON);
    };
    PointRadiusDrawingControl.prototype.onStartDrawing = function (e) {
        this.inputBlocked = true;
        var feature = e.feature;
        var source = this.context.getSource();
        source.getFeatures().forEach(function (f) { return source.removeFeature(f); });
        this.initalCenter = this.toLine(feature).getCoordinates()[0];
        this.startDrawAnimation(feature);
    };
    PointRadiusDrawingControl.prototype.onStartModify = function (e) {
        this.inputBlocked = true;
        var feature = e.features.getArray()[0];
        var line = this.toLine(feature);
        var clickedPoint = line.getClosestPoint(e.mapBrowserEvent.coordinate);
        var distanceMap = line
            .getCoordinates()
            .map(function (point) { return turf.distance(point, clickedPoint); });
        var classNames = distanceMap[0] < distanceMap[1] ? [geometry_1.HIDDEN_CLASSNAME] : [];
        feature.set('class', classNames);
        this.startDrawAnimation(feature);
    };
    PointRadiusDrawingControl.prototype.onCompleteModify = function (e) {
        this.inputBlocked = false;
        var feature = e.features.getArray()[0];
        var g = feature.getGeometry();
        if (g) {
            g.getType();
        }
        feature.unset('class');
        var geoJSON = this.stopDrawAnimation(feature);
        var center = this.toLine(feature).getCoordinates()[0];
        if (!this.pointsEqual(center, this.initalCenter)) {
            this.reorientRadiusLineFeature(center);
        }
        this.receiver(geoJSON);
    };
    PointRadiusDrawingControl.prototype.makeFeatures = function (geoJSON) {
        var bufferFeature = this.geoFormat.readFeature(geoJSON);
        var line = this.makeRadiusLineFromPoint(this.toPoint(bufferFeature).getCoordinates());
        var feature = new Feature_1.default(line);
        return {
            feature: feature,
            bufferFeature: bufferFeature,
        };
    };
    PointRadiusDrawingControl.prototype.makeRadiusLineFromPoint = function (point, bearing) {
        if (bearing === void 0) { bearing = 90; }
        var _a = utilities_1.getBufferPropOrDefault(this.properties), width = _a.width, unit = _a.unit;
        var meters = distance_1.getDistanceInMeters(width, unit);
        var destination = turf.rhumbDestination(point, meters, bearing, {
            units: 'meters',
        });
        var end = destination.geometry.coordinates;
        return new LineString_1.default([point, end]);
    };
    PointRadiusDrawingControl.prototype.pointsEqual = function (a, b) {
        return a[0] === b[0] && a[1] === b[1];
    };
    PointRadiusDrawingControl.prototype.toLine = function (feature) {
        return feature.getGeometry();
    };
    PointRadiusDrawingControl.prototype.toPoint = function (feature) {
        return feature.getGeometry();
    };
    PointRadiusDrawingControl.prototype.updatePointFromRadiusLine = function (line) {
        var center = line.getCoordinates()[0];
        if (this.pointsEqual(center, this.initalCenter)) {
            var distance = turf.rhumbDistance(line.getCoordinates()[0], line.getCoordinates()[1], {
                units: 'meters',
            });
            var unit = utilities_1.getBufferPropOrDefault(this.properties).unit;
            var width = distance_1.getDistanceFromMeters(distance, unit);
            this.setProperties(__assign({}, this.properties, { buffer: {
                    width: width,
                    unit: unit,
                } }));
        }
        return new Point_1.default(line.getCoordinates()[0]);
    };
    PointRadiusDrawingControl.prototype.setGeo = function (geoJSON) {
        this.cancelDrawing();
        this.setProperties(geoJSON.properties || {});
        var _a = this.makeFeatures(geoJSON), feature = _a.feature, bufferFeature = _a.bufferFeature;
        this.initalCenter = this.toPoint(bufferFeature).getCoordinates();
        this.applyPropertiesToFeature(feature);
        this.applyPropertiesToFeature(bufferFeature);
        this.context.updateFeature(feature);
        this.context.updateBufferFeature(bufferFeature, false);
        this.updateLabel(feature);
        this.startDrawingInteraction();
    };
    PointRadiusDrawingControl.prototype.getStaticStyle = function () {
        var circleFeature = new Feature_1.default(new Circle_1.default([0, 0], 1));
        this.applyPropertiesToFeature(circleFeature);
        var style = this.context.getStyle();
        if (typeof style === 'function') {
            return style(circleFeature, 1);
        }
        else {
            return style;
        }
    };
    PointRadiusDrawingControl.prototype.startDrawing = function () {
        this.context.removeFeature();
        this.startDrawingInteraction();
    };
    PointRadiusDrawingControl.prototype.startDrawingInteraction = function () {
        var drawInteraction = new Draw_1.default({
            type: this.getGeoType(),
            style: this.getStaticStyle(),
            maxPoints: 2,
            source: this.context.getSource(),
        });
        this.drawingActive = true;
        this.context.setModifyInteraction(new Modify_1.default({
            insertVertexCondition: function () { return false; },
            deleteCondition: function () { return false; },
            source: this.context.getSource(),
        }));
        this.context.setDrawInteraction(drawInteraction);
        this.context.setEvent('draw', 'drawend', this.onCompleteDrawing);
        this.context.setEvent('draw', 'drawstart', this.onStartDrawing);
        this.context.setEvent('modify', 'modifyend', this.onCompleteModify);
        this.context.setEvent('modify', 'modifystart', this.onStartModify);
        this.context.addInteractions();
    };
    PointRadiusDrawingControl.prototype.getShape = function () {
        return shape_1.POINT_RADIUS;
    };
    PointRadiusDrawingControl.prototype.getGeoType = function () {
        return GeometryType_1.default.LINE_STRING;
    };
    PointRadiusDrawingControl.prototype.cancelDrawing = function () {
        // uses custom modify interaction
        this.context.remakeInteractions();
        _super.prototype.cancelDrawing.call(this);
    };
    PointRadiusDrawingControl.prototype.updateLabel = function (feature) {
        var geometry = feature.getGeometry();
        var _a = utilities_1.getBufferPropOrDefault(this.properties), bufferUnit = _a.unit, bufferWidth = _a.width;
        var _b = measurements_1.optimizedUnitForLength({
            unit: bufferUnit,
            length: bufferWidth,
        }), unit = _b.unit, length = _b.length;
        if (geometry) {
            var point = turf.rhumbDestination(geometry.getCoordinates()[0], distance_1.getDistanceInMeters(length, unit), 180, {
                units: 'meters',
            });
            var coordinates = point.geometry.coordinates;
            var area = Math.PI * length * length;
            var text = this.formatLabelNumber(length) + " " + units_1.abbreviateUnit(unit) + "\n" + this.formatLabelNumber(area) + " " + units_1.abbreviateUnit(unit) + "\u00B2";
            this.context.updateLabel(coordinates, text);
        }
    };
    return PointRadiusDrawingControl;
}(basic_drawing_control_1.default));
exports.default = PointRadiusDrawingControl;
//# sourceMappingURL=point-radius-drawing-control.js.map