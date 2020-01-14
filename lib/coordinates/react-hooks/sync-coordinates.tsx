import { useEffect } from 'react'
import { LatLonDD } from '../coordinate-converter'

const useSyncedCoordinates = (
  prop: LatLonDD,
  state: LatLonDD,
  update: (value: LatLonDD) => void
): void => {
  useEffect(() => {
    if (prop.lat !== state.lat || prop.lon !== state.lon) {
      update(prop)
    }
  }, [prop.lat, prop.lon])
}

export default useSyncedCoordinates
