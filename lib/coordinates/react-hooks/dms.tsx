import { useState } from 'react'
import {
  decimalToDMS,
  dmsToDecimal,
  dmsCoordinateToString,
} from '../dms-formatting'
import { LatLonDD, LatLonDMS, isValidLatLon } from '../coordinate-converter'
import useSyncedCoordinates from './sync-coordinates'

/**
 * Adds DMS coordinate state
 * @param initCoordinates - init lat lon coordinates
 * @returns [{ lat, lon } || null, dmsCoordinates, setDMSCoordinates, isValid, dmsString]
 */
const useDMSCoordinates = (
  initCoordinates: LatLonDD
): [LatLonDD, LatLonDMS, (value: LatLonDMS) => void, boolean, string] => {
  const [coordinates, setCoordinates] = useState(initCoordinates)
  const [isValid, setIsValid] = useState(true)
  const dmsCoordinates = {
    lat: decimalToDMS(coordinates.lat),
    lon: decimalToDMS(coordinates.lon),
  }
  const setDMS = (value: LatLonDMS) => {
    const coordinates = {
      lat: dmsToDecimal(value.lat),
      lon: dmsToDecimal(value.lon),
    }
    const coordinatesAreValid = isValidLatLon(coordinates)
    if (coordinatesAreValid) {
      setCoordinates(coordinates)
    }
    setIsValid(coordinatesAreValid)
  }
  const dmsString = dmsCoordinateToString(
    dmsCoordinates.lat,
    dmsCoordinates.lon
  )
  useSyncedCoordinates(initCoordinates, coordinates, value => {
    const updated = {
      lat: decimalToDMS(value.lat),
      lon: decimalToDMS(value.lon),
    }
    setDMS(updated)
  })
  return [coordinates, dmsCoordinates, setDMS, isValid, dmsString]
}

export default useDMSCoordinates
