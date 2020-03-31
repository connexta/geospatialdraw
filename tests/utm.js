const { testHook } = require('./lib/react-tests')
const {
  useUTMCoordinates,
} = require('../distribution/coordinates/react-hooks/utm')
const { expect } = require('chai')

describe('useUTMCoordinates', () => {
  let instance
  beforeEach(() => {
    testHook(() => {
      instance = useUTMCoordinates({
        lat: 45,
        lon: -103,
      })
    })
  })
  describe('instance', () => {
    it('has expected properties', () => {
      expect(instance[0].lat).to.equal(45)
      expect(instance[0].lon).to.equal(-103)
      expect(instance[1].northing).to.be.closeTo(4984896, 1)
      expect(instance[1].easting).to.be.closeTo(657630, 1)
      expect(instance[1].zone).to.equal(13)
      expect(instance[1].hemisphere).to.equal('N')
      expect(instance[2]).to.be.instanceOf(Function)
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('13 657631mE 4984896mN')
    })
  })
  describe('setUTM', () => {
    it('valid value', () => {
      instance[2]({
        northing: 4705000,
        easting: 520500,
        zone: 12,
        hemisphere: 'N',
      })
      expect(instance[0].lat).to.be.closeTo(42.497, 0.001)
      expect(instance[0].lon).to.be.closeTo(-110.751, 0.001)
      expect(instance[1].northing).to.be.closeTo(4705000, 1)
      expect(instance[1].easting).to.be.closeTo(520500, 1)
      expect(instance[1].zone).to.equal(12)
      expect(instance[1].hemisphere).to.equal('N')
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('12 520500mE 4705000mN')
    })
    it('invalid value', () => {
      instance[2]({
        northing: 999999999,
        easting: 9999999991,
        zone: 80,
        hemisphere: 'X',
      })
      expect(instance[0].lat).to.equal(45)
      expect(instance[0].lon).to.equal(-103)
      expect(instance[1].northing).to.equal(999999999)
      expect(instance[1].easting).to.equal(9999999991)
      expect(instance[1].zone).to.equal(80)
      expect(instance[1].hemisphere).to.equal('X')
      expect(instance[3]).to.equal(false)
      expect(instance[4]).to.equal('13 657631mE 4984896mN')
    })
  })
})
