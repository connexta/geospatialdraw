const { testHook } = require('./lib/react-tests')
const useDMSCoordinates = require('../distribution/coordinates/react-hooks/dms')
  .default
const { expect } = require('chai')

describe('useDMSCoordinates', () => {
  let instance
  beforeEach(() => {
    testHook(() => {
      instance = useDMSCoordinates({
        lat: 35.2125,
        lon: 64.00146,
      })
    })
  })
  describe('instance', () => {
    it('has expected properties', () => {
      expect(instance[0].lat).to.equal(35.2125)
      expect(instance[0].lon).to.equal(64.00146)
      expect(instance[1].lat.degree).to.be.closeTo(35, 0.01)
      expect(instance[1].lat.minute).to.be.closeTo(12, 0.01)
      expect(instance[1].lat.second).to.be.closeTo(45, 0.01)
      expect(instance[1].lon.degree).to.be.closeTo(64, 0.01)
      expect(instance[1].lon.minute).to.be.closeTo(0, 0.01)
      expect(instance[1].lon.second).to.be.closeTo(5.25, 0.01)
      expect(instance[2]).to.be.instanceOf(Function)
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('35\xB0 12\' 45.0" N 64\xB0 0\' 5.3" E')
    })
  })
  describe('setDMS', () => {
    it('valid value', () => {
      instance[2]({
        lat: {
          degree: 30,
          minute: 0,
          second: 0,
        },
        lon: {
          degree: -15,
          minute: 0,
          second: 0,
        },
      })
      expect(instance[0].lat).to.equal(30)
      expect(instance[0].lon).to.equal(-15)
      expect(instance[1].lat.degree).to.equal(30)
      expect(instance[1].lat.minute).to.equal(0)
      expect(instance[1].lat.second).to.equal(0)
      expect(instance[1].lon.degree).to.equal(-15)
      expect(instance[1].lon.minute).to.equal(0)
      expect(instance[1].lon.second).to.equal(0)
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('30\xB0 0\' 0.0" N 15\xB0 0\' 0.0" W')
    })
    it('invalid value', () => {
      instance[2]({
        lat: {
          degree: 990,
          minute: 0,
          second: 0,
        },
        lon: {
          degree: -15,
          minute: 0,
          second: 0,
        },
      })
      expect(instance[0].lat).to.equal(35.2125)
      expect(instance[0].lon).to.equal(64.00146)
      expect(instance[1].lat.degree).to.be.closeTo(35, 0.01)
      expect(instance[1].lat.minute).to.be.closeTo(12, 0.01)
      expect(instance[1].lat.second).to.be.closeTo(45, 0.01)
      expect(instance[1].lon.degree).to.be.closeTo(64, 0.01)
      expect(instance[1].lon.minute).to.be.closeTo(0, 0.01)
      expect(instance[1].lon.second).to.be.closeTo(5.25, 0.01)
      expect(instance[3]).to.equal(false)
      expect(instance[4]).to.equal('35\xB0 12\' 45.0" N 64\xB0 0\' 5.3" E')
    })
  })
})
