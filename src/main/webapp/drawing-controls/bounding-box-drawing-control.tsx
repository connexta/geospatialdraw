/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import * as ol from 'openlayers'
import * as turf from '@turf/turf'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import BasicDrawingControl from './basic-drawing-control'
import { Shape } from '../shape-utils'
import { GeometryJSON, Extent } from '../geometry'

type ExtentEvent = {
  extent: Extent
}

/**
 * Drawing Control for drawing a bounding box
 */
class BoundingBoxDrawingControl extends BasicDrawingControl {
  extentInteraction: ol.interaction.Interaction | null

  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.extentChanged = this.extentChanged.bind(this)
    this.extentInteraction = null
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Polygon'
  }

  getShape(): Shape {
    return 'Bounding Box'
  }

  setGeo(geoJSON: GeometryJSON): void {
    if (!this.isDrawing()) {
      this.startDrawing()
    }
    const feature = this.geoFormat.readFeature(geoJSON)
    const extent = feature.getGeometry().getExtent()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    this.setExtent(extent)
  }

  setExtent(extent: Extent): void {
    const geoJSON = this.extentToGeoJSON(extent)
    const feature = this.geoFormat.readFeature(geoJSON)
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    if (this.extentInteraction !== null) {
      this.extentInteraction.setProperties({
        extent,
      })
    }
  }

  startDrawing(): void {
    this.drawingActive = true
    this.context.removeFeature()
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    this.extentInteraction = new ol.interaction.Extent()
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    this.context.setDrawInteraction(this.extentInteraction)
    this.context.setEvent('draw', 'extentchanged', this.extentChanged)
    this.context.addInteractionsWithoutModify()
  }

  extentChanged(e: ExtentEvent): void {
    if (e.extent !== null) {
      this.receiver(this.extentToGeoJSON(e.extent))
      const feature = this.extentToFeature(e.extent)
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
    }
  }

  extentToFeature(extent: Extent): ol.Feature {
    return this.geoFormat.readFeature(this.extentToGeoJSON(extent))
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
