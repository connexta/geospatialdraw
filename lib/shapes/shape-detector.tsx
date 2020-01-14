import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import GeometryType from 'ol/geom/GeometryType'
import GeoJSON from 'ol/format/GeoJSON'
import * as turf from '@turf/turf'
import { GeometryJSON, Extent } from '../geometry/geometry'
import {
  Shape,
  LINE,
  POLYGON,
  BOUNDING_BOX,
  POINT_RADIUS,
  POINT,
} from './shape'

/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
class ShapeDetector {
  private geoFormat: GeoJSON

  /**
   * Constructs an instance of the ShapeDetector
   */
  constructor() {
    this.geoFormat = new GeoJSON()
  }

  /**
   * Gets the shape of GeometryJSON object
   * @param geoJSON - GeometryJSON object
   * @returns Shape of geometry
   */
  shapeFromGeoJSON(geoJSON: GeometryJSON): Shape {
    const feature = this.geoFormat.readFeature(geoJSON)
    return this.shapeFromFeature(feature)
  }

  /**
   * Gets the shape of an Open Layers feature
   * @param feature - Open Layers feature
   * @returns Shape of geometry
   */
  shapeFromFeature(feature: Feature): Shape {
    if (this.isLineFeature(feature)) {
      return LINE
    } else if (this.isBoundingBoxFeature(feature)) {
      return BOUNDING_BOX
    } else if (this.isPointFeature(feature)) {
      return POINT
    } else if (this.isPointRadiusFeature(feature)) {
      return POINT_RADIUS
    } else {
      return POLYGON
    }
  }

  private getGeometryType(feature: Feature): GeometryType {
    const geometry = feature.getGeometry()
    return geometry ? geometry.getType() : GeometryType.POLYGON
  }

  private getFeatureBufferWidth(feature: Feature): number {
    return (feature.get('buffer') || { width: 0 }).width
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a line
   */
  isLineFeature(feature: Feature): boolean {
    return this.getGeometryType(feature) === GeometryType.LINE_STRING
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a point
   */
  isPointFeature(feature: Feature): boolean {
    return (
      this.getGeometryType(feature) === GeometryType.POINT &&
      this.getFeatureBufferWidth(feature) <= 0
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a bounding box
   */
  isBoundingBoxFeature(feature: Feature): boolean {
    if (!this.isPolygonFeature(feature)) {
      return false
    } else {
      const coordinates = (feature.getGeometry() as Polygon).getCoordinates()[0] as [
        number,
        number
      ][]
      const geometry = feature.getGeometry()
      const extent: Extent = geometry
        ? (geometry.getExtent() as Extent)
        : [0, 0, 0, 0]
      const expectedCoordinates = (turf.bboxPolygon(extent)
        .geometry as turf.Polygon).coordinates[0] as [number, number][]
      return (
        coordinates.length === 5 &&
        expectedCoordinates.every(expectedPoint =>
          coordinates.some(
            point =>
              point[0] === expectedPoint[0] && point[1] === expectedPoint[1]
          )
        )
      )
    }
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a point radius
   */
  isPointRadiusFeature(feature: Feature): boolean {
    return (
      this.getGeometryType(feature) === GeometryType.POINT &&
      this.getFeatureBufferWidth(feature) > 0
    )
  }

  /**
   * Checks if feature matches shape
   * @param feature - Open Layers feature
   * @returns true if geometry is a polygon
   */
  isPolygonFeature(feature: Feature): boolean {
    return this.getGeometryType(feature) === GeometryType.POLYGON
  }
}

export default ShapeDetector
