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
import * as React from 'react'
import * as turf from '@turf/turf'
import { GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import {
  FlatCoordinateListGeoEditor,
  Coordinates,
} from './flat-coordinate-list-geo-editor'
import { CoordinateUnit } from '../units'

const MIN_POLYGON_COORDINATE_LENGTH = 2
const finalizeGeo: FinalizeGeo = geo => geo

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

const PolygonGeoEditor: React.SFC<Props> = props => (
  <FlatCoordinateListGeoEditor
    {...props}
    getCoordinatesFromGeo={geo => {
      const coordinates = (geo.geometry as turf.Polygon)
        .coordinates[0] as Coordinates
      return coordinates.length < MIN_POLYGON_COORDINATE_LENGTH
        ? [[0, 0]]
        : coordinates.slice(0, coordinates.length - 1)
    }}
    updateGeoCoordinates={(geo, coordinates) => {
      const updated: GeometryJSON = { ...geo }
      if (coordinates.length < 1) {
        coordinates = [[0, 0]]
      }
      coordinates.push(coordinates[0])
      const polyGeo = geo.geometry as turf.Polygon
      polyGeo.coordinates = [coordinates]
      return updated
    }}
  />
)

const PolygonEditorDialog = geoEditorToDialog(
  PolygonGeoEditor,
  'Polygon',
  finalizeGeo
)
PolygonEditorDialog.displayName = 'PolygonEditorDialog'

export { PolygonGeoEditor, PolygonEditorDialog }
