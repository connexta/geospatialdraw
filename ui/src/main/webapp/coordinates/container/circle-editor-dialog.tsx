import * as React from 'react'
import { LengthUnit } from 'geospatialdraw/bin/geometry/units'
import { geoEditorToDialog } from './geo-editor-to-dialog'
import { CircleEditor } from '../presentation/point-circle-editor'
import { POINT_RADIUS } from 'geospatialdraw/bin/shapes/shape'
import Props from '../geo-editor-props'
import {
  pointRadiusPropsToGeo,
  geoToPointRadiusProps,
} from 'geospatialdraw/bin/coordinates/geometry'

/**
 * Edits point radius/circle geo
 */
const CircleGeoEditor: React.SFC<Props> = ({
  geo,
  coordinateUnit,
  onUpdateGeo,
}) => {
  const {
    id,
    properties,
    lat,
    lon,
    radius,
    radiusUnit,
  } = geoToPointRadiusProps(geo)
  return (
    <CircleEditor
      coordinateUnit={coordinateUnit}
      lat={lat}
      lon={lon}
      radius={radius}
      radiusUnit={radiusUnit}
      setCoordinate={(latValue: number, lonValue: number) => {
        onUpdateGeo(
          pointRadiusPropsToGeo({
            id,
            properties,
            lat: latValue,
            lon: lonValue,
            radius,
            radiusUnit,
          })
        )
      }}
      setRadius={(value: number) => {
        onUpdateGeo(
          pointRadiusPropsToGeo({
            id,
            properties,
            lat,
            lon,
            radius: value,
            radiusUnit,
          })
        )
      }}
      setRadiusUnit={(value: LengthUnit) => {
        onUpdateGeo(
          pointRadiusPropsToGeo({
            id,
            properties,
            lat,
            lon,
            radius,
            radiusUnit: value,
          })
        )
      }}
    />
  )
}

/**
 * Edits point radius/circle geo in dialog
 */
const CircleEditorDialog = geoEditorToDialog(CircleGeoEditor, POINT_RADIUS)
CircleEditorDialog.displayName = 'CircleEditorDialog'

export { CircleEditorDialog, CircleGeoEditor }
