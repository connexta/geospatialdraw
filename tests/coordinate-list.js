const { testHook } = require('./lib/react-tests')
const useCoordinateList = require('../bin/coordinates/react-hooks/coordinate-list').default
const { expect } = require('chai')

describe('useCoordinateList', () => {
  let instance
  const defaultCoordinateListEnd = 4
  beforeEach(() => {
    testHook(() => {
      instance = useCoordinateList(
        [
          [10, 12],
          [30, 50],
          [45, 34],
          [32, 24],
          [10, 12],
        ],
        1
      )
    })
  })
  describe('instance', () => {
    it('has expected properties', () => {
      expect(instance.lat).to.equal(50)
      expect(instance.lon).to.equal(30)
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ])
      expect(instance.setSelectedIndex).to.be.instanceOf(Function)
      expect(instance.selectedIndex).to.equal(1)
      expect(instance.addCoordinateBefore).to.be.instanceOf(Function)
      expect(instance.addCoordinateAfter).to.be.instanceOf(Function)
      expect(instance.deleteCoordinate).to.be.instanceOf(Function)
      expect(instance.setCoordinate).to.be.instanceOf(Function)
    })
  })
  describe('setSelectedIndex', () => {
    it('first', () => {
      instance.setSelectedIndex(0)
      expect(instance.selectedIndex).to.equal(0)
      expect(instance.lat).to.equal(12)
      expect(instance.lon).to.equal(10)
    })
    it('middle', () => {
      instance.setSelectedIndex(3)
      expect(instance.selectedIndex).to.equal(3)
      expect(instance.lat).to.equal(24)
      expect(instance.lon).to.equal(32)
    })
    it('last', () => {
      instance.setSelectedIndex(defaultCoordinateListEnd)
      expect(instance.selectedIndex).to.equal(defaultCoordinateListEnd)
      expect(instance.lat).to.equal(12)
      expect(instance.lon).to.equal(10)
    })
    it('out of bounds negative', () => {
      instance.setSelectedIndex(-10)
      expect(instance.selectedIndex).to.equal(0)
      expect(instance.lat).to.equal(12)
      expect(instance.lon).to.equal(10)
    })
    it('out of bounds positive', () => {
      instance.setSelectedIndex(100)
      expect(instance.selectedIndex).to.equal(defaultCoordinateListEnd)
      expect(instance.lat).to.equal(12)
      expect(instance.lon).to.equal(10)
    })
  })
  describe('addCoordinateBefore', () => {
    it('first', () => {
      instance.setSelectedIndex(0)
      instance.addCoordinateBefore()
      expect(instance.coordinateList).to.deep.equal([
        [0, 0],
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ])
    })
    it('middle', () => {
      instance.setSelectedIndex(3)
      instance.addCoordinateBefore()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [0, 0],
        [32, 24],
        [10, 12],
      ])
    })
    it('last', () => {
      instance.setSelectedIndex(defaultCoordinateListEnd)
      instance.addCoordinateBefore()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [0, 0],
        [10, 12],
      ])
    })
  })
  describe('addCoordinateAfter', () => {
    it('first', () => {
      instance.setSelectedIndex(0)
      instance.addCoordinateAfter()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [0, 0],
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ])
    })
    it('middle', () => {
      instance.setSelectedIndex(3)
      instance.addCoordinateAfter()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [0, 0],
        [10, 12],
      ])
    })
    it('last', () => {
      instance.setSelectedIndex(defaultCoordinateListEnd)
      instance.addCoordinateAfter()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
        [0, 0],
      ])
    })
  })
  describe('deleteCoordinate', () => {
    it('first', () => {
      instance.setSelectedIndex(0)
      instance.deleteCoordinate()
      expect(instance.coordinateList).to.deep.equal([
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ])
    })
    it('middle', () => {
      instance.setSelectedIndex(3)
      instance.deleteCoordinate()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [10, 12],
      ])
    })
    it('last', () => {
      instance.setSelectedIndex(defaultCoordinateListEnd)
      instance.deleteCoordinate()
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
      ])
    })
    it('delete all', () => {
      instance.setSelectedIndex(0)
      instance.deleteCoordinate()
      instance.deleteCoordinate()
      instance.deleteCoordinate()
      instance.deleteCoordinate()
      instance.deleteCoordinate()
      expect(instance.coordinateList).to.deep.equal([[10, 12]])
    })
  })
  describe('setCoordinate', () => {
    const testCoordinate = {
      lat: 35,
      lon: -18,
    }
    const testLonLat = [-18, 35]
    it('first', () => {
      instance.setSelectedIndex(0)
      instance.setCoordinate(testCoordinate)
      expect(instance.coordinateList).to.deep.equal([
        testLonLat,
        [30, 50],
        [45, 34],
        [32, 24],
        [10, 12],
      ])
    })
    it('middle', () => {
      instance.setSelectedIndex(3)
      instance.setCoordinate(testCoordinate)
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        testLonLat,
        [10, 12],
      ])
    })
    it('last', () => {
      instance.setSelectedIndex(defaultCoordinateListEnd)
      instance.setCoordinate(testCoordinate)
      expect(instance.coordinateList).to.deep.equal([
        [10, 12],
        [30, 50],
        [45, 34],
        [32, 24],
        testLonLat,
      ])
    })
  })
})
