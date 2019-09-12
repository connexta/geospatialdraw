import * as React from 'react'
import {
  GeometryJSON,
  LengthUnit,
  METERS,
  geoToExtent,
  makeBufferedGeo,
} from '../../geometry'
import { CoordinateUnit } from '../units'
import FlatCoordinateListEditor from '../presentation/flat-coordinate-list-editor'

type State = {
  editIndex: number
}

type Coordinates = [number, number][]

type Props = {
  /** Geometry GeoJSON */
  geo: GeometryJSON
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Called when GeoJSON changes */
  onUpdateGeo: (geo: GeometryJSON) => void
  /** Gets coordinates from Geometry JSON */
  getCoordinatesFromGeo: (geo: GeometryJSON) => Coordinates
  /** Returns Geometry JSON updated with new coordinates */
  updateGeoCoordinates: (
    geo: GeometryJSON,
    coordinates: Coordinates
  ) => GeometryJSON
}

class FlatCoordinateListGeoEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editIndex: 0,
    }
  }
  updateGeoProperties(
    geo: GeometryJSON,
    coordinates: Coordinates
  ): GeometryJSON {
    const updated = this.props.updateGeoCoordinates(geo, coordinates)
    const bufferedGeo = makeBufferedGeo(updated)
    updated.bbox = geoToExtent(bufferedGeo)
    return updated
  }
  render() {
    const { geo, coordinateUnit, onUpdateGeo } = this.props
    const editIndex = this.state.editIndex
    const coordinateList: Coordinates = this.props.getCoordinatesFromGeo(geo)
    const validIndex = Math.min(
      Math.max(editIndex, 0),
      coordinateList.length - 1
    )
    const lon = coordinateList[validIndex][0]
    const lat = coordinateList[validIndex][1]
    return (
      <FlatCoordinateListEditor
        selectedIndex={editIndex}
        buffer={geo.properties.buffer || 0}
        bufferUnit={geo.properties.bufferUnit || METERS}
        coordinateList={coordinateList}
        coordinateUnit={coordinateUnit}
        lat={lat}
        lon={lon}
        setBuffer={(buffer: number) => {
          const updated: GeometryJSON = {
            ...geo,
            properties: {
              ...geo.properties,
              buffer,
            },
          }
          onUpdateGeo(updated)
        }}
        setUnit={(bufferUnit: LengthUnit) => {
          const updated: GeometryJSON = {
            ...geo,
            properties: {
              ...geo.properties,
              bufferUnit,
            },
          }
          onUpdateGeo(updated)
        }}
        setCoordinate={(lat: number, lon: number) => {
          const updatedCoordinates = [...coordinateList]
          updatedCoordinates.splice(editIndex, 1, [lon, lat])
          const updated = this.updateGeoProperties(geo, updatedCoordinates)
          onUpdateGeo(updated)
        }}
        addCoordinate={() => {
          const updatedCoordinates = [...coordinateList]
          updatedCoordinates.splice(editIndex + 1, 0, [0, 0])
          const updated = this.updateGeoProperties(geo, updatedCoordinates)
          this.setState(
            {
              editIndex: editIndex + 1,
            },
            () => onUpdateGeo(updated)
          )
        }}
        deleteCoordinate={() => {
          const updatedCoordinates = [...coordinateList]
          updatedCoordinates.splice(editIndex, 1)
          const updated = this.updateGeoProperties(geo, updatedCoordinates)
          onUpdateGeo(updated)
        }}
        selectCoordinate={(editIndex: number) => {
          this.setState({
            editIndex,
          })
        }}
      />
    )
  }
}

export { FlatCoordinateListGeoEditor, Coordinates }
