import * as React from 'react'
import { CoordinateUnit, LAT_LON } from '../units'
import { GeometryJSON, makeEmptyGeometry } from '../../geometry'
import { Shape } from '../../shape-utils'
import CoordinateEditorDialog from '../presentation/coordinate-editor-dialog'
import * as _ from 'lodash'

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

type FinalizeGeo = (geo: GeometryJSON) => GeometryJSON

const geoEditorToDialog = (
  GeoEditor: GeoEditorComponent,
  defaultShape: Shape,
  finalizeGeo: FinalizeGeo
): React.ComponentType<Props> => {
  class GeoEditorDialog extends React.Component<Props, State> {
    onOk: () => void
    onUpdateGeo: (geo: GeometryJSON) => void
    constructor(props: Props) {
      super(props)
      this.onOk = () => this.props.onOk(finalizeGeo(this.state.geo))
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
      const geo = _.cloneDeep(this.props.geo || this.defaultGeo())
      this.setState({ geo })
    }
    componentDidUpdate(prevProps: Props) {
      if (!_.isEqual(prevProps.geo, this.props.geo)) {
        this.setState({ geo: _.cloneDeep(this.props.geo) })
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
  FinalizeGeo,
  GeoEditorComponent,
  geoEditorToDialog,
  GeoEditorProps,
  Props as GeoEditorDialogProps,
}
