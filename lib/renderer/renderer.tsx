import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Vector from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { GeometryJSON, Extent } from '../geometry/geometry'
import { makeBufferedGeo, combineExtents } from '../geometry/utilities'
import { StyleLike } from 'ol/style/Style'

/**
 * Renders Renderable objects on an Open Layers Map
 */
class Renderer {
  private map: Map
  private vectorLayer: Vector
  private geoFormat: GeoJSON
  private maxZoom: number

  /**
   * Constructs renderer
   * @param map - Open Layers map to render to
   * @param style - style to apply to rendered geometries
   * @param maxZoom - maximum zoom to allow when panning on map
   */
  constructor(map: Map, style: StyleLike, maxZoom: number) {
    this.map = map
    this.geoFormat = new GeoJSON()
    this.maxZoom = maxZoom
    const vectorSource = new VectorSource({
      features: [],
    })
    this.vectorLayer = new Vector({
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

  private makeGeometryFeature(geometry: GeometryJSON): Feature {
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
      this.panToExtent(
        combineExtents(geometryList.map(geometry => geometry.bbox))
      )
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
      const featureGeometry = feature.getGeometry()
      return featureGeometry
        ? (featureGeometry.getExtent() as Extent)
        : [0, 0, 0, 0]
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
