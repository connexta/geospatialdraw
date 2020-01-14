"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = __importDefault(require("ol/layer/Vector"));
var Vector_2 = __importDefault(require("ol/source/Vector"));
var GeoJSON_1 = __importDefault(require("ol/format/GeoJSON"));
var utilities_1 = require("../geometry/utilities");
/**
 * Renders Renderable objects on an Open Layers Map
 */
var Renderer = /** @class */ (function () {
    /**
     * Constructs renderer
     * @param map - Open Layers map to render to
     * @param style - style to apply to rendered geometries
     * @param maxZoom - maximum zoom to allow when panning on map
     */
    function Renderer(map, style, maxZoom) {
        this.map = map;
        this.geoFormat = new GeoJSON_1.default();
        this.maxZoom = maxZoom;
        var vectorSource = new Vector_2.default({
            features: [],
        });
        this.vectorLayer = new Vector_1.default({
            source: vectorSource,
            zIndex: 1,
        });
        this.vectorLayer.setStyle(style);
        this.map.addLayer(this.vectorLayer);
    }
    /**
     * Renders array of GeometryJSON objects
     * @param geometryList - array of geometry JSON
     */
    Renderer.prototype.renderList = function (geometryList) {
        for (var _i = 0, geometryList_1 = geometryList; _i < geometryList_1.length; _i++) {
            var geometry = geometryList_1[_i];
            this.addGeo(geometry);
        }
    };
    Renderer.prototype.makeGeometryFeature = function (geometry) {
        var buffered = utilities_1.makeBufferedGeo(geometry);
        return this.geoFormat.readFeature(buffered);
    };
    /**
     * Renders a GeometryJSON object
     * @param geometry - GeometryJSON object
     */
    Renderer.prototype.addGeo = function (geometry) {
        var feature = this.makeGeometryFeature(geometry);
        feature.setId(geometry.properties.id);
        // Note: In the future we may want to optimize performance
        // here by using feature ids to update only what has
        // changed and remove only what has been removed.
        this.vectorLayer.getSource().addFeature(feature);
    };
    /**
     * Removes all rendered geometry
     */
    Renderer.prototype.clearGeos = function () {
        this.vectorLayer.getSource().clear();
    };
    /**
     * Pans to GeometryJSON
     * @param geometry - GeometryJSON
     */
    Renderer.prototype.panToGeo = function (geometry) {
        this.panToExtent(this.getExtent(geometry));
    };
    /**
     * Pans to array of GeometryJSON
     * @param geometryList - array of geometry JSON
     */
    Renderer.prototype.panToGeoList = function (geometryList) {
        if (geometryList.length > 0) {
            this.panToExtent(utilities_1.combineExtents(geometryList.map(function (geometry) { return geometry.bbox; })));
        }
    };
    /**
     * Pans to extent
     * @param extent - Extent
     */
    Renderer.prototype.panToExtent = function (extent) {
        this.map.getView().fit(extent, {
            size: this.map.getSize(),
            duration: 500,
            maxZoom: this.maxZoom,
        });
    };
    Renderer.prototype.getExtent = function (geometry) {
        if (geometry.bbox) {
            return geometry.bbox;
        }
        else {
            var feature = this.geoFormat.readFeature(geometry);
            var featureGeometry = feature.getGeometry();
            return featureGeometry
                ? featureGeometry.getExtent()
                : [0, 0, 0, 0];
        }
    };
    /**
     * Resizes map after the map container has changed size
     */
    Renderer.prototype.resizeMap = function () {
        this.map.updateSize();
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=renderer.js.map