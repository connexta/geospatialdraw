import DrawingToolbox from './drawing-toolbox'
import DrawingControl from './drawing-control'
import { Shape } from '../shape-utils'
import UpdatedGeoReceiver from './geo-receiver'

type DrawingControlMap = Map<Shape, DrawingControl>

class BasicDrawingToolbox implements DrawingToolbox {
  protected toolbox: DrawingControlMap
  protected listener: UpdatedGeoReceiver | null
  protected toolboxListener: UpdatedGeoReceiver

  constructor() {
    this.listener = null
    this.toolboxListener = geo => {
      if (this.listener !== null) {
        this.listener(geo)
      }
    }
    this.toolbox = new Map<Shape, DrawingControl>()
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

export default BasicDrawingToolbox
