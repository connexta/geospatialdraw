import Feature from 'ol/Feature'
import { DrawEvent } from 'ol/interaction/Draw'
import { ModifyEvent } from 'ol/interaction/Modify'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'

/**
 * Drawing Control for shapes that contain a list of coordinates on an Open Layers Map
 */
abstract class CoordinateListDrawingControl extends ModifiableDrawingControl {
  private animationFrameId: number
  private animationFrame: () => void

  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.animationFrameId = 0
    this.animationFrame = () => {}
  }

  onStartDrawing(e: DrawEvent) {
    super.onStartDrawing(e)
    this.startDrawAnimation(e.feature)
  }

  onCompleteDrawing(e: DrawEvent) {
    this.stopDrawAnimation()
    super.onCompleteDrawing(e)
  }

  onStartModify(e: ModifyEvent) {
    super.onStartModify(e)
    this.startDrawAnimation(e.features.getArray()[0])
  }

  onCompleteModify(e: ModifyEvent) {
    this.stopDrawAnimation()
    super.onCompleteModify(e)
  }

  private startDrawAnimation(feature: Feature) {
    let revision = feature.getRevision()
    this.animationFrame = () => {
      const update = feature.getRevision()
      if (update !== revision) {
        this.updateLabel(feature)
      }
      this.animationFrameId = requestAnimationFrame(this.animationFrame)
    }
    this.animationFrame()
  }

  private stopDrawAnimation(): void {
    cancelAnimationFrame(this.animationFrameId)
  }
}

export default CoordinateListDrawingControl
