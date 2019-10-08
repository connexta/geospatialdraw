import * as ol from 'openlayers'
import DrawingToolbox from '../drawing-toolbox'
import DrawingControl from '../drawing-control'
import { Shape } from '../../shape-utils'
import BoundingBoxDrawingControl from './bounding-box-drawing-control'
import LineDrawingControl from './line-drawing-control'
import PointDrawingControl from './point-drawing-control'
import PointRadiusDrawingControl from './point-radius-drawing-control'
import PolygonDrawingControl from './polygon-drawing-control'
import UpdatedGeoReceiver from '../geo-receiver'
import DrawingContext from './drawing-context'

type DrawingControlMap = Map<Shape, DrawingControl>

/**
 * Open Layers drawing toolbox
 */
class OpenLayersDrawingToolbox implements DrawingToolbox {
  private drawingContext: DrawingContext
  private toolbox: DrawingControlMap
  private listener: UpdatedGeoReceiver | null
  private toolboxListener: UpdatedGeoReceiver

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
    this.drawingContext = new DrawingContext({ map, drawingStyle })
    this.listener = null
    this.toolboxListener = geo => {
      if (this.listener !== null) {
        this.listener(geo)
      }
    }
    this.toolbox = new Map<Shape, DrawingControl>()
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

  getToolForShape(shape: Shape): DrawingControl {
    if (this.toolbox.has(shape)) {
      // @ts-ignore already calls has() so undefined is not possible here
      return this.toolbox.get(shape)
    } else {
      throw new Error(`Invalid shape "${shape}"!`)
    }
  }

  getToolsList(): DrawingControl[] {
    return Array.from(this.toolbox.values())
  }

  setListener(listener: UpdatedGeoReceiver) {
    this.listener = listener
  }

  removeListener() {
    this.listener = null
  }
}

export default OpenLayersDrawingToolbox
