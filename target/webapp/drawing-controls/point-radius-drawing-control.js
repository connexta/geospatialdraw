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
Object.defineProperty(exports, "__esModule", { value: true });
var ol = require("openlayers");
var modifiable_drawing_control_1 = require("./modifiable-drawing-control");
var geometry_1 = require("../geometry");
var distance_1 = require("../internal/distance");
/**
 * Drawing Control for a circle/point radius
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
        return _this;
    }
    PointRadiusDrawingControl.prototype.onCompleteDrawing = function (e) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrame = function () { };
        _super.prototype.onCompleteDrawing.call(this, e);
    };
    PointRadiusDrawingControl.prototype.onStartDrawing = function (e) {
        var _this = this;
        _super.prototype.onStartDrawing.call(this, e);
        if (this.properties.buffer) {
            this.animationFrame = function () {
                var geoJSON = _this.getGeoJSONFromCompleteDrawEvent(e);
                var feature = _this.makeFeature(geoJSON);
                _this.applyPropertiesToFeature(feature);
                _this.context.updateBufferFeature(feature);
                _this.animationFrameId = requestAnimationFrame(_this.animationFrame);
            };
            this.animationFrame();
        }
    };
    PointRadiusDrawingControl.prototype.getShape = function () {
        return 'Point Radius';
    };
    PointRadiusDrawingControl.prototype.getGeoJSONFromCompleteDrawEvent = function (e) {
        return this.featureToGeoJSON(e.feature);
    };
    PointRadiusDrawingControl.prototype.getGeoJSONFromCompleteModifyEvent = function (e) {
        var feature = e.features.getArray()[0];
        return this.featureToGeoJSON(feature);
    };
    PointRadiusDrawingControl.prototype.featureToGeoJSON = function (inputFeature) {
        var point;
        var geometry = inputFeature.getGeometry();
        var bufferUnit = this.properties.bufferUnit || geometry_1.METERS;
        var radius = distance_1.getDistanceInMeters(this.properties.buffer || 0, bufferUnit);
        if (geometry.getType() === 'Point') {
            point = geometry;
        }
        else {
            var circle = geometry;
            point = new ol.geom.Point(circle.getCenter());
            radius = this.context.circleRadiusToMeters(circle.getRadius());
        }
        var feature = new ol.Feature(point);
        var bestFitRadiusUnit = bufferUnit;
        if (bestFitRadiusUnit === geometry_1.METERS && radius > 1000) {
            bestFitRadiusUnit = geometry_1.KILOMETERS;
        }
        this.setProperties(__assign({}, this.properties, { buffer: distance_1.getDistanceFromMeters(radius, bestFitRadiusUnit), bufferUnit: bestFitRadiusUnit }));
        var json = this.writeExtendedGeoJSON(feature);
        return json;
    };
    PointRadiusDrawingControl.prototype.makeFeature = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        var geometry = feature.getGeometry();
        var point;
        if (geometry.getType() === 'Point') {
            point = geometry;
        }
        else {
            var circle = geometry;
            point = new ol.geom.Point(circle.getCenter());
            feature.set('buffer', distance_1.getDistanceFromMeters(this.context.circleRadiusToMeters(circle.getRadius()), feature.get('bufferUnit') || geometry_1.METERS));
        }
        return new ol.Feature(point);
    };
    PointRadiusDrawingControl.prototype.getGeoType = function () {
        return 'Circle';
    };
    PointRadiusDrawingControl.prototype.getStaticStyle = function (_feature) {
        var circleFeature = new ol.Feature(new ol.geom.Circle([0, 0], 1));
        this.applyPropertiesToFeature(circleFeature);
        var style = this.context.getStyle();
        if (typeof style === 'function') {
            return style(circleFeature, 1);
        }
        else {
            return style;
        }
    };
    return PointRadiusDrawingControl;
}(modifiable_drawing_control_1.default));
exports.default = PointRadiusDrawingControl;
//# sourceMappingURL=point-radius-drawing-control.js.map