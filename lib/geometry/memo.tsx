import { useMemo } from 'react'
import * as turf from '@turf/turf'
import { GeometryJSON } from './geometry'

type GeometryJSONMemo = {
  coordinates: [number, number][]
  properties: string
}

type PropertiesToString = (properties: object) => string

const defaultPropertiesToString: PropertiesToString = properties =>
  JSON.stringify(properties)

/**
 * React hook for memoizing GeometryJSON
 * so that changes to GeometryJSON objects can
 * be tracked more efficiently than using JSON.stringify
 * @params geometry - GeometryJSON value
 * @params propertiesToString - function for serializing
 * properties on the GeometryJSON. This defaults to JSON.stringify
 * @returns memo
 */
const useGeometryJSONMemo = (
  geometry: GeometryJSON | null,
  propertiesToString: PropertiesToString = defaultPropertiesToString
): GeometryJSONMemo => {
  const properties =
    geometry === null ? '' : propertiesToString(geometry.properties)
  const coordinates = (geometry === null ? [] : turf.coordAll(geometry)) as [
    number,
    number
  ][]
  return useMemo(
    () =>
      ({
        properties,
        coordinates,
      } as GeometryJSONMemo),
    [geometry]
  )
}

export default useGeometryJSONMemo
