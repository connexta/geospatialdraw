import * as turf from '@turf/turf'
import Feature from 'ol/Feature'
import { DrawEvent } from 'ol/interaction/Draw'
import { ModifyEvent } from 'ol/interaction/Modify'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'

export const LAST_INDEX = Number.MAX_SAFE_INTEGER

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
    this.startDrawAnimation(e.feature, LAST_INDEX)
  }

  onCompleteDrawing(e: DrawEvent) {
    this.stopDrawAnimation()
    super.onCompleteDrawing(e)
  }

  onStartModify(e: ModifyEvent) {
    const feature = e.features.getArray()[0]
    const pointIndex = this.getClosestPointIndex(
      feature,
      e.mapBrowserEvent.coordinate as [number, number]
    )
    super.onStartModify(e)
    this.startDrawAnimation(feature, pointIndex)
  }

  onCompleteModify(e: ModifyEvent) {
    this.stopDrawAnimation()
    super.onCompleteModify(e)
  }

  private startDrawAnimation(feature: Feature, pointIndex: number) {
    let revision = feature.getRevision()
    let coordinatesLength = this.getFeatureCoordinates(feature).length
    this.animationFrame = () => {
      const update = feature.getRevision()
      if (update !== revision) {
        const updatedLength = this.getFeatureCoordinates(feature).length
        if (coordinatesLength !== updatedLength) {
          pointIndex
        }
        this.updateLabelAtPoint(feature, pointIndex)
      }
      this.animationFrameId = requestAnimationFrame(this.animationFrame)
    }
    this.animationFrame()
  }

  private stopDrawAnimation(): void {
    cancelAnimationFrame(this.animationFrameId)
  }

  protected updateLabel(feature: Feature): void {
    this.updateLabelAtPoint(feature, LAST_INDEX)
  }

  protected abstract getFeatureCoordinates(feature: Feature): [number, number][]

  protected abstract updateLabelAtPoint(
    feature: Feature,
    pointIndex: number
  ): void

  protected getClosestPointIndex(
    feature: Feature,
    point: [number, number]
  ): number {
    const coordinates = this.getFeatureCoordinates(feature)
    if (coordinates.length > 0) {
      const distanceMap = coordinates
        .map((c, index) => ({ distance: turf.distance(point, c), index }))
        .sort((a, b) => a.distance - b.distance)
      return distanceMap[0].index
    } else {
      return -1
    }
  }

  protected getPointAtIndex(feature: Feature, index: number): [number, number] {
    const coordinates = this.getFeatureCoordinates(feature)
    if (index === LAST_INDEX) {
      index = coordinates.length - 1
    } else if (index < 0 || index >= coordinates.length) {
      throw new Error(
        `Invalid index ${index} into coordinates for feature ${feature}`
      )
    }
    return coordinates[index]
  }
}

export default CoordinateListDrawingControl
