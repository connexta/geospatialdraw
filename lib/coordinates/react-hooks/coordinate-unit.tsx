import { CoordinateUnit } from '../units'
import * as Units from '../units'
import { dmsToLatString, dmsToLonString } from '../dms-formatting'
import { utmToString } from '../utm-formatting'
import {
  latLonTo,
  USNG_CONVERSION_PRECISION,
  DECIMAL_DEGREES_PRECISION,
} from '../coordinate-converter'

const DEGREE_SYMBOL = '\xB0'

type Props = {
  /** Lattitude */
  lat: number
  /** Longitude */
  lon: number
  /** Coordinate unit */
  unit: CoordinateUnit
}

/**
 * Converts a lat/lon decimal pair to a string representation of that selected coordinate unit.
 * Example usage:
 * ```
 * const coordinates = useCoordinateUnit({ lat, lon, coordinateUnit })
 * return <Row>
 * {
 *   coordinates.map(text => (
 *     <Column>{text}</Column>
 *   ))
 * }
 * </Row>
 * ```
 * @param object - coordinate properties
 * @returns array of formatted strings divided at the point in which they should be semantically separated.
 */
const useCoordinateUnit = ({ lat, lon, unit }: Props): string[] => {
  let cells: string[] = []
  switch (unit) {
    case Units.LAT_LON:
      {
        cells = [
          `${Math.abs(lat).toFixed(
            DECIMAL_DEGREES_PRECISION
          )} ${DEGREE_SYMBOL} ${lat < 0 ? 'S' : 'N'}`,

          `${Math.abs(lon).toFixed(
            DECIMAL_DEGREES_PRECISION
          )} ${DEGREE_SYMBOL} ${lon < 0 ? 'W' : 'E'}`,
        ]
      }
      break
    case Units.LAT_LON_DMS:
      {
        const dmsPoint = latLonTo.LatLonDMS({ lat, lon })
        cells = [dmsToLatString(dmsPoint.lat), dmsToLonString(dmsPoint.lon)]
      }
      break
    case Units.USNG:
      {
        cells = [latLonTo.USNG({ lat, lon }, USNG_CONVERSION_PRECISION)]
      }
      break
    case Units.UTM:
      {
        cells = [utmToString(latLonTo.UTM({ lat, lon }))]
      }
      break
  }
  return cells
}

export default useCoordinateUnit

export { Props as CoordinateUnitProps }
