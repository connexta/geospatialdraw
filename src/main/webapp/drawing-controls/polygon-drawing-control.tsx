import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a polygon
 */
class PolygonDrawingControl extends ModifiableDrawingControl {
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Polygon'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Polygon'
  }
}

export default PolygonDrawingControl
