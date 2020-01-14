import { Shape } from 'geospatialdraw/bin/shapes/shape'
import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry'
import DrawingToolbox from 'geospatialdraw/bin/drawing/drawing-toolbox'
import UpdatedGeoReceiver from 'geospatialdraw/bin/drawing/geo-receiver'
import { HTMLAttributes } from '../internal/html'

type Props = HTMLAttributes & {
  toolbox: DrawingToolbox
  shape: Shape | null
  isActive: boolean
  showCoordinateEditor?: boolean
  saveAndContinue?: boolean
  title?: string
  geometry: GeometryJSON | null
  toggleCoordinateEditor?: () => void
  onCancel: () => void
  onOk: () => void
  onSetShape: (shape: Shape) => void
  onUpdate: UpdatedGeoReceiver
  disabledShapes?: Shape[]
  defaultGeoProperties?: object
}

export default Props
