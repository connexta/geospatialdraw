import * as React from 'react'
import { LatitudeInput, LongitudeInput } from './lat-lon-input'
import * as Common from './common-styles'
import Props from '../point-editor-props'

const Root = Common.Column
const TextGroup = Common.SpacedInputLabelRow
const Label = Common.Label

const LatLonPointEditor: React.SFC<Props> = ({ lat, lon, setCoordinate }) => (
  <Root>
    <TextGroup>
      <Label>Latitude</Label>
      <LatitudeInput
        value={lat}
        onChange={(value: number) => setCoordinate(value, lon)}
      />
    </TextGroup>
    <TextGroup style={{ marginBottom: 0 }}>
      <Label>Longitude</Label>
      <LongitudeInput
        value={lon}
        onChange={(value: number) => setCoordinate(lat, value)}
      />
    </TextGroup>
  </Root>
)

export default LatLonPointEditor
