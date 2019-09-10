"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
var ol = require("openlayers");
var geometry_1 = require("../geometry");
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
        this.geoFormat = new ol.format.GeoJSON();
        this.style = drawingStyle;
        this.draw = null;
        this.listenerList = [];
        this.map = map;
        this.drawLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: drawingStyle,
            zIndex: 2,
            updateWhileInteracting: true,
        });
        this.bufferLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: drawingStyle,
            zIndex: 1,
        });
        this.map.addLayer(this.bufferLayer);
        this.map.addLayer(this.drawLayer);
        this.modify = new ol.interaction.Modify({
            source: this.drawLayer.getSource(),
        });
        this.snap = new ol.interaction.Snap({
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
    DrawingContext.prototype.updateBufferFeature = function (feature) {
        this.bufferLayer.getSource().clear();
        var buffer = feature.get('buffer');
        if (buffer !== undefined && buffer > 0) {
            var geo = JSON.parse(this.geoFormat.writeFeature(feature));
            var bufferedGeo = geometry_1.makeBufferedGeo(geo);
            var bufferFeature = this.geoFormat.readFeature(bufferedGeo);
            this.bufferLayer.getSource().addFeature(bufferFeature);
            this.map.on('pointerdrag', this.bufferUpdateEvent);
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
    DrawingContext.prototype.setDrawInteraction = function (draw) {
        this.draw = draw;
    };
    DrawingContext.prototype.setEvent = function (target, event, listener) {
        var listenerTarget = this[target];
        if (listenerTarget !== null) {
            listenerTarget.on(event, listener);
            this.listenerList.push({
                target: target,
                event: event,
                listener: listener,
            });
        }
    };
    DrawingContext.prototype.removeListeners = function () {
        for (var _i = 0, _a = this.listenerList; _i < _a.length; _i++) {
            var listener = _a[_i];
            var listenerTarget = this[listener.target];
            if (listenerTarget !== null) {
                listenerTarget.un(listener.event, listener.listener);
            }
        }
        this.listenerList = [];
        cancelAnimationFrame(this.animationFrameId);
        this.map.un('pointerdrag', this.bufferUpdateEvent);
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
        this.modify = new ol.interaction.Modify({
            source: this.drawLayer.getSource(),
        });
        this.snap = new ol.interaction.Snap({
            source: this.drawLayer.getSource(),
        });
    };
    DrawingContext.prototype.setInteractionsActive = function (active) {
        this.modify.setActive(active);
        this.snap.setActive(active);
        if (this.draw) {
            this.draw.setActive(active);
        }
    };
    DrawingContext.prototype.areInteractionsActive = function () {
        return ((this.draw === null || this.draw.getActive()) &&
            this.modify.getActive() &&
            this.snap.getActive());
    };
    DrawingContext.prototype.circleRadiusToMeters = function (radius) {
        return (radius *
            this.map
                .getView()
                .getProjection()
                .getMetersPerUnit());
    };
    return DrawingContext;
}());
exports.default = DrawingContext;
//# sourceMappingURL=drawing-context.js.map