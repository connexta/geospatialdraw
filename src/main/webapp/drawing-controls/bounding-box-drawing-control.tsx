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
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
    this.extentChanged = this.extentChanged.bind(this)
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Polygon'
  }

  getShape(): Shape {
    return 'Bounding Box'
  }

  setGeo(geoJSON: GeometryJSON): void {
    this.cancelDrawing()
    this.setProperties((geoJSON as GeometryJSON).properties || {})
    const feature = this.geoFormat.readFeature(geoJSON)
    const extent = feature.getGeometry().getExtent()
    this.applyPropertiesToFeature(feature)
    this.context.updateFeature(feature)
    this.context.updateBufferFeature(feature)
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    const drawInteraction = new ol.interaction.Extent({
      extent,
    })
    this.startDrawingInteraction(drawInteraction)
  }

  startDrawing(): void {
    this.context.removeFeature()
    // @ts-ignore ol.interaction.Extent is not in typescript for this version of Open Layers
    const drawInteraction = new ol.interaction.Extent()
    this.startDrawingInteraction(drawInteraction)
  }

  private startDrawingInteraction(
    drawInteraction: ol.interaction.Interaction
  ): void {
    this.drawingActive = true
    this.context.setDrawInteraction(drawInteraction)
    this.context.setEvent('draw', 'extentchanged', this.extentChanged)
    this.context.addInteractionsWithoutModify()
  }

  extentChanged(e: ExtentEvent): void {
    if (e.extent !== null) {
      const geoJSON = this.extentToGeoJSON(e.extent)
      this.receiver(geoJSON)
      const feature = this.geoFormat.readFeature(geoJSON)
      this.applyPropertiesToFeature(feature)
      this.context.updateFeature(feature)
      this.context.updateBufferFeature(feature)
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
