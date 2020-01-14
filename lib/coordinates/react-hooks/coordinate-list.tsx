import { useState, useEffect } from 'react'
import { LatLonDD } from '../coordinate-converter'

/**
 * Adds an interface for editing a list of coordinates to a react component
 * @param initCoordinates - array of default [lon, lat] coordinate values
 * @param initSelectedIndex - default selected index
 * @returns {
 *   coordinateList - array of [lon, lat] coordinate values
 *   setCoordinateList - sets coordinateList
 *   setSelectedIndex - selected index into coordinateList
 *   addCoordinateBefore - adds a new empty coordinate before the selected index
 *   addCoordinateAfter - adds a new empty coordinate after the selected index
 *   deleteCoordinate - deletes coordinate at selected index
 *   setCoordinate - sets the coordinate at selected index
 * }
 */
const useCoordinateList = (
  initCoordinates: [number, number][],
  initSelectedIndex: number
): {
  lat: number
  lon: number
  coordinateList: [number, number][]
  setCoordinateList: (value: [number, number][]) => void
  setSelectedIndex: (value: number) => void
  selectedIndex: number
  addCoordinateBefore: () => void
  addCoordinateAfter: () => void
  deleteCoordinate: () => void
  setCoordinate: (coordinate: LatLonDD) => void
} => {
  const [coordinateList, setCoordinateList] = useState(initCoordinates)
  const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex)
  const boundedSetSelectedIndex = (
    i: number,
    maxIndex: number = coordinateList.length - 1
  ) => setSelectedIndex(Math.min(Math.max(0, i), Math.max(0, maxIndex)))
  const addCoordinateBefore = () => {
    addCoordinate(selectedIndex)
  }
  const addCoordinateAfter = () => {
    addCoordinate(selectedIndex + 1)
  }
  const addCoordinate = (value: number) => {
    const updatedCoordinates = [...coordinateList]
    updatedCoordinates.splice(value, 0, [0, 0])
    setCoordinateList(updatedCoordinates)
  }
  const deleteCoordinate = () => {
    if (coordinateList.length > 1) {
      const updatedCoordinates = [...coordinateList]
      updatedCoordinates.splice(selectedIndex, 1)
      boundedSetSelectedIndex(selectedIndex, updatedCoordinates.length - 1)
      setCoordinateList(updatedCoordinates)
    }
  }
  const setCoordinate = ({ lat, lon }: LatLonDD) => {
    const updatedCoordinates = [...coordinateList]
    updatedCoordinates.splice(selectedIndex, 1, [lon, lat])
    setCoordinateList(updatedCoordinates)
  }
  useEffect(() => {
    if (JSON.stringify(initCoordinates) !== JSON.stringify(coordinateList)) {
      setCoordinateList(initCoordinates)
    }
  }, [initCoordinates])
  useEffect(() => {
    if (initSelectedIndex !== selectedIndex) {
      boundedSetSelectedIndex(initSelectedIndex)
    }
  }, [initSelectedIndex])
  return {
    lat: coordinateList[selectedIndex][1],
    lon: coordinateList[selectedIndex][0],
    coordinateList,
    setCoordinateList,
    setSelectedIndex: boundedSetSelectedIndex,
    selectedIndex,
    addCoordinateBefore,
    addCoordinateAfter,
    deleteCoordinate,
    setCoordinate,
  }
}

export default useCoordinateList
