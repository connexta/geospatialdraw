import * as React from 'react'
import { LengthUnit } from 'geospatialdraw/bin/geometry/units'
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units'
import CoordinateListEditor from '../presentation/coordinate-list-editor'
import useCoordinateList from 'geospatialdraw/bin/coordinates/react-hooks/coordinate-list'

type Props = {
  /** Coordinate List */
  coordinateList: [number, number][]
  /** Coordinate Unit */
  coordinateUnit: CoordinateUnit
  /** Buffer Width */
  buffer: number
  /** Buffer Unit */
  bufferUnit: LengthUnit
  /** Called when shape changes */
  onChange: (
    coordinateList: [number, number][],
    buffer: number,
    bufferUnit: LengthUnit
  ) => void
}

const CoordinateListEditorContainer: React.SFC<Props> = ({
  coordinateList: initCoordinates,
  coordinateUnit,
  buffer,
  bufferUnit,
  onChange,
}) => {
  const {
    lat,
    lon,
    coordinateList,
    setSelectedIndex,
    selectedIndex,
    addCoordinateAfter,
    deleteCoordinate,
    setCoordinate,
  } = useCoordinateList(initCoordinates, 0)
  React.useEffect(
    () => {
      if (JSON.stringify(coordinateList) !== JSON.stringify(initCoordinates)) {
        onChange(coordinateList, buffer, bufferUnit)
      }
    },
    [coordinateList]
  )
  return (
    <CoordinateListEditor
      selectedIndex={selectedIndex}
      buffer={buffer}
      bufferUnit={bufferUnit}
      coordinateList={coordinateList}
      coordinateUnit={coordinateUnit}
      lat={lat}
      lon={lon}
      setBuffer={value => onChange(coordinateList, value, bufferUnit)}
      setUnit={value => onChange(coordinateList, buffer, value)}
      setCoordinate={(lat: number, lon: number) => {
        setCoordinate({ lat, lon })
      }}
      addCoordinate={addCoordinateAfter}
      deleteCoordinate={deleteCoordinate}
      selectCoordinate={setSelectedIndex}
    />
  )
}

export default CoordinateListEditorContainer
