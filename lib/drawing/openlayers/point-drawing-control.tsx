import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import Point from 'ol/geom/Point'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape, POINT } from '../../shapes/shape'

/**
 * Drawing Control for drawing a point on an Open Layers Map
 */
class PointDrawingControl extends ModifiableDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return POINT
  }

  getGeoType(): GeometryType {
    return GeometryType.POINT
  }

  cancelDrawing() {
    // the snap interaction breaks after using point drawing
    this.context.remakeInteractions()
    super.cancelDrawing()
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(new Point([0, 0]))
  }
}

export default PointDrawingControl
