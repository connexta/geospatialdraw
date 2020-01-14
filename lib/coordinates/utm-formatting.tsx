import { Converter } from 'usng.js'

type UTM = {
  easting: number
  northing: number
  zone: number
  hemisphere: 'N' | 'S'
}

const UnitConverter = new (Converter as any)()

const utmToString = ({ easting, northing, zone, hemisphere }: UTM): string =>
  UnitConverter.serializeUTMUPS({
    easting,
    northing,
    zoneNumber: zone,
    northPole: hemisphere === 'N',
  })

export { UTM, utmToString }
