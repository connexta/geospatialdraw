import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a line
 */
class LineDrawingControl extends ModifiableDrawingControl {
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Line'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'LineString'
  }
}

export default LineDrawingControl
