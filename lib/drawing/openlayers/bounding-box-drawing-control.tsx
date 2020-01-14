import Feature from 'ol/Feature'
import Style from 'ol/style/Style'
import ExtentInteraction, { Options } from 'ol/interaction/Extent'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import Interaction from 'ol/interaction/Interaction'
import GeometryType from 'ol/geom/GeometryType'
import Polygon from 'ol/geom/Polygon'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape, BOUNDING_BOX } from '../../shapes/shape'
import { GeometryJSON, Extent } from '../../geometry/geometry'

type ExtentEvent = {
  extent: Extent
}

type BBoxInteractionParams = Options & {
  setInputBlocked: (value: boolean) => void
}

class BBoxInteraction extends ExtentInteraction {
  private setInputBlocked: (value: boolean) => void

  constructor({ setInputBlocked, ...rest }: BBoxInteractionParams) {
    super(rest)
    this.setInputBlocked = setInputBlocked
  }

  handleUpEvent(e: MapBrowserEvent): boolean {
    this.setInputBlocked(false)
    return super.handleUpEvent(e)
  }
  handleDownEvent(e: MapBrowserEvent): boolean {
    this.setInputBlocked(true)
    return super.handleDownEvent(e)
  }
}

/**
 * Drawing Control for drawing a bounding box on an Open Layers Map
 */
class BoundingBoxDrawingControl extends BasicDrawingControl {
  private drawInteraction: BBoxInteraction | null
  private cachedGeo: GeometryJSON | null

  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.extentChanged = this.extentChanged.bind(this)
    this.setInputBlocked = this.setInputBlocked.bind(this)
    this.drawInteraction = null
    this.cachedGeo = null
  }

  protected setInputBlocked(value: boolean): void {
    const oldValue = this.inputBlocked
    this.inputBlocked = value
    if (oldValue && !value && this.cachedGeo !== null) {
      this.receiver(this.cachedGeo)
      this.cachedGeo = null
    }
  }

  getGeoType(): GeometryType {
    return GeometryType.POLYGON
  }

  getShape(): Shape {
    return BOUNDING_BOX
  }

  getDefaultStaticStyle(): Style | Style[] {
    const feature = new Feature(
      new Polygon([
        [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ])
    )
    this.applyPropertiesToFeature(feature)
    const style = this.context.getStyle()
    if (typeof style === 'function') {
      return style(feature, 1)
    } else {
      return style
    }
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const feature = this.geoFormat.readFeature(geoJSON)
    const geometry = feature.getGeometry()
    if (geometry) {
      const extent = geometry.getExtent()
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
      const style = this.getDefaultStaticStyle()
      const drawInteraction = new BBoxInteraction({
        extent,
        pointerStyle: style,
        boxStyle: style,
        setInputBlocked: this.setInputBlocked,
      })
      this.startDrawingInteraction(drawInteraction)
    }
  }

  startDrawing(): void {
    this.context.removeFeature()
    const style = this.getDefaultStaticStyle()
    this.drawInteraction = new BBoxInteraction({
      pointerStyle: style,
      boxStyle: style,
      setInputBlocked: this.setInputBlocked,
    })
    this.startDrawingInteraction(this.drawInteraction)
  }

  private startDrawingInteraction(drawInteraction: Interaction): void {
    this.drawingActive = true
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'extentchanged', this.extentChanged)
    this.context.addInteractionsWithoutModify()
  }

  extentChanged(e: ExtentEvent): void {
    if (e.extent !== null) {
      const geoJSON = this.extentToGeoJSON(e.extent)
      const feature = this.geoFormat.readFeature(geoJSON)
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
      this.cachedGeo = geoJSON
    }
  }

  extentToGeoJSON(bbox: Extent): GeometryJSON {
    const bboxPolygon = turf.bboxPolygon(bbox)
    return {
      bbox,
      type: 'Feature',
      properties: {
        ...this.properties,
        shape: this.getShape(),
      },
      geometry: bboxPolygon.geometry as turf.Polygon,
    }
  }
}

export default BoundingBoxDrawingControl
