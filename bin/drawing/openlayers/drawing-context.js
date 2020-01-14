"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __importDefault(require("ol/layer/Vector"));
var Vector_2 = __importDefault(require("ol/source/Vector"));
var Snap_1 = __importDefault(require("ol/interaction/Snap"));
var Modify_1 = __importDefault(require("ol/interaction/Modify"));
var GeoJSON_1 = __importDefault(require("ol/format/GeoJSON"));
var utilities_1 = require("../../geometry/utilities");
/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
var DrawingContext = /** @class */ (function () {
    /**
     * Constructs an instance of the drawing context
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    function DrawingContext(_a) {
        var map = _a.map, drawingStyle = _a.drawingStyle;
        this.bufferUpdateEvent = this.bufferUpdateEvent.bind(this);
        this.animationFrameId = 0;
        this.geoFormat = new GeoJSON_1.default();
        this.style = drawingStyle;
        this.draw = null;
        this.listenerList = [];
        this.map = map;
        this.drawLayer = new Vector_1.default({
            source: new Vector_2.default(),
            style: drawingStyle,
            zIndex: 2,
            updateWhileInteracting: true,
        });
        this.bufferLayer = new Vector_1.default({
            source: new Vector_2.default(),
            style: drawingStyle,
            zIndex: 1,
        });
        this.map.addLayer(this.bufferLayer);
        this.map.addLayer(this.drawLayer);
        this.modify = new Modify_1.default({
            source: this.drawLayer.getSource(),
        });
        this.snap = new Snap_1.default({
            source: this.drawLayer.getSource(),
        });
    }
    DrawingContext.prototype.getStyle = function () {
        return this.style;
    };
    DrawingContext.prototype.removeFeature = function () {
        this.drawLayer.getSource().clear();
    };
    DrawingContext.prototype.updateFeature = function (feature) {
        this.removeFeature();
        this.drawLayer.getSource().addFeature(feature);
    };
    DrawingContext.prototype.updateBufferFeature = function (feature, animate) {
        if (animate === void 0) { animate = true; }
        this.bufferLayer.getSource().clear();
        var width = (feature.get('buffer') || { width: 0 }).width;
        if (width > 0) {
            var geo = JSON.parse(this.geoFormat.writeFeature(feature));
            var bufferedGeo = utilities_1.makeBufferedGeo(geo);
            var bufferFeature = this.geoFormat.readFeature(bufferedGeo);
            this.bufferLayer.getSource().addFeature(bufferFeature);
            if (animate) {
                this.setEvent('map', 'pointerdrag', this.bufferUpdateEvent);
            }
        }
    };
    DrawingContext.prototype.bufferUpdateEvent = function () {
        var _this = this;
        var featureList = this.drawLayer.getSource().getFeatures();
        if (featureList.length) {
            var feature_1 = featureList[0];
            this.animationFrameId = requestAnimationFrame(function () {
                _this.updateBufferFeature(feature_1);
            });
        }
    };
    DrawingContext.prototype.setModifyInteraction = function (modify) {
        this.modify = modify;
    };
    DrawingContext.prototype.getSource = function () {
        return this.drawLayer.getSource();
    };
    DrawingContext.prototype.setDrawInteraction = function (draw) {
        this.draw = draw;
    };
    DrawingContext.prototype.setEvent = function (target, event, handler) {
        var listenerTarget = this[target];
        if (listenerTarget !== null) {
            listenerTarget.on(event, handler);
            this.listenerList.push({
                target: target,
                event: event,
                handler: handler,
            });
        }
    };
    DrawingContext.prototype.removeListener = function (target, event, handler) {
        if (target === 'map') {
            this.map.un(event, handler);
        }
        else {
            var listenerTarget = this[target];
            if (listenerTarget !== null) {
                listenerTarget.un(event, handler);
            }
        }
    };
    DrawingContext.prototype.removeListeners = function () {
        for (var _i = 0, _a = this.listenerList; _i < _a.length; _i++) {
            var listener = _a[_i];
            this.removeListener(listener.target, listener.event, listener.handler);
        }
        this.listenerList = [];
        cancelAnimationFrame(this.animationFrameId);
    };
    DrawingContext.prototype.addInteractions = function () {
        if (this.draw !== null) {
            this.map.addInteraction(this.draw);
        }
        this.map.addInteraction(this.snap);
        this.map.addInteraction(this.modify);
    };
    DrawingContext.prototype.addInteractionsWithoutModify = function () {
        if (this.draw !== null) {
            this.map.addInteraction(this.draw);
        }
        this.map.addInteraction(this.snap);
    };
    DrawingContext.prototype.removeInteractions = function () {
        this.map.removeInteraction(this.modify);
        this.map.removeInteraction(this.snap);
        if (this.draw !== null) {
            this.map.removeInteraction(this.draw);
        }
        this.drawLayer.getSource().clear();
        this.bufferLayer.getSource().clear();
    };
    DrawingContext.prototype.remakeInteractions = function () {
        this.modify = new Modify_1.default({
            source: this.drawLayer.getSource(),
        });
        this.snap = new Snap_1.default({
            source: this.drawLayer.getSource(),
        });
    };
    DrawingContext.prototype.circleRadiusToMeters = function (radius) {
        var conversionRate = this.map
            .getView()
            .getProjection()
            .getMetersPerUnit() || 1;
        return radius * conversionRate;
    };
    return DrawingContext;
}());
exports.default = DrawingContext;
//# sourceMappingURL=drawing-context.js.map