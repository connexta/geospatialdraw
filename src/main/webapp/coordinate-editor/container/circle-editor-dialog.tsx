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
import { LengthUnit, GeometryJSON } from '../../geometry'
import { geoEditorToDialog, FinalizeGeo } from './geo-editor-to-dialog'
import { CircleEditor } from '../presentation/point-circle-editor'
import { updateCircleGeo } from '../circle-geo-writer'
import { CoordinateUnit } from '../units'

const finalizeGeo: FinalizeGeo = geo => geo

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

class CircleGeoEditor extends React.Component<Props> {
  render() {
    const { geo, coordinateUnit, onUpdateGeo } = this.props
    const lon = (geo.geometry as turf.Point).coordinates[0]
    const lat = (geo.geometry as turf.Point).coordinates[1]
    const radius = geo.properties.buffer || 0
    const radiusUnit = geo.properties.bufferUnit
    return (
      <CircleEditor
        coordinateUnit={coordinateUnit}
        lat={lat}
        lon={lon}
        radius={radius}
        radiusUnit={radiusUnit}
        setCoordinate={(latValue: number, lonValue: number) => {
          onUpdateGeo(
            updateCircleGeo(geo, latValue, lonValue, radius, radiusUnit)
          )
        }}
        setRadius={(value: number) => {
          onUpdateGeo(updateCircleGeo(geo, lat, lon, value, radiusUnit))
        }}
        setRadiusUnit={(value: LengthUnit) => {
          onUpdateGeo(updateCircleGeo(geo, lat, lon, radius, value))
        }}
      />
    )
  }
}

const CircleEditorDialog = geoEditorToDialog(
  CircleGeoEditor,
  'Point Radius',
  finalizeGeo
)
CircleEditorDialog.displayName = 'CircleEditorDialog'

export { CircleEditorDialog, CircleGeoEditor }
