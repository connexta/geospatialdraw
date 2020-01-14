import * as React from 'react'
import BBoxEditor from './bbox-editor'
import { geoEditorToDialog } from './geo-editor-to-dialog'
import { BOUNDING_BOX } from 'geospatialdraw/bin/shapes/shape'
import Props from '../geo-editor-props'
import {
  bboxPropsToGeo,
  geoToBBoxProps,
} from 'geospatialdraw/bin/coordinates/geometry/bbox'

/**
 * Edits bounding box geo
 */
const BBoxGeoEditor: React.SFC<Props> = ({
  geo,
  coordinateUnit,
  onUpdateGeo,
}) => {
  const { id, properties, bbox } = geoToBBoxProps(geo)
  return (
    <BBoxEditor
      bbox={bbox}
      setBBox={value => {
        onUpdateGeo(
          bboxPropsToGeo({
            id,
            properties,
            bbox: value,
          })
        )
      }}
      unit={coordinateUnit}
    />
  )
}

/**
 * Edits bounding box in dialog
 */
const BBoxEditorDialog = geoEditorToDialog(BBoxGeoEditor, BOUNDING_BOX)
BBoxEditorDialog.displayName = 'BBoxEditorDialog'

export { BBoxGeoEditor, BBoxEditorDialog }
