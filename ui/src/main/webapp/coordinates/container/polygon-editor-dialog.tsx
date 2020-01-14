import * as React from 'react'
import { geoEditorToDialog } from './geo-editor-to-dialog'
import { POLYGON } from 'geospatialdraw/bin/shapes/shape'
import CoordinateListEditor from './coordinate-list-editor'
import {
  polygonPropsToGeo,
  geoToPolygonProps,
} from 'geospatialdraw/bin/coordinates/geometry/polygon-line'
import Props from '../geo-editor-props'

/**
 * Edits polygon geo
 */
const PolygonGeoEditor: React.SFC<Props> = ({
  geo,
  coordinateUnit,
  onUpdateGeo,
}) => {
  const { id, properties, coordinates, buffer, bufferUnit } = geoToPolygonProps(
    geo
  )
  return (
    <CoordinateListEditor
      coordinateList={coordinates}
      coordinateUnit={coordinateUnit}
      buffer={buffer}
      bufferUnit={bufferUnit}
      onChange={(coordinatesValue, bufferValue, bufferUnitValue) => {
        onUpdateGeo(
          polygonPropsToGeo({
            id,
            coordinates: coordinatesValue,
            buffer: bufferValue,
            bufferUnit: bufferUnitValue,
            properties,
          })
        )
      }}
    />
  )
}

/**
 * Edits polygon geo in dialog
 */
const PolygonEditorDialog = geoEditorToDialog(PolygonGeoEditor, POLYGON)
PolygonEditorDialog.displayName = 'PolygonEditorDialog'

export { PolygonGeoEditor, PolygonEditorDialog }
