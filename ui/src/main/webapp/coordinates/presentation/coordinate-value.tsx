import * as React from 'react'
import * as Common from './common-styles'
import useCoordinateUnit from 'geospatialdraw/bin/coordinates/react-hooks/coordinate-unit'
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units'
import styled from 'styled-components'

const Row = Common.Row

const Column = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  margin-right: ${props => props.theme.minimumSpacing};
`
type Props = {
  /** Lattitude */
  lat: number
  /** Longitude */
  lon: number
  /** Coordinate unit */
  unit: CoordinateUnit
}

const CoordinateValue: React.SFC<Props> = ({ lat, lon, unit }: Props) => {
  const coordinates: string[] = useCoordinateUnit({ lat, lon, unit })
  return (
    <Row>
      {coordinates.map(text => (
        <Column>{text}</Column>
      ))}
    </Row>
  )
}

export default CoordinateValue
