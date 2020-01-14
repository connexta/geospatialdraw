import Feature from 'ol/Feature'
import GeometryType from 'ol/geom/GeometryType'
import Polygon from 'ol/geom/Polygon'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape, POLYGON } from '../../shapes/shape'

/**
 * Drawing Control for drawing a polygon on an Open Layers Map
 */
class PolygonDrawingControl extends ModifiableDrawingControl {
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
}

export default PolygonDrawingControl
