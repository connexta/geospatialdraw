import { useState } from 'react'
import { Converter } from 'usng.js'
import { latLonTo, LatLonDD, isValidLatLon } from '../coordinate-converter'
import { UTM, utmToString } from '../utm-formatting'
import useSyncedCoordinates from './sync-coordinates'

/**
 * Constants defining range of UTM values
 */
const UTM_BOUNDS = {
  MAX_EASTING: 834000,
  MIN_EASTING: 160000,
  MAX_NORTHING: 10000000,
  MIN_NORTHING: 0,
  MAX_ZONE: 60,
}

type UnitConverter = {
  UTMtoLLwithNS: (
    northing: number,
    easting: number,
    zone: number,
    precision: null,
    hemisphere: 'N' | 'S'
  ) => LatLonDD
}

const utmToCoordinates = (
  { northing, easting, zone, hemisphere }: UTM,
  converter: UnitConverter
): LatLonDD =>
  converter.UTMtoLLwithNS(northing, easting, zone, null, hemisphere)

/**
 * Adds UTM state
 * @param initCoordinates - init longitude latitude values
 * @returns [{ lat, lon } || null, utm, setUTM, isValid, utmString]
 */
const useUTMCoordinates = (
  initCoordinates: LatLonDD
): [LatLonDD, UTM, (value: UTM) => void, boolean, string] => {
  const converter = new (Converter as any)() as UnitConverter
  const [coordinates, setCoordinates] = useState(initCoordinates)
  const correctedUTM = latLonTo.UTM(coordinates)
  const utmString = utmToString(correctedUTM)
  const [utm, setRawUTM] = useState(correctedUTM)
  const [isValid, setIsValid] = useState(true)
  const setUTM = (value: UTM) => {
    const coordinates = utmToCoordinates(value, converter)
    const coordinatesAreValid = isValidLatLon(coordinates)
    if (coordinatesAreValid) {
      setCoordinates(coordinates)
    }
    setRawUTM(value)
    setIsValid(coordinatesAreValid)
  }
  useSyncedCoordinates(initCoordinates, coordinates, value => {
    const updated = latLonTo.UTM(value)
    setUTM(updated)
  })
  return [coordinates, utm, setUTM, isValid, utmString]
}

export { useUTMCoordinates, UTM_BOUNDS }
