import * as turf from '@turf/turf'
import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import LineString from 'ol/geom/LineString'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import CoordinateListDrawingControl from './coordinate-list-drawing-control'
import { Shape, LINE } from '../../shapes/shape'
import { abbreviateUnit } from '../../geometry/units'
import { optimizedUnitForLength } from '../../geometry/measurements'
import { getBufferPropOrDefault } from '../../geometry/utilities'
import { getDistanceFromMeters } from '../../internal/distance'

/**
 * Drawing Control for drawing a line on an Open Layers Map
 */
class LineDrawingControl extends CoordinateListDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return LINE
  }

  getGeoType(): GeometryType {
    return GeometryType.LINE_STRING
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(new LineString([[0, 0]]))
  }

  protected updateLabel(feature: Feature): void {
    const geometry = feature.getGeometry()
    const coordinates: [number, number][] = geometry
      ? ((geometry as LineString).getCoordinates() as [number, number][])
      : []
    if (coordinates.length > 0) {
      const { unit: bufferUnit } = getBufferPropOrDefault(this.properties)
      const point = coordinates[coordinates.length - 1]
      const json = this.featureToGeo(feature)
      const lengthInBufferUnit = getDistanceFromMeters(
        turf.length(json),
        bufferUnit
      )
      const { unit, length } = optimizedUnitForLength({
        unit: bufferUnit,
        length: lengthInBufferUnit,
      })
      const text = `${this.formatLabelNumber(length)} ${abbreviateUnit(unit)}`
      this.context.updateLabel(point, text)
    }
  }
}

export default LineDrawingControl
