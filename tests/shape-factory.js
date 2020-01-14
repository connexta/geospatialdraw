const { expect } = require('chai')
const {
  makeBBoxGeo,
  makeLineGeo,
  makePointGeo,
  makePointRadiusGeo,
  makePolygonGeo,
} = require('../bin/geometry/shape-factory')

describe('shape-factory', () => {
  describe('makePointGeo', () => {
    it('default', () => {
      const geo = makePointGeo('id', 10, 50)
      expect(geo.geometry.coordinates).to.deep.equal([50, 10])
      expect(geo.geometry.type).to.equal('Point')
      expect(geo.properties.buffer.width).to.equal(0)
    })
    it('color=green', () => {
      const defaultGeo = makePointGeo('id', 10, 50)
      expect(defaultGeo.properties.color).to.not.equal('green')
      const geo = makePointGeo('id', 10, 50, { color: 'green' })
      expect(geo.properties.color).to.equal('green')
    })
  })
  describe('makePointRadiusGeo', () => {
    it('default', () => {
      const geo = makePointRadiusGeo('id', 10, 50, 600, 'miles', { a: 'b' })
      expect(geo.geometry.coordinates).to.deep.equal([50, 10])
      expect(geo.geometry.type).to.equal('Point')
      expect(geo.properties.buffer.width).to.equal(600)
      expect(geo.properties.buffer.unit).to.equal('miles')
      expect(geo.properties.a).to.equal('b')
    })
  })
  describe('makePolygonGeo', () => {
    it('default', () => {
      const geo = makePolygonGeo(
        'id',
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        5,
        'kilometers',
        {
          a: 'b',
        }
      )
      expect(geo.geometry.coordinates).to.deep.equal([
        [
          [10, 50],
          [20, 60],
          [30, 80],
          [10, 50],
        ],
      ])
      expect(geo.geometry.type).to.equal('Polygon')
      expect(geo.properties.buffer.width).to.equal(5)
      expect(geo.properties.buffer.unit).to.equal('kilometers')
      expect(geo.properties.a).to.equal('b')
    })
  })
  describe('makeLineGeo', () => {
    it('default', () => {
      const geo = makeLineGeo(
        'id',
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        50,
        'meters',
        {
          a: 'b',
        }
      )
      expect(geo.geometry.coordinates).to.deep.equal(
        [
          [10, 50],
          [20, 60],
          [30, 80],
        ],
        5,
        'kilometers'
      )
      expect(geo.geometry.type).to.equal('LineString')
      expect(geo.properties.buffer.width).to.equal(50)
      expect(geo.properties.buffer.unit).to.equal('meters')
      expect(geo.properties.a).to.equal('b')
    })
  })
  describe('makeBBoxGeo', () => {
    it('default', () => {
      const geo = makeBBoxGeo('id', [10, 20, 50, 55], { a: 'b' })
      expect(geo.bbox).to.deep.equal([10, 20, 50, 55])
      expect(geo.geometry.type).to.equal('Polygon')
      expect(geo.properties.buffer.width).to.equal(0)
      expect(geo.properties.a).to.equal('b')
    })
  })
})
