import * as React from 'react'
import styled from 'styled-components'
import NumberInput from './number-input'
import * as Common from './common-styles'
import Props from '../point-editor-props'
import {
  useUTMCoordinates,
  UTM_BOUNDS,
} from 'geospatialdraw/bin/coordinates/react-hooks/utm'

const {
  MAX_EASTING,
  MIN_EASTING,
  MAX_NORTHING,
  MIN_NORTHING,
  MAX_ZONE,
} = UTM_BOUNDS

const Root = Common.Column
const InputGroup = styled.label`
  margin: 0;
  padding: 0;
  display: flex;
  margin-bottom: ${props => props.theme.minimumSpacing};
`
const SelectGroup = Common.Row
const Label = Common.Label
const HemisphereButton = Common.SpacedToggleButton
const UTMInput = styled(NumberInput)`
  width: 6em;
`

type SelectEvent = React.FormEvent<HTMLSelectElement>

const UTMPointEditor: React.SFC<Props> = ({
  lat: initLat,
  lon: initLon,
  setCoordinate,
}) => {
  const [{ lat, lon }, utm, setUTM] = useUTMCoordinates({
    lat: initLat,
    lon: initLon,
  })
  const { northing, easting, zone, hemisphere } = utm
  React.useEffect(
    () => {
      setCoordinate(lat, lon)
    },
    [lat, lon]
  )
  return (
    <Root>
      <InputGroup>
        <Label>Easting</Label>
        <UTMInput
          value={easting}
          maxValue={MAX_EASTING}
          minValue={MIN_EASTING}
          decimalPlaces={0}
          onChange={(value: number) => {
            setUTM({
              ...utm,
              easting: value,
            })
          }}
        />
      </InputGroup>
      <InputGroup>
        <Label>Northing</Label>
        <UTMInput
          value={northing}
          maxValue={MAX_NORTHING}
          minValue={MIN_NORTHING}
          decimalPlaces={0}
          onChange={(value: number) => {
            setUTM({
              ...utm,
              northing: value,
            })
          }}
        />
      </InputGroup>
      <InputGroup>
        <Label>Zone</Label>
        <select
          value={zone}
          onChange={({ currentTarget: { value } }: SelectEvent) => {
            setUTM({
              ...utm,
              zone: parseInt(value),
            })
          }}
        >
          {Array(MAX_ZONE + 1)
            .fill(0)
            .map((_: number, zone: number) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
        </select>
      </InputGroup>
      <SelectGroup>
        <Label>Hemisphere</Label>
        <HemisphereButton
          title="Northern Hemisphere"
          isSelected={hemisphere === 'N'}
          onClick={() => {
            setUTM({
              ...utm,
              hemisphere: 'N',
            })
          }}
        >
          N
        </HemisphereButton>
        <HemisphereButton
          title="Southern Hemisphere"
          isSelected={hemisphere === 'S'}
          onClick={() => {
            setUTM({
              ...utm,
              hemisphere: 'S',
            })
          }}
        >
          S
        </HemisphereButton>
      </SelectGroup>
    </Root>
  )
}

export default UTMPointEditor
