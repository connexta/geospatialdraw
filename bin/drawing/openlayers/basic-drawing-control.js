"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var GeoJSON_1 = __importDefault(require("ol/format/GeoJSON"));
var measurements_1 = require("../../geometry/measurements");
var utilities_1 = require("../../geometry/utilities");
var units_1 = require("../../geometry/units");
var BasicDrawingControl = /** @class */ (function () {
    function BasicDrawingControl(context, receiver) {
        this.context = context;
        this.receiver = receiver;
        this.geoFormat = new GeoJSON_1.default();
        this.inputBlocked = false;
        this.drawingActive = false;
        this.setProperties(utilities_1.makeEmptyGeometry('', this.getShape()).properties);
    }
    BasicDrawingControl.prototype.setProperties = function (properties) {
        this.properties = __assign({ id: '', color: '', buffer: {
                width: 0,
                unit: units_1.METERS,
            } }, properties, { shape: this.getShape() });
    };
    BasicDrawingControl.prototype.getProperties = function () {
        return this.properties;
    };
    BasicDrawingControl.prototype.applyPropertiesToFeature = function (feature) {
        var _this = this;
        if (this.properties.id) {
            feature.setId(this.properties.id);
        }
        Object.keys(this.properties).forEach(function (key) {
            if (key !== 'id') {
                feature.set(key, _this.properties[key]);
            }
        });
    };
    BasicDrawingControl.prototype.featureToGeo = function (feature) {
        return this.geoFormat.writeFeatureObject(feature);
    };
    BasicDrawingControl.prototype.writeExtendedGeoJSON = function (feature) {
        var shape = this.getShape();
        var geo = this.featureToGeo(feature);
        var bufferedGeo = utilities_1.makeBufferedGeo(__assign({}, geo, { properties: __assign({}, this.properties, geo.properties, { shape: shape }) }));
        return __assign({}, geo, { bbox: utilities_1.geoToExtent(bufferedGeo), properties: __assign({}, this.properties, { shape: shape }) });
    };
    BasicDrawingControl.prototype.cancelDrawing = function () {
        this.context.hideLabel();
        this.context.removeListeners();
        this.context.removeInteractions();
        this.drawingActive = false;
    };
    BasicDrawingControl.prototype.isInputBlocked = function () {
        return this.inputBlocked;
    };
    BasicDrawingControl.prototype.isDrawing = function () {
        return this.drawingActive;
    };
    BasicDrawingControl.prototype.formatLabelNumber = function (n) {
        return measurements_1.formatNumber(3, 5, n);
    };
    return BasicDrawingControl;
}());
exports.default = BasicDrawingControl;
//# sourceMappingURL=basic-drawing-control.js.map