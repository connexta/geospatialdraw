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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Draw_1 = __importDefault(require("ol/interaction/Draw"));
var basic_drawing_control_1 = __importDefault(require("./basic-drawing-control"));
var ModifiableDrawingControl = /** @class */ (function (_super) {
    __extends(ModifiableDrawingControl, _super);
    function ModifiableDrawingControl(context, receiver) {
        var _this = _super.call(this, context, receiver) || this;
        _this.onCompleteDrawing = _this.onCompleteDrawing.bind(_this);
        _this.onStartDrawing = _this.onStartDrawing.bind(_this);
        _this.onCompleteModify = _this.onCompleteModify.bind(_this);
        return _this;
    }
    ModifiableDrawingControl.prototype.getGeoJSONFromCompleteDrawEvent = function (e) {
        return this.writeExtendedGeoJSON(e.feature);
    };
    ModifiableDrawingControl.prototype.getGeoJSONFromCompleteModifyEvent = function (e) {
        return this.writeExtendedGeoJSON(e.features.getArray()[0]);
    };
    ModifiableDrawingControl.prototype.onCompleteDrawing = function (e) {
        var geoJSON = this.getGeoJSONFromCompleteDrawEvent(e);
        this.inputBlocked = false;
        var feature = this.makeFeature(geoJSON);
        this.applyPropertiesToFeature(feature);
        this.context.updateFeature(feature);
        this.context.updateBufferFeature(feature);
        this.receiver(geoJSON);
    };
    ModifiableDrawingControl.prototype.onStartDrawing = function (_e) {
        this.inputBlocked = true;
    };
    ModifiableDrawingControl.prototype.onStartModify = function (_e) {
        this.inputBlocked = true;
    };
    ModifiableDrawingControl.prototype.onCompleteModify = function (e) {
        this.inputBlocked = false;
        this.context.updateBufferFeature(e.features.getArray()[0]);
        this.receiver(this.getGeoJSONFromCompleteModifyEvent(e));
    };
    ModifiableDrawingControl.prototype.makeFeature = function (geoJSON) {
        var feature = this.geoFormat.readFeature(geoJSON);
        var geometry = feature.getGeometry();
        if (geometry && geometry.getType() !== this.getGeoType()) {
            throw new Error("Wrong geometry type! expected " + this.getGeoType() + " but got " + geometry.getType() + " instead.");
        }
        return feature;
    };
    ModifiableDrawingControl.prototype.getStaticStyle = function (feature) {
        var style = this.context.getStyle();
        if (typeof style === 'function') {
            return style(feature, 1);
        }
        else {
            return style;
        }
    };
    ModifiableDrawingControl.prototype.getDefaultStaticStyle = function () {
        var feature = this.makeEmptyFeature();
        this.applyPropertiesToFeature(feature);
        return this.getStaticStyle(feature);
    };
    ModifiableDrawingControl.prototype.setGeo = function (geoJSON) {
        this.cancelDrawing();
        this.setProperties(geoJSON.properties || {});
        var feature = this.makeFeature(geoJSON);
        this.applyPropertiesToFeature(feature);
        this.context.updateFeature(feature);
        this.context.updateBufferFeature(feature);
        var drawInteraction = new Draw_1.default({
            type: this.getGeoType(),
            style: this.getStaticStyle(feature),
        });
        this.startDrawingInteraction(drawInteraction);
    };
    ModifiableDrawingControl.prototype.startDrawing = function () {
        this.context.removeFeature();
        var drawInteraction = new Draw_1.default({
            type: this.getGeoType(),
            style: this.getDefaultStaticStyle(),
        });
        this.startDrawingInteraction(drawInteraction);
    };
    ModifiableDrawingControl.prototype.startDrawingInteraction = function (drawInteraction) {
        this.drawingActive = true;
        this.context.setDrawInteraction(drawInteraction);
        this.context.setEvent('draw', 'drawend', this.onCompleteDrawing);
        this.context.setEvent('draw', 'drawstart', this.onStartDrawing);
        this.context.setEvent('modify', 'modifyend', this.onCompleteModify);
        this.context.setEvent('modify', 'modifystart', this.onStartModify);
        this.context.addInteractions();
    };
    return ModifiableDrawingControl;
}(basic_drawing_control_1.default));
exports.default = ModifiableDrawingControl;
//# sourceMappingURL=modifiable-drawing-control.js.map