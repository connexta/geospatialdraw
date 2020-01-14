import { useState } from 'react'
import { Converter } from 'usng.js'
import {
  latLonTo,
  LatLonDD,
  USNG_CONVERSION_PRECISION,
} from '../coordinate-converter'
import useSyncedCoordinates from './sync-coordinates'

type UnitConverter = {
  isUSNG: (usng: string) => 0 | string
  USNGtoLL: (usng: 0 | string, getCenter: boolean) => LatLonDD
}

const usngToCoordinates = (
  usng: string,
  initCoordinates: LatLonDD,
  converter: UnitConverter
): [LatLonDD, boolean] => {
  const matrix = converter.isUSNG(usng)
  if (!matrix) {
    return [initCoordinates, false]
  }
  return [converter.USNGtoLL(matrix, true), true]
}

/**
 * Adds USNG state
 * @param initCoordinates - init lat long value
 * @returns [{ lat, lon } || null, usng, setUSNG, isValid, formattedUSNG]
 */
const useUSNGCoordinates = (
  initCoordinates: LatLonDD
): [LatLonDD, string, (value: string) => void, boolean, string] => {
  const converter = new (Converter as any)() as UnitConverter
  const [coordinates, setCoordinates] = useState(initCoordinates)
  const [isValid, setIsValid] = useState(true)
  const formattedUSNG = latLonTo.USNG(coordinates, USNG_CONVERSION_PRECISION)
  const [usng, setRawUSNG] = useState(formattedUSNG)
  const setUSNG = (value: string) => {
    const [coordinates, isValid] = usngToCoordinates(
      value,
      initCoordinates,
      converter
    )
    setCoordinates(coordinates)
    setRawUSNG(value)
    setIsValid(isValid)
  }
  useSyncedCoordinates(initCoordinates, coordinates, value => {
    const updated = latLonTo.USNG(value, USNG_CONVERSION_PRECISION)
    setUSNG(updated)
  })
  return [coordinates, usng, setUSNG, isValid, formattedUSNG]
}

export default useUSNGCoordinates
