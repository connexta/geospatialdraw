import Feature from 'ol/Feature'
import Draw, { DrawEvent } from 'ol/interaction/Draw'
import { ModifyEvent } from 'ol/interaction/Modify'
import Interaction from 'ol/interaction/Interaction'
import Style from 'ol/style/Style'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { GeometryJSON } from '../../geometry/geometry'

abstract class ModifiableDrawingControl extends BasicDrawingControl {
  protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.onStartDrawing = this.onStartDrawing.bind(this)
    this.onCompleteDrawing = this.onCompleteDrawing.bind(this)
    this.onStartModify = this.onStartModify.bind(this)
    this.onCompleteModify = this.onCompleteModify.bind(this)
  }

  onStartDrawing(_e: DrawEvent) {
    this.inputBlocked = true
  }

  onCompleteDrawing(e: DrawEvent) {
    const geoJSON = this.writeExtendedGeoJSON(e.feature)
    this.inputBlocked = false
    const feature = this.makeFeature(geoJSON)
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    this.receiver(geoJSON)
  }

  onStartModify(_e: ModifyEvent) {
    this.inputBlocked = true
  }

  onCompleteModify(e: ModifyEvent) {
    this.inputBlocked = false
    this.context.updateBufferFeature(e.features.getArray()[0])
    const geoJSON = this.writeExtendedGeoJSON(e.features.getArray()[0])
    this.receiver(geoJSON)
  }

  makeFeature(geoJSON: GeometryJSON): Feature {
    const feature = this.geoFormat.readFeature(geoJSON)
    const geometry = feature.getGeometry()
    if (geometry && geometry.getType() !== this.getGeoType()) {
      throw new Error(
        `Wrong geometry type! expected ${this.getGeoType()} but got ${geometry.getType()} instead.`
      )
    }
    return feature
  }

  getStaticStyle(feature: Feature): Style | Style[] {
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(feature, 1)
    } else {
      return style
    }
  }

  protected abstract makeEmptyFeature(): Feature

  getDefaultStaticStyle(): Style | Style[] {
    const feature = this.makeEmptyFeature()
    this.applyPropertiesToFeature(feature)
    return this.getStaticStyle(feature)
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const feature = this.makeFeature(geoJSON)
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    this.updateLabel(feature)
    const drawInteraction = new Draw({
      type: this.getGeoType(),
      style: this.getStaticStyle(feature),
    })
    this.startDrawingInteraction(drawInteraction)
  }

  startDrawing(): void {
    this.context.removeFeature()
    const drawInteraction = new Draw({
      type: this.getGeoType(),
      style: this.getDefaultStaticStyle(),
    })
    this.startDrawingInteraction(drawInteraction)
  }

  private startDrawingInteraction(drawInteraction: Interaction): void {
    this.drawingActive = true
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'drawend', this.onCompleteDrawing)
    this.context.setEvent('draw', 'drawstart', this.onStartDrawing)
    this.context.setEvent('modify', 'modifyend', this.onCompleteModify)
    this.context.setEvent('modify', 'modifystart', this.onStartModify)
    this.context.addInteractions()
  }

  protected abstract updateLabel(feature: Feature): void
}

export default ModifiableDrawingControl
