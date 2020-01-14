import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import LineString from 'ol/geom/LineString'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape, LINE } from '../../shapes/shape'

/**
 * Drawing Control for drawing a line on an Open Layers Map
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
    return LINE
  }

  getGeoType(): GeometryType {
    return GeometryType.LINE_STRING
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(new LineString([[0, 0]]))
  }
}

export default LineDrawingControl
