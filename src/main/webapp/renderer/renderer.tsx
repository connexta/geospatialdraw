import * as ol from 'openlayers'
import { GeometryJSON, Extent } from '../geometry'
import { makeBufferedGeo } from '../geometry'

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

  /**
   * Renders array of GeometryJSON objects
   * @param geometryList - array of geometry JSON
   */
  renderList(geometryList: GeometryJSON[]): void {
    for (const geometry of geometryList) {
      this.addGeo(geometry)
    }
  }

  private makeGeometryFeature(geometry: GeometryJSON): ol.Feature {
    const buffered = makeBufferedGeo(geometry)
    return this.geoFormat.readFeature(buffered)
  }

  /**
   * Renders a GeometryJSON object
   * @param geometry - GeometryJSON object
   */
  addGeo(geometry: GeometryJSON): void {
    const feature = this.makeGeometryFeature(geometry)
    feature.setId(geometry.properties.id)
    // Note: In the future we may want to optimize performance
    // here by using feature ids to update only what has
    // changed and remove only what has been removed.
    this.vectorLayer.getSource().addFeature(feature)
  }

  /**
   * Removes all rendered geometry
   */
  clearGeos(): void {
    this.vectorLayer.getSource().clear()
  }

  /**
   * Pans to GeometryJSON
   * @param geometry - GeometryJSON
   */
  panToGeo(geometry: GeometryJSON) {
    this.panToExtent(this.getExtent(geometry))
  }

  /**
   * Pans to array of GeometryJSON
   * @param geometryList - array of geometry JSON
   */
  panToGeoList(geometryList: GeometryJSON[]) {
    if (geometryList.length > 0) {
      let minX = Number.MAX_SAFE_INTEGER
      let minY = Number.MAX_SAFE_INTEGER
      let maxX = Number.MIN_SAFE_INTEGER
      let maxY = Number.MIN_SAFE_INTEGER
      geometryList.forEach((geometry: GeometryJSON) => {
        const extent = this.getExtent(geometry)
        minX = Math.min(minX, extent[0])
        minY = Math.min(minY, extent[1])
        maxX = Math.max(maxX, extent[2])
        maxY = Math.max(maxY, extent[3])
      })
      this.panToExtent([minX, minY, maxX, maxY])
    }
  }

  /**
   * Pans to extent
   * @param extent - Extent
   */
  panToExtent(extent: Extent) {
    this.map.getView().fit(extent, {
      size: this.map.getSize(),
      duration: 500,
      maxZoom: this.maxZoom,
    })
  }

  private getExtent(geometry: GeometryJSON): Extent {
    if (geometry.bbox) {
      return geometry.bbox
    } else {
      const feature = this.geoFormat.readFeature(geometry)
      return feature.getGeometry().getExtent()
    }
  }

  /**
   * Resizes map after the map container has changed size
   */
  resizeMap() {
    this.map.updateSize()
  }
}

export default Renderer
