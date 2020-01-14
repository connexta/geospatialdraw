import Map from 'ol/Map'
import { StyleLike } from 'ol/style/Style'
import BoundingBoxDrawingControl from './bounding-box-drawing-control'
import LineDrawingControl from './line-drawing-control'
import PointDrawingControl from './point-drawing-control'
import PointRadiusDrawingControl from './point-radius-drawing-control'
import PolygonDrawingControl from './polygon-drawing-control'
import DrawingContext from './drawing-context'
import BasicDrawingToolbox from '../basic-drawing-toolbox'
import {
  POLYGON,
  LINE,
  BOUNDING_BOX,
  POINT,
  POINT_RADIUS,
} from '../../shapes/shape'

/**
 * Open Layers drawing toolbox
 */
class OpenLayersDrawingToolbox extends BasicDrawingToolbox {
  private drawingContext: DrawingContext

  /**
   * Constructs an instance of Open Layers drawing toolbox
   * @param map - reference to openlayers map
   * @param drawingStyle - drawingStyle to be used by all drawing controls
   */
  constructor({ map, drawingStyle }: { map: Map; drawingStyle: StyleLike }) {
    super()
    this.drawingContext = new DrawingContext({ map, drawingStyle })
    this.toolbox.set(
      POLYGON,
      new PolygonDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      LINE,
      new LineDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      POINT_RADIUS,
      new PointRadiusDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      POINT,
      new PointDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      BOUNDING_BOX,
      new BoundingBoxDrawingControl(this.drawingContext, this.toolboxListener)
    )
  }
}

export default OpenLayersDrawingToolbox
