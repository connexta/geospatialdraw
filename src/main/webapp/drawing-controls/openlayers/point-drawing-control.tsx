import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../../shape-utils'

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

  protected makeEmptyFeature(): ol.Feature {
    return new ol.Feature(new ol.geom.Point([0, 0]))
  }
}

export default PointDrawingControl
