import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import GeometryType from 'ol/geom/GeometryType'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import DrawingControl from '../drawing-control'
import { Shape } from '../../shapes/shape'
import { GeometryJSON, GeometryJSONProperties } from '../../geometry/geometry'
import { formatNumber } from '../../geometry/measurements'
import {
  makeBufferedGeo,
  makeEmptyGeometry,
  geoToExtent,
} from '../../geometry/utilities'
import { METERS } from '../../geometry/units'

type GeoProps = GeometryJSONProperties & {
  [index: string]: any
}

abstract class BasicDrawingControl implements DrawingControl {
  protected context: DrawingContext
  protected receiver: UpdatedGeoReceiver
  protected geoFormat: GeoJSON
  protected inputBlocked: boolean
  protected drawingActive: boolean
  protected properties: GeoProps

  abstract setGeo(geoJSON: GeometryJSON): void

  abstract startDrawing(): void

  abstract getShape(): Shape

  protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    this.context = context
    this.receiver = receiver
    this.geoFormat = new GeoJSON()
    this.inputBlocked = false
    this.drawingActive = false
    this.setProperties(makeEmptyGeometry('', this.getShape()).properties)
  }

  setProperties(properties: GeoProps): void {
    this.properties = {
      id: '',
      color: '',
      buffer: {
        width: 0,
        unit: METERS,
      },
      ...properties,
      shape: this.getShape(),
    }
  }

  getProperties(): GeoProps {
    return this.properties
  }

  protected applyPropertiesToFeature(feature: Feature) {
    if (this.properties.id) {
      feature.setId(this.properties.id)
    }
    Object.keys(this.properties).forEach(key => {
      if (key !== 'id') {
        feature.set(key, this.properties[key])
      }
    })
  }

  protected abstract getGeoType(): GeometryType

  protected featureToGeo(feature: Feature): GeometryJSON {
    return this.geoFormat.writeFeatureObject(feature) as GeometryJSON
  }

  protected writeExtendedGeoJSON(feature: Feature): GeometryJSON {
    const shape = this.getShape()
    const geo = this.featureToGeo(feature)
    const bufferedGeo = makeBufferedGeo({
      ...geo,
      properties: {
        ...this.properties,
        ...geo.properties,
        shape,
      },
    } as GeometryJSON)
    return {
      ...geo,
      bbox: geoToExtent(bufferedGeo),
      properties: {
        ...this.properties,
        shape,
      },
    }
  }

  cancelDrawing(): void {
    this.context.hideLabel()
    this.context.removeListeners()
    this.context.removeInteractions()
    this.drawingActive = false
  }

  isInputBlocked(): boolean {
    return this.inputBlocked
  }

  isDrawing(): boolean {
    return this.drawingActive
  }

  protected formatLabelNumber(n: number): string {
    return formatNumber(3, 5, n)
  }
}

export default BasicDrawingControl
