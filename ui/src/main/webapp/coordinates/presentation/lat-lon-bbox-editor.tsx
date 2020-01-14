import * as React from 'react'
import styled from 'styled-components'
import Props from '../bbox-editor-props'
import { LatitudeInput, LongitudeInput } from './lat-lon-input'
import * as Common from './common-styles'

const Root = Common.BBoxRoot
const TextGroup = styled.label`
  margin: 0;
  padding: 0;
  display: flex;
`
const Label = Common.CompactLabel

const LatLonBBoxEditor: React.SFC<Props> = ({ bbox, setBBox }) => {
  const { north, south, east, west } = bbox
  return (
    <Root flexDirection="column">
      <TextGroup>
        <Label>North</Label>
        <LatitudeInput
          value={north}
          onChange={(value: number) => {
            setBBox({
              ...bbox,
              north: value,
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>South</Label>
        <LatitudeInput
          value={south}
          onChange={(value: number) => {
            setBBox({
              ...bbox,
              south: value,
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>East</Label>
        <LongitudeInput
          value={east}
          onChange={(value: number) => {
            setBBox({
              ...bbox,
              east: value,
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>West</Label>
        <LongitudeInput
          value={west}
          onChange={(value: number) => {
            setBBox({
              ...bbox,
              west: value,
            })
          }}
        />
      </TextGroup>
    </Root>
  )
}

export default LatLonBBoxEditor
