import * as React from 'react'
import { geoEditorToDialog } from './geo-editor-to-dialog'
import { LINE } from 'geospatialdraw/bin/shapes/shape'
import CoordinateListEditor from './coordinate-list-editor'
import {
  linePropsToGeo,
  geoToLineProps,
} from 'geospatialdraw/bin/coordinates/geometry/polygon-line'
import Props from '../geo-editor-props'

/**
 * Edits line geo
 */
const LineGeoEditor: React.SFC<Props> = ({
  geo,
  coordinateUnit,
  onUpdateGeo,
}) => {
  const { id, properties, coordinates, buffer, bufferUnit } = geoToLineProps(
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
          linePropsToGeo({
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
 * Edits line geo in dialog
 */
const LineEditorDialog = geoEditorToDialog(LineGeoEditor, LINE)
LineEditorDialog.displayName = 'LineEditorDialog'

export { LineGeoEditor, LineEditorDialog }
