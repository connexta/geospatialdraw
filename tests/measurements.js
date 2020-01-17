const {
  formatNumber,
  distanceBetweenPoints,
  // computePolygonMeasurements,
  // computeLineMeasurements,
  // computeBBoxMeausurements,
} = require('../bin/geometry/measurements')
const { METERS } = require('../bin/geometry/units')
const { expect } = require('chai')

describe('measurements', () => {
  // describe('computePolygonMeasurements', () => {
  //   it('default', () => {
  //     const measurements = computePolygonMeasurements(
  //       [
  //         [115, -32],
  //         [131, -22],
  //         [143, -25],
  //         [150, -34],
  //         [115, -32],
  //       ],
  //       METERS
  //     )
  //     expect(measurements.area).to.be.closeTo(2558572689850, 1)
  //     expect(measurements.length[0]).to.be.closeTo(1932500, 1)
  //     expect(measurements.length[1]).to.be.closeTo(1267769, 1)
  //     expect(measurements.length[2]).to.be.closeTo(1207669, 1)
  //     expect(measurements.length[3]).to.be.closeTo(3255751, 1)
  //   })
  // })
  // describe('computeLineMeasurements', () => {
  //   it('default', () => {
  //     const measurements = computeLineMeasurements(
  //       [
  //         [115, -32],
  //         [131, -22],
  //         [143, -25],
  //         [150, -34],
  //       ],
  //       METERS
  //     )
  //     expect(measurements.area).to.equal(0)
  //     expect(measurements.length[0]).to.be.closeTo(1932500, 1)
  //     expect(measurements.length[1]).to.be.closeTo(1267769, 1)
  //     expect(measurements.length[2]).to.be.closeTo(1207669, 1)
  //   })
  // })
  // describe('computeBBoxMeausurements', () => {
  //   it('default', () => {
  //     const measurements = computeBBoxMeausurements(
  //       [115, -34, 150, -22],
  //       METERS
  //     )
  //     expect(measurements.area).to.be.closeTo(4283765425816, 1)
  //     expect(measurements.length[0]).to.be.closeTo(3210397, 1)
  //     expect(measurements.length[1]).to.be.closeTo(1334340, 1)
  //   })
  // })
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
