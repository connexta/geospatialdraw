const {
  formatNumber,
  distanceBetweenPoints,
} = require('../bin/geometry/measurements')
const { METERS } = require('../bin/geometry/units')
const { expect } = require('chai')

describe('measurements', () => {
  describe('distanceBetweenPoints', () => {
    it('default', () => {
      const distance = distanceBetweenPoints([115, -32], [131, -22], METERS)
      expect(distance).to.be.closeTo(1932500, 1)
    })
  })
  describe('formatNumber', () => {
    it('limit significant digits', () => {
      const formatted = formatNumber(3, 10, 123456)
      expect(formatted).to.be.equal('123000')
    })
    it('limit significant digits with decimal', () => {
      const formatted = formatNumber(3, 10, 12.3456)
      expect(formatted).to.be.equal('12.3')
    })
    it('use scientific notation on overflow', () => {
      const formatted = formatNumber(5, 10, 123450000000)
      expect(formatted).to.be.equal('1.2345e+11')
    })
    it('use scientific notation on overflow with rounding of significant digits', () => {
      const formatted = formatNumber(5, 10, 123456000000)
      expect(formatted).to.be.equal('1.2346e+11')
    })
    it('use scientific notation on overflow and limit significant digits', () => {
      const formatted = formatNumber(3, 10, 123456000000)
      expect(formatted).to.be.equal('1.23e+11')
    })
    it('use scientific notation on overflow with small number', () => {
      const formatted = formatNumber(3, 5, 123456)
      expect(formatted).to.be.equal('1.23e+5')
    })
  })
})
