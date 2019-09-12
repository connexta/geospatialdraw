import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a point
 */
class PointDrawingControl extends ModifiableDrawingControl {
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Point'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Point'
  }

  cancelDrawing() {
    // the snap interaction breaks after using point drawing
    this.context.remakeInteractions()
    super.cancelDrawing()
  }
}

export default PointDrawingControl
