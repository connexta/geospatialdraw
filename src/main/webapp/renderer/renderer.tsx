import * as ol from 'openlayers'
import { GeometryJSON, Extent } from '../geometry'
import { makeBufferedGeo } from '../geometry'

/**
 * Object containing a GeometryJSON object
 */
type Renderable = {
  /**
   * GeometryJSON object to render on map
   */
  geo: GeometryJSON
}

/**
 * Renders Renderable objects on an Open Layers Map
 */
class Renderer {
  private map: ol.Map
  private vectorLayer: ol.layer.Vector
  private geoFormat: ol.format.GeoJSON
  private maxZoom: number

  /**
   * Constructs renderer
   * @param map - Open Layers map to render to
   * @param style - style to apply to rendered geometries
   * @param maxZoom - maximum zoom to allow when panning on map
   */
  constructor(
    map: ol.Map,
    style: ol.style.Style | ol.StyleFunction | ol.style.Style[],
    maxZoom: number
  ) {
    this.map = map
    this.geoFormat = new ol.format.GeoJSON()
    this.maxZoom = maxZoom
    const vectorSource = new ol.source.Vector({
      features: [],
    })
    this.vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      zIndex: 1,
    })
    this.vectorLayer.setStyle(style)
    this.map.addLayer(this.vectorLayer)
  }

  // TODO continue documenting

  renderList(geometryList: Renderable[]): void {
    for (const geometry of geometryList) {
      this.addGeo(geometry)
    }
  }
  makeGeometryFeature(geometry: Renderable): ol.Feature {
    const buffered = makeBufferedGeo(geometry.geo)
    return this.geoFormat.readFeature(buffered)
  }
  addGeo(geometry: Renderable): void {
    const feature = this.makeGeometryFeature(geometry)
    feature.setId(geometry.geo.properties.id)
    // Note: In the future we may want to optimize performance
    // here by using feature ids to update only what has
    // changed and remove only what has been removed.
    this.vectorLayer.getSource().addFeature(feature)
  }
  clearGeos(): void {
    this.vectorLayer.getSource().clear()
  }
  panToGeo(geometry: Renderable) {
    this.panToExtent(this.getExtent(geometry))
  }
  panToGeoList(geometryList: Renderable[]) {
    if (geometryList.length > 0) {
      let minX = Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxX = Number.MIN_SAFE_INTEGER
      let maxY = Number.MIN_SAFE_INTEGER
      geometryList.forEach((geometry: Renderable) => {
        const extent = this.getExtent(geometry)
        minX = Math.min(minX, extent[0])
        minY = Math.min(minY, extent[1])
        maxX = Math.max(maxX, extent[2])
        maxY = Math.max(maxY, extent[3])
      })
      this.panToExtent([minX, minY, maxX, maxY])
    }
  }
  panToExtent(extent: Extent) {
    this.map.getView().fit(extent, {
      size: this.map.getSize(),
      duration: 500,
      maxZoom: this.maxZoom,
    })
  }
  protected getExtent(geometry: Renderable): Extent {
    if (geometry.geo.bbox) {
      return geometry.geo.bbox
    } else {
      const feature = this.geoFormat.readFeature(geometry.geo)
      return feature.getGeometry().getExtent()
    }
  }
  resizeMap() {
    this.map.updateSize()
  }
}

export default Renderer
