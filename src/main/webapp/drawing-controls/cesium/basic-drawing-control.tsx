import * as Cesium from 'cesium'
import UpdatedGeoReceiver from '../geo-receiver'
import DrawingControl from '../drawing-control'
import { Shape } from '../../shape-utils'
import {
  Geometry,
  GeometryJSON,
  GeometryJSONProperties,
  makeEmptyGeometry,
  geoToExtent,
  Extent,
} from '../../geometry'

type GeoProps = GeometryJSONProperties & {
  [index: string]: any
}

type CoordinateListener = (coordinate: [number, number]) => void
type ExtentListener = (extent: Extent) => void

abstract class BasicDrawingControl implements DrawingControl {
  protected mapViewer: Cesium.Viewer
  protected receiver: UpdatedGeoReceiver
  protected mouseDragActive: boolean
  protected drawingActive: boolean
  protected properties: GeoProps
  protected removeEventListeners: () => void

  abstract startDrawing(): void
  abstract getShape(): Shape
  abstract setActive(active: boolean): void
  abstract isActive(): boolean

  protected constructor(
    mapViewer: Cesium.Viewer,
    receiver: UpdatedGeoReceiver
  ) {
    this.mapViewer = mapViewer
    this.receiver = receiver
    this.mouseDragActive = false
    this.drawingActive = false
    const selfResettingFunction = () => {
      this.removeEventListeners = selfResettingFunction
    }
    this.removeEventListeners = selfResettingFunction
    this.setProperties(makeEmptyGeometry('', this.getShape()).properties)
  }

  setProperties(properties: GeoProps): void {
    this.properties = {
      ...properties,
      shape: this.getShape(),
    }
  }

  getProperties(): GeoProps {
    return this.properties
  }

  cancelDrawing(): void {
    this.removeEventListeners()
    this.drawingActive = false
    this.mouseDragActive = false
  }

  isMouseDragActive(): boolean {
    return this.mouseDragActive
  }

  isDrawing(): boolean {
    return this.drawingActive
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.updateGeo(geoJSON, false)
  }

  protected geometryToGeoJSON(geometry: Geometry): GeometryJSON {
    const bbox = geoToExtent(geometry)
    return {
      bbox,
      type: 'Feature',
      properties: {
        ...this.properties,
        shape: this.getShape(),
      },
      geometry,
    }
  }

  protected updateGeo(geoJSON: GeometryJSON, notify: boolean) {
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const coordinates = this.geoJSONToLine(geoJSON)
    const last = Math.max(0, coordinates.length - 1)
    if (
      coordinates[0][0] === coordinates[last][0] &&
      coordinates[0][1] === coordinates[last][1]
    ) {
    }
    if (notify) {
      this.receiver(geoJSON)
    }
  }

  protected abstract geoJSONToLine(geoJSON: GeometryJSON): [number, number][]

  protected clientCoordinatesToMapCoordinates(
    x: number,
    y: number
  ): [number, number] | false {
    const mousePosition = new Cesium.Cartesian2(x, y)
    const ellipsoid = this.mapViewer.scene.globe.ellipsoid
    const cartesian = this.mapViewer.camera.pickEllipsoid(
      mousePosition,
      ellipsoid
    )
    if (cartesian) {
      const cartographic = ellipsoid.cartesianToCartographic(cartesian)
      const lon = Cesium.Math.toDegrees(cartographic.longitude)
      const lat = Cesium.Math.toDegrees(cartographic.latitude)
      return [lon, lat]
    }
    return false
  }

  protected addCoordinateClickListener(listener: CoordinateListener) {
    this.removeEventListeners()
    const domListener = (e: MouseEvent) => {
      const coordinates = this.clientCoordinatesToMapCoordinates(
        e.clientX,
        e.clientY
      )
      if (coordinates) {
        listener(coordinates)
      }
    }
    this.addCanvasEventListener('click', domListener)
  }

  protected addCoordinateDoubleClickListener(listener: CoordinateListener) {
    this.removeEventListeners()
    const domListener = (e: MouseEvent) => {
      const coordinates = this.clientCoordinatesToMapCoordinates(
        e.clientX,
        e.clientY
      )
      if (coordinates) {
        listener(coordinates)
      }
    }
    this.addCanvasEventListener('dblclick', domListener)
  }

  protected addExtentListener(listener: ExtentListener) {
    const extent: Extent = [0, 0, 0, 0]
    this.removeEventListeners()
    const mouseDownListener = (e: MouseEvent) => {
      const coordinates = this.clientCoordinatesToMapCoordinates(
        e.clientX,
        e.clientY
      )
      if (coordinates) {
        extent[0] = coordinates[0]
        extent[1] = coordinates[1]
      }
    }
    const mouseUpListener = (e: MouseEvent) => {
      const coordinates = this.clientCoordinatesToMapCoordinates(
        e.clientX,
        e.clientY
      )
      if (coordinates) {
        extent[0] = Math.min(extent[0], coordinates[0])
        extent[1] = Math.min(extent[1], coordinates[1])
        extent[2] = Math.max(extent[0], coordinates[0])
        extent[3] = Math.max(extent[1], coordinates[1])
        listener(extent)
      }
    }
    this.addCanvasEventListener('mousedown', mouseDownListener)
    this.addCanvasEventListener('mouseup', mouseUpListener)
  }

  protected addCanvasEventListener(eventType: string, listener: EventListener) {
    this.mapViewer.canvas.addEventListener(eventType, listener, false)
    const recursiveRemoveRemaining = this.removeEventListeners
    this.removeEventListeners = () => {
      this.mapViewer.canvas.removeEventListener(eventType, listener)
      recursiveRemoveRemaining()
    }
  }
}

export { BasicDrawingControl, CoordinateListener, ExtentListener }
