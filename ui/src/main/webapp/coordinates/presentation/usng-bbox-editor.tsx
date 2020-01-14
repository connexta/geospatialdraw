import * as React from 'react'
import styled from 'styled-components'
import USNGPointEditor from './usng-point-editor'
import Props from '../bbox-editor-props'
import * as Common from './common-styles'
import {
  coordinatePairToBBox,
  bboxToCoordinatePair,
} from 'geospatialdraw/bin/coordinates/geometry/bbox'

const Root = Common.BBoxRoot
const PointGroup = styled.div`
  margin: 0;
  padding: 0;
  font-size: ${props => props.theme.minimumFontSize};
  display: flex;
  margin-right: ${props => props.theme.minimumSpacing};
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`
const Label = styled.div`
  margin: 0;
  margin-bottom: ${props => props.theme.minimumSpacing};
  padding: 0;
  font-size: ${props => props.theme.minimumFontSize};
  display: flex;
  font-weight: bold;
`

const USNGBBoxEditor: React.SFC<Props> = ({ bbox, setBBox }) => {
  const [upperLeft, lowerRight] = bboxToCoordinatePair(bbox)
  return (
    <Root flexDirection="row">
      <PointGroup>
        <Label>Upper Left</Label>
        <USNGPointEditor
          lat={upperLeft.lat}
          lon={upperLeft.lon}
          setCoordinate={(lat, lon) => {
            setBBox(coordinatePairToBBox([{ lat, lon }, lowerRight]))
          }}
        />
      </PointGroup>
      <PointGroup>
        <Label>Lower Right</Label>
        <USNGPointEditor
          lat={lowerRight.lat}
          lon={lowerRight.lon}
          setCoordinate={(lat, lon) => {
            setBBox(coordinatePairToBBox([{ lat, lon }, upperLeft]))
          }}
        />
      </PointGroup>
    </Root>
  )
}

export default USNGBBoxEditor
