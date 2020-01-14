import * as React from 'react'
import { geoEditorToDialog } from './geo-editor-to-dialog'
import { FixedHeightPointEditor } from '../presentation/point-circle-editor'
import { POINT } from 'geospatialdraw/bin/shapes/shape'
import Props from '../geo-editor-props'
import {
  pointPropsToGeo,
  geoToPointProps,
} from 'geospatialdraw/bin/coordinates/geometry/point-circle'

/**
 * Edits point geo
 */
const PointGeoEditor: React.SFC<Props> = ({
  geo,
  coordinateUnit,
  onUpdateGeo,
}) => {
  const { id, properties, lat, lon } = geoToPointProps(geo)
  return (
    <FixedHeightPointEditor
      coordinateUnit={coordinateUnit}
      lat={lat}
      lon={lon}
      setCoordinate={(latValue: number, lonValue: number) => {
        onUpdateGeo(
          pointPropsToGeo({
            id,
            properties,
            lat: latValue,
            lon: lonValue,
          })
        )
      }}
    />
  )
}

/**
 * Edits point geo in dialog
 */
const PointEditorDialog = geoEditorToDialog(PointGeoEditor, POINT)
PointEditorDialog.displayName = 'PointEditorDialog'

export { PointGeoEditor, PointEditorDialog }
