import * as ol from 'openlayers';
import { GeometryJSON, Extent } from '../geometry';
/**
 * Object containing a GeometryJSON object
 */
declare type Renderable = {
    /**
     * GeometryJSON object to render on map
     */
    geo: GeometryJSON;
};
/**
 * Renders Renderable objects on an Open Layers Map
 */
declare class Renderer {
    private map;
    private vectorLayer;
    private geoFormat;
    private maxZoom;
    /**
     * Constructs renderer
     * @param map - Open Layers map to render to
     * @param style - style to apply to rendered geometries
     * @param maxZoom - maximum zoom to allow when panning on map
     */
    constructor(map: ol.Map, style: ol.style.Style | ol.StyleFunction | ol.style.Style[], maxZoom: number);
    renderList(geometryList: Renderable[]): void;
    makeGeometryFeature(geometry: Renderable): ol.Feature;
    addGeo(geometry: Renderable): void;
    clearGeos(): void;
    panToGeo(geometry: Renderable): void;
    panToGeoList(geometryList: Renderable[]): void;
    panToExtent(extent: Extent): void;
    protected getExtent(geometry: Renderable): Extent;
    resizeMap(): void;
}
export default Renderer;
