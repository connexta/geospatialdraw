import * as turf from '@turf/turf'
import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import Polygon from 'ol/geom/Polygon'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import CoordinateListDrawingControl from './coordinate-list-drawing-control'
import { Shape, POLYGON } from '../../shapes/shape'
import { abbreviateUnit } from '../../geometry/units'
import { optimizedUnitForLength } from '../../geometry/measurements'
import { getBufferPropOrDefault } from '../../geometry/utilities'
import {
  getDistanceFromMeters,
  getSquareDistanceFromMeters,
} from '../../internal/distance'

/**
 * Drawing Control for drawing a polygon on an Open Layers Map
 */
class PolygonDrawingControl extends CoordinateListDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return POLYGON
  }

  getGeoType(): GeometryType {
    return GeometryType.POLYGON
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(
      new Polygon([
        [
          [0, 0],
          [0, 0],
        ],
      ])
    )
  }

  protected updateLabel(feature: Feature): void {
    const geometry = feature.getGeometry()
    const coordinates: [number, number][] = geometry
      ? ((geometry as Polygon).getCoordinates()[0] as [number, number][])
      : []
    if (coordinates.length > 1) {
      const { unit: bufferUnit } = getBufferPropOrDefault(this.properties)
      const point = coordinates[coordinates.length - 2]
      const json = this.featureToGeo(feature)
      const lengthInBufferUnit = getDistanceFromMeters(
        turf.length(json),
        bufferUnit
      )
      const { unit, length } = optimizedUnitForLength({
        unit: bufferUnit,
        length: lengthInBufferUnit,
      })
      const area = getSquareDistanceFromMeters(turf.area(json), unit)
      const text = `${this.formatLabelNumber(length)} ${abbreviateUnit(
        unit
      )}\n ${this.formatLabelNumber(area)} ${abbreviateUnit(unit)}\xB2`
      this.context.updateLabel(point, text)
    }
  }
}

export default PolygonDrawingControl
