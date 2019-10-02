import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a line
 */
class LineDrawingControl extends ModifiableDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Line'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'LineString'
  }

  protected makeEmptyFeature(): ol.Feature {
    return new ol.Feature(new ol.geom.LineString([[0, 0]]))
  }
}

export default LineDrawingControl
