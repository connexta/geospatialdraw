import * as React from 'react'
import styled from 'styled-components'
import {
  DMS,
  decimalToDMS,
  dmsToDecimal,
} from 'geospatialdraw/bin/coordinates/dms-formatting'
import { DMSLatitudeEditor, DMSLongitudeEditor } from './dms-value-editor'
import Props from '../bbox-editor-props'
import * as Common from './common-styles'

const Root = Common.BBoxRoot
const TextGroup = styled.label`
  margin: 0;
  padding: 0;
  display: flex;
`
const Label = Common.CompactLabel

const LatLonDMSBBoxEditor: React.SFC<Props> = ({ setBBox, bbox }) => {
  const north = decimalToDMS(bbox.north)
  const south = decimalToDMS(bbox.south)
  const east = decimalToDMS(bbox.east)
  const west = decimalToDMS(bbox.west)
  return (
    <Root flexDirection="column">
      <TextGroup>
        <Label>North</Label>
        <DMSLatitudeEditor
          value={north}
          setValue={(value: DMS) => {
            setBBox({
              ...bbox,
              north: dmsToDecimal(value),
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>South</Label>
        <DMSLatitudeEditor
          value={south}
          setValue={(value: DMS) => {
            setBBox({
              ...bbox,
              south: dmsToDecimal(value),
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>East</Label>
        <DMSLongitudeEditor
          value={east}
          setValue={(value: DMS) => {
            setBBox({
              ...bbox,
              east: dmsToDecimal(value),
            })
          }}
        />
      </TextGroup>
      <TextGroup>
        <Label>West</Label>
        <DMSLongitudeEditor
          value={west}
          setValue={(value: DMS) => {
            setBBox({
              ...bbox,
              west: dmsToDecimal(value),
            })
          }}
        />
      </TextGroup>
    </Root>
  )
}

export default LatLonDMSBBoxEditor
