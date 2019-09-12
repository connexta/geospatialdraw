import * as React from 'react'
import * as Common from './common-styles'
import USNGInput from './usng-input'
import Props from '../point-editor-props'
import { Converter } from 'usng.js'
import {
  latLonTo,
  LatLonDD,
  USNG_CONVERSION_PRECISION,
} from '../coordinate-converter'

const Root = Common.Column
const TextGroup = Common.Row
const Label = Common.Label

class USNGPointEditor extends React.Component<Props> {
  unitConverter: {
    isUSNG: (usng: string) => 0 | string
    USNGtoLL: (usng: 0 | string, getCenter: boolean) => LatLonDD
  }
  constructor(props: Props) {
    super(props)
    this.unitConverter = new (Converter as any)()
  }
  render() {
    const { lat, lon, setCoordinate } = this.props
    const usng = latLonTo.USNG(lat, lon, USNG_CONVERSION_PRECISION)
    return (
      <Root>
        <TextGroup>
          <Label>USNG/MGRS</Label>
          <USNGInput
            value={usng}
            onChange={(usng: string) => {
              const matrix: string | 0 = this.unitConverter.isUSNG(usng)
              const converted = this.unitConverter.USNGtoLL(matrix, true)
              setCoordinate(converted.lat, converted.lon)
            }}
          />
        </TextGroup>
      </Root>
    )
  }
}

export default USNGPointEditor
