import * as React from 'react'
import * as Units from 'geospatialdraw/bin/coordinates/units'
import LatLonDMSBBoxEditor from '../presentation/lat-lon-dms-bbox-editor'
import LatLonBBoxEditor from '../presentation/lat-lon-bbox-editor'
import USNGBBoxEditor from '../presentation/usng-bbox-editor'
import UTMBBoxEditor from '../presentation/utm-bbox-editor'
import BBoxEditorProps from '../bbox-editor-props'

type Props = BBoxEditorProps & {
  unit: Units.CoordinateUnit
}

type Editor = React.ComponentType<BBoxEditorProps>

const editorMap = (unit: Units.CoordinateUnit): Editor => {
  switch (unit) {
    case Units.LAT_LON:
      return LatLonBBoxEditor
    case Units.LAT_LON_DMS:
      return LatLonDMSBBoxEditor
    case Units.USNG:
      return USNGBBoxEditor
    case Units.UTM:
      return UTMBBoxEditor
    default:
      throw new Error(`Unit "${unit}" not supported!`)
  }
}

/**
 * Edits bounding box for all coordinate units
 */
const BBoxEditor: React.SFC<Props> = ({ bbox, setBBox, unit }) => {
  const EditorTag = editorMap(unit)
  return <EditorTag bbox={bbox} setBBox={setBBox} />
}

export default BBoxEditor
