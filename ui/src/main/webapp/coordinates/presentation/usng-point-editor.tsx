import * as React from 'react'
import * as Common from './common-styles'
import USNGInput from './usng-input'
import Props from '../point-editor-props'
import useUSNGCoordinates from 'geospatialdraw/bin/coordinates/react-hooks/usng'

const Root = Common.Column
const TextGroup = Common.Row
const Label = Common.Label

const USNGPointEditor: React.SFC<Props> = ({
  lat: initLat,
  lon: initLon,
  setCoordinate,
}) => {
  const [{ lat, lon }, usng, setUSNG] = useUSNGCoordinates({
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
        <Label>USNG/MGRS</Label>
        <USNGInput value={usng} onChange={setUSNG} />
      </TextGroup>
    </Root>
  )
}

export default USNGPointEditor
