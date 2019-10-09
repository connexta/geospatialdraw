import * as Cesium from 'cesium'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from '../geo-receiver'
import {
  BasicDrawingControl,
  CoordinateListener,
  ExtentListener,
} from './basic-drawing-control'
import { Shape } from '../../shape-utils'
import { GeometryJSON, Extent } from '../../geometry'

class BoundingBoxDrawingControl extends BasicDrawingControl {
  private setExtent(extent: Extent, notify: boolean) {
    this.extent = extent
    const geoJSON = {
      bbox: extent,
      type: 'Feature',
      properties: {},
    }
    geoJSON.properties = this.properties
    this.updateGeo(geoJSON, notify)
  }

  startDrawing(): void {
    this.addExtentListener(extent => {
      this.extent = extent
      this.removeEventListeners()
    })
  }
  getShape(): Shape {
    return 'Bounding Box'
  }
  setActive(active: boolean): void {
    throw new Error('Method not implemented.')
  }
  isActive(): boolean {
    throw new Error('Method not implemented.')
  }
}

export default BoundingBoxDrawingControl
