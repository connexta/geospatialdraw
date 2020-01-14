import { DMS, decimalToDMS } from './dms-formatting'
import { UTM } from './utm-formatting'
import { Converter } from 'usng.js'

const DECIMAL_DEGREES_PRECISION = 6
const USNG_CONVERSION_PRECISION = 6
const UnitConverter = new (Converter as any)()

type LatLonDMS = {
  lat: DMS
  lon: DMS
}

type LatLonDD = {
  lat: number
  lon: number
}

type CoordinateValue = LatLonDMS | LatLonDD | string | UTM

const latLonTo = {
  LatLonDMS: ({ lat, lon }: LatLonDD): LatLonDMS => ({
    lat: decimalToDMS(lat),
    lon: decimalToDMS(lon),
  }),
  USNGBox: (north: number, south: number, east: number, west: number): string =>
    UnitConverter.LLBboxtoUSNG(north, south, east, west),
  USNG: ({ lat, lon }: LatLonDD, precision: number): string => {
    let usng = ''
    try {
      usng = UnitConverter.LLtoUSNG(lat, lon, precision)
    } catch (_e) {}
    return usng
  },
  UTM: ({ lat, lon }: LatLonDD): UTM => {
    const {
      easting,
      northing,
      zoneNumber,
      northPole,
    } = UnitConverter.LLtoUTMUPSObject(lat, lon)
    return {
      easting,
      northing,
      zone: zoneNumber,
      hemisphere: northPole ? 'N' : 'S',
    }
  },
}

const isValidLatLon = ({ lat, lon }: LatLonDD) =>
  lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180

export {
  LatLonDMS,
  LatLonDD,
  CoordinateValue,
  latLonTo,
  USNG_CONVERSION_PRECISION,
  DECIMAL_DEGREES_PRECISION,
  isValidLatLon,
}
