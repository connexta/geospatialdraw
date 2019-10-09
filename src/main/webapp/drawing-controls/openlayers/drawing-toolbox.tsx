import * as ol from 'openlayers'
import BoundingBoxDrawingControl from './bounding-box-drawing-control'
import LineDrawingControl from './line-drawing-control'
import PointDrawingControl from './point-drawing-control'
import PointRadiusDrawingControl from './point-radius-drawing-control'
import PolygonDrawingControl from './polygon-drawing-control'
import DrawingContext from './drawing-context'
import BasicDrawingToolbox from '../basic-drawing-toolbox'

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
  constructor({
    map,
    drawingStyle,
  }: {
    map: ol.Map
    drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[]
  }) {
    super()
    this.drawingContext = new DrawingContext({ map, drawingStyle })
    this.toolbox.set(
      'Polygon',
      new PolygonDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      'Line',
      new LineDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      'Point Radius',
      new PointRadiusDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      'Point',
      new PointDrawingControl(this.drawingContext, this.toolboxListener)
    )
    this.toolbox.set(
      'Bounding Box',
      new BoundingBoxDrawingControl(this.drawingContext, this.toolboxListener)
    )
  }
}

export default OpenLayersDrawingToolbox
