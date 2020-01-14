import * as React from 'react'
import { CoordinateUnit, LAT_LON } from 'geospatialdraw/bin/coordinates/units'
import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { Shape } from 'geospatialdraw/bin/shapes/shape'
import CoordinateEditorDialog from '../presentation/coordinate-editor-dialog'

const cloneDeep = (o: any): any => JSON.parse(JSON.stringify(o))
const isEqual = (a: any, b: any): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Okay button handler */
  onOk: (geo: GeometryJSON) => void
}

type State = {
  coordinateUnit: CoordinateUnit
  geo: GeometryJSON
}

type GeoEditorProps = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
}

type GeoEditorComponent = React.ComponentType<GeoEditorProps>

const geoEditorToDialog = (
  GeoEditor: GeoEditorComponent,
  defaultShape: Shape
): React.ComponentType<Props> => {
  class GeoEditorDialog extends React.Component<Props, State> {
    onOk: () => void
    onUpdateGeo: (geo: GeometryJSON) => void
    constructor(props: Props) {
      super(props)
      this.onOk = () => this.props.onOk(this.state.geo)
      this.onUpdateGeo = (geo: GeometryJSON) => {
        this.setState({ geo })
      }
      this.state = {
        coordinateUnit: LAT_LON,
        geo: this.defaultGeo(),
      }
    }
    defaultGeo(): GeometryJSON {
      return makeEmptyGeometry('', defaultShape)
    }
    componentDidMount() {
      const geo = cloneDeep(this.props.geo || this.defaultGeo())
      this.setState({ geo })
    }
    componentDidUpdate(prevProps: Props) {
      if (!isEqual(prevProps.geo, this.props.geo)) {
        this.setState({ geo: cloneDeep(this.props.geo) })
      }
    }
    render() {
      const { coordinateUnit, geo } = this.state
      return (
        <CoordinateEditorDialog
          onOk={this.onOk}
          setUnit={(coordinateUnit: CoordinateUnit) => {
            this.setState({
              coordinateUnit,
            })
          }}
          unit={coordinateUnit}
        >
          <GeoEditor
            geo={geo}
            coordinateUnit={coordinateUnit}
            onUpdateGeo={this.onUpdateGeo}
          />
        </CoordinateEditorDialog>
      )
    }
  }
  return GeoEditorDialog
}

export {
  GeoEditorComponent,
  geoEditorToDialog,
  GeoEditorProps,
  Props as GeoEditorDialogProps,
}
