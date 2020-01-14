import * as React from 'react'
import { DMS } from 'geospatialdraw/bin/coordinates/dms-formatting'
import { DMSLatitudeEditor, DMSLongitudeEditor } from './dms-value-editor'
import * as Common from './common-styles'
import Props from '../point-editor-props'
import useDMSCoordinates from 'geospatialdraw/bin/coordinates/react-hooks/dms'

const Root = Common.Column
const TextGroup = Common.SpacedInputLabelRow
const Label = Common.Label

const LatLonDMSPointEditor: React.SFC<Props> = ({
  lat: initLat,
  lon: initLon,
  setCoordinate,
}) => {
  const [{ lat, lon }, dms, setDMS] = useDMSCoordinates({
    lat: initLat,
    lon: initLon,
  })
  React.useEffect(
    () => {
      setCoordinate(lat, lon)
    },
    [lat, lon]
  )
  return (
    <Root>
      <TextGroup>
        <Label>Latitude</Label>
        <DMSLatitudeEditor
          value={dms.lat}
          setValue={(value: DMS) => {
            setDMS({ ...dms, lat: value })
          }}
        />
      </TextGroup>
      <TextGroup style={{ marginBottom: 0 }}>
        <Label>Longitude</Label>
        <DMSLongitudeEditor
          value={dms.lon}
          setValue={(value: DMS) => {
            setDMS({ ...dms, lon: value })
          }}
        />
      </TextGroup>
    </Root>
  )
}

export default LatLonDMSPointEditor
