const { testHook } = require('./lib/react-tests')
const useUSNGCoordinates = require('../distribution/coordinates/react-hooks/usng')
  .default
const { expect } = require('chai')

describe('useUSNGCoordinates', () => {
  let instance
  beforeEach(() => {
    testHook(() => {
      instance = useUSNGCoordinates({
        lat: 45,
        lon: -103,
      })
    })
  })
  describe('instance', () => {
    it('has expected properties', () => {
      expect(instance[0].lat).to.equal(45)
      expect(instance[0].lon).to.equal(-103)
      expect(instance[1]).to.equal('13T FK 57631 84896')
      expect(instance[2]).to.be.instanceOf(Function)
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('13T FK 57631 84896')
    })
  })
  describe('setUSNG', () => {
    it('valid value', () => {
      instance[2]('18SUJ234064')
      expect(instance[0].lat).to.be.closeTo(38.888, 0.001)
      expect(instance[0].lon).to.be.closeTo(-77.036, 0.001)
      expect(instance[1]).to.equal('18SUJ234064')
      expect(instance[3]).to.equal(true)
      expect(instance[4]).to.equal('18S UJ 23400 06400')
    })
    it('invalid value', () => {
      instance[2]('spoon')
      expect(instance[0].lat).to.equal(45)
      expect(instance[0].lon).to.equal(-103)
      expect(instance[1]).to.equal('spoon')
      expect(instance[3]).to.equal(false)
      expect(instance[4]).to.equal('13T FK 57631 84896')
    })
  })
})
