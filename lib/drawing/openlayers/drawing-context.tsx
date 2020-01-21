import Map from 'ol/Map'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import Vector from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Snap from 'ol/interaction/Snap'
import Modify from 'ol/interaction/Modify'
import Interaction from 'ol/interaction/Interaction'
import { StyleLike } from 'ol/style/Style'
import GeoJSON from 'ol/format/GeoJSON'
import {
  GeometryJSON,
  HIDDEN_CLASSNAME,
  LABEL_CLASSNAME,
} from '../../geometry/geometry'
import { makeBufferedGeo } from '../../geometry/utilities'

type EventHandler = (e: any) => void

type ListenerTarget = 'draw' | 'snap' | 'modify' | 'map'

type ListenerRecord = {
  target: ListenerTarget
  event: string
  handler: EventHandler
}

/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
class DrawingContext {
  private map: Map
  private drawLayer: Vector
  private labelFeature: Feature
  private bufferLayer: Vector
  private modify: Modify
  private snap: Snap
  private draw: Interaction | null
  private listenerList: ListenerRecord[]
  private style: StyleLike
  private geoFormat: GeoJSON
  private animationFrameId: number

  /**
   * Constructs an instance of the drawing context
   * @param map - reference to openlayers map
   * @param drawingStyle - drawingStyle to be used by all drawing controls
   */
  constructor({ map, drawingStyle }: { map: Map; drawingStyle: StyleLike }) {
    this.bufferUpdateEvent = this.bufferUpdateEvent.bind(this)
    this.animationFrameId = 0
    this.geoFormat = new GeoJSON()
    this.style = drawingStyle
    this.draw = null
    this.listenerList = []
    this.map = map
    this.drawLayer = new Vector({
      source: new VectorSource(),
      style: drawingStyle,
      zIndex: 2,
      updateWhileInteracting: true,
    })
    const labelLayer = new Vector({
      source: new VectorSource(),
      style: drawingStyle,
      zIndex: 3,
    })
    this.bufferLayer = new Vector({
      source: new VectorSource(),
      style: drawingStyle,
      zIndex: 1,
    })
    this.map.addLayer(labelLayer)
    this.map.addLayer(this.bufferLayer)
    this.map.addLayer(this.drawLayer)
    this.modify = new Modify({
      source: this.drawLayer.getSource(),
    })
    this.snap = new Snap({
      source: this.drawLayer.getSource(),
    })
    this.labelFeature = new Feature({
      geometry: new Point([0, 0]),
      class: [HIDDEN_CLASSNAME, LABEL_CLASSNAME],
      text: '',
    })
    labelLayer.getSource().addFeature(this.labelFeature)
  }

  getStyle(): StyleLike {
    return this.style
  }

  removeFeature(): void {
    this.drawLayer.getSource().clear()
  }

  updateFeature(feature: Feature): void {
    this.removeFeature()
    this.drawLayer.getSource().addFeature(feature)
  }

  hideLabel(): void {
    this.labelFeature.set('class', [HIDDEN_CLASSNAME, LABEL_CLASSNAME])
  }

  updateLabel(coordinates: [number, number], text: string): void {
    const point = this.labelFeature.getGeometry() as Point
    point.setCoordinates(coordinates)
    this.labelFeature.set('text', text)
    this.labelFeature.set('class', [LABEL_CLASSNAME])
  }

  updateBufferFeature(feature: Feature, animate: boolean = true): void {
    this.bufferLayer.getSource().clear()
    const { width } = feature.get('buffer') || { width: 0 }
    if (width > 0) {
      const geo: GeometryJSON = JSON.parse(this.geoFormat.writeFeature(feature))
      const bufferedGeo = makeBufferedGeo(geo)
      const bufferFeature = this.geoFormat.readFeature(bufferedGeo)
      this.bufferLayer.getSource().addFeature(bufferFeature)
      if (animate) {
        this.setEvent('map', 'pointerdrag', this.bufferUpdateEvent)
      }
    }
  }

  protected bufferUpdateEvent() {
    const featureList = this.drawLayer.getSource().getFeatures()
    if (featureList.length) {
      const feature = featureList[0]
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateBufferFeature(feature)
      })
    }
  }

  setModifyInteraction(modify: Modify): void {
    this.modify = modify
  }

  getSource(): VectorSource {
    return this.drawLayer.getSource()
  }

  setDrawInteraction(draw: Interaction): void {
    this.draw = draw
  }

  setEvent(target: ListenerTarget, event: string, handler: EventHandler): void {
    const listenerTarget = this[target]
    if (listenerTarget !== null) {
      listenerTarget.on(event, handler)
      this.listenerList.push({
        target,
        event,
        handler,
      })
    }
  }

  removeListener(
    target: ListenerTarget,
    event: string,
    handler: EventHandler
  ): void {
    if (target === 'map') {
      this.map.un(event, handler)
    } else {
      const listenerTarget = this[target]
      if (listenerTarget !== null) {
        listenerTarget.un(event, handler)
      }
    }
  }

  removeListeners(): void {
    for (const listener of this.listenerList) {
      this.removeListener(listener.target, listener.event, listener.handler)
    }
    this.listenerList = []
    cancelAnimationFrame(this.animationFrameId)
  }

  addInteractions(): void {
    if (this.draw !== null) {
      this.map.addInteraction(this.draw)
    }
    this.map.addInteraction(this.snap)
    this.map.addInteraction(this.modify)
  }

  addInteractionsWithoutModify(): void {
    if (this.draw !== null) {
      this.map.addInteraction(this.draw)
    }
    this.map.addInteraction(this.snap)
  }

  removeInteractions(): void {
    this.map.removeInteraction(this.modify)
    this.map.removeInteraction(this.snap)
    if (this.draw !== null) {
      this.map.removeInteraction(this.draw)
    }
    this.drawLayer.getSource().clear()
    this.bufferLayer.getSource().clear()
  }

  remakeInteractions(): void {
    this.modify = new Modify({
      source: this.drawLayer.getSource(),
    })
    this.snap = new Snap({
      source: this.drawLayer.getSource(),
    })
  }

  circleRadiusToMeters(radius: number): number {
    const conversionRate: number =
      this.map
        .getView()
        .getProjection()
        .getMetersPerUnit() || 1
    return radius * conversionRate
  }
}

export default DrawingContext
