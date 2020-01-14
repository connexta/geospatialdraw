import * as React from 'react'
import {
  Shape,
  POLYGON,
  LINE,
  POINT,
  POINT_RADIUS,
  BOUNDING_BOX,
} from 'geospatialdraw/bin/shapes/shape'
import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry'
import { BBoxEditorDialog } from './bbox-editor-dialog'
import { CircleEditorDialog } from './circle-editor-dialog'
import { LineEditorDialog } from './line-editor-dialog'
import { PointEditorDialog } from './point-editor-dialog'
import { PolygonEditorDialog } from './polygon-editor-dialog'

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Okay button handler */
  onOk: (geo: GeometryJSON) => void
  /** Geometry shape */
  shape: Shape
}

const AllShapesEditorDialog: React.SFC<Props> = ({ shape, geo, onOk }) => {
  switch (shape) {
    case POLYGON:
      return <PolygonEditorDialog geo={geo} onOk={onOk} />
    case LINE:
      return <LineEditorDialog geo={geo} onOk={onOk} />
    case POINT:
      return <PointEditorDialog geo={geo} onOk={onOk} />
    case POINT_RADIUS:
      return <CircleEditorDialog geo={geo} onOk={onOk} />
    case BOUNDING_BOX:
      return <BBoxEditorDialog geo={geo} onOk={onOk} />
    default:
      throw new Error(`Shape ${shape} is not supported!`)
  }
}

export default AllShapesEditorDialog
