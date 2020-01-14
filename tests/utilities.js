const { expect } = require('chai')
const {
  geoJSONToGeometryJSON,
  makeGeometry,
  makeBufferedGeo,
  combineExtents,
} =  require('../bin/geometry/utilities')
const { LINE, POINT_RADIUS } = require('../bin/shapes')

describe('geometry', () => {
  describe('makeBufferedGeo', () => {
    describe('point radius', () => {
      it('default', () => {
        const geo = geoJSONToGeometryJSON('identifier', {
          type: 'Point',
          coordinates: [20, 50],
        })
        geo.properties.buffer = {
          width: 50,
          unit: 'miles',
        }
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.not.deep.equal(geo)
        expect(bufferedGeo.geometry.type).to.equal('Polygon')
      })
    })
    describe('polygon', () => {
      let geo
      beforeEach(() => {
        geo = geoJSONToGeometryJSON('identifier', {
          type: 'Polygon',
          coordinates: [
            [
              [10, 30],
              [15, 40],
              [20, 25],
              [10, 30],
            ],
          ],
        })
        geo.properties.buffer = {
          width: 50,
          unit: 'miles',
        }
      })
      it('default', () => {
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.not.deep.equal(geo)
      })
      it('2 point polygon', () => {
        geo.geometry.coordinates = [
          [
            [10, 30],
            [15, 40],
            [10, 30],
          ],
        ]
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.deep.equal(geo)
      })
      it('1 point polygon', () => {
        geo.geometry.coordinates = [
          [
            [10, 30],
            [10, 30],
          ],
        ]
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.deep.equal(geo)
      })
    })
    describe('line', () => {
      let geo
      beforeEach(() => {
        geo = geoJSONToGeometryJSON('identifier', {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        })
        geo.properties.buffer = {
          width: 50,
          unit: 'miles',
        }
      })
      it('default', () => {
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.not.deep.equal(geo)
      })
      it('2 point line', () => {
        geo.geometry.coordinates = [
          [10, 30],
          [15, 40],
        ]
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.not.deep.equal(geo)
      })
      it('1 point line', () => {
        geo.geometry.coordinates = [[10, 30]]
        const bufferedGeo = makeBufferedGeo(geo)
        expect(bufferedGeo).to.deep.equal(geo)
      })
    })
  })
  describe('geoJSONToGeometryJSON', () => {
    it('Geometry object', () => {
      const geometry = geoJSONToGeometryJSON('identifier', {
        type: 'LineString',
        coordinates: [
          [10, 30],
          [15, 40],
          [20, 25],
        ],
      })
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('')
      expect(geometry.properties.shape).to.equal(LINE)
      expect(geometry.properties.buffer.width).to.equal(0)
      expect(geometry.properties.buffer.unit).to.equal('meters')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox).to.deep.equal([10, 25, 20, 40])
    })
    it('Feature object', () => {
      const geometry = geoJSONToGeometryJSON('identifier', {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        properties: {
          example: 'test',
        },
      })
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('')
      expect(geometry.properties.shape).to.equal(LINE)
      expect(geometry.properties.buffer.width).to.equal(0)
      expect(geometry.properties.buffer.unit).to.equal('meters')
      expect(geometry.properties.example).to.equal('test')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox).to.deep.equal([10, 25, 20, 40])
    })
    it('Feature object with id and color', () => {
      const geometry = geoJSONToGeometryJSON('identifier', {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        properties: {
          id: 'example-id',
          color: 'Red',
          example: 'test',
        },
      })
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('Red')
      expect(geometry.properties.shape).to.equal(LINE)
      expect(geometry.properties.buffer.width).to.equal(0)
      expect(geometry.properties.buffer.unit).to.equal('meters')
      expect(geometry.properties.example).to.equal('test')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox).to.deep.equal([10, 25, 20, 40])
    })
  })
  describe('makeGeometry', () => {
    it('basic line', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        'purple',
        LINE
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal(LINE)
      expect(geometry.properties.buffer.width).to.equal(0)
      expect(geometry.properties.buffer.unit).to.equal('meters')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox).to.deep.equal([10, 25, 20, 40])
    })
    it('buffered line', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'LineString',
          coordinates: [
            [10, 30],
            [15, 40],
            [20, 25],
          ],
        },
        'purple',
        LINE,
        50,
        'miles'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal(LINE)
      expect(geometry.properties.buffer.width).to.equal(50)
      expect(geometry.properties.buffer.unit).to.equal('miles')
      expect(geometry.geometry.type).to.equal('LineString')
      expect(geometry.geometry.coordinates).to.deep.equal([
        [10, 30],
        [15, 40],
        [20, 25],
      ])
      expect(geometry.bbox[0]).to.be.below(10)
      expect(geometry.bbox[1]).to.be.below(25)
      expect(geometry.bbox[2]).to.be.above(20)
      expect(geometry.bbox[3]).to.be.above(40)
    })
    it('buffered point', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'Point',
          coordinates: [10, 30],
        },
        'purple',
        POINT_RADIUS,
        50,
        'miles'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal(POINT_RADIUS)
      expect(geometry.properties.buffer.width).to.equal(50)
      expect(geometry.properties.buffer.unit).to.equal('miles')
      expect(geometry.geometry.type).to.equal('Point')
      expect(geometry.bbox[0]).to.be.below(10)
      expect(geometry.bbox[1]).to.be.below(30)
      expect(geometry.bbox[2]).to.be.above(10)
      expect(geometry.bbox[3]).to.be.above(30)
    })
    it('buffered tiny point', () => {
      const geometry = makeGeometry(
        'identifier',
        {
          type: 'Point',
          coordinates: [10, 30],
        },
        'purple',
        POINT_RADIUS,
        Number.MIN_VALUE,
        'feet'
      )
      expect(geometry.type).to.equal('Feature')
      expect(geometry.properties.id).to.equal('identifier')
      expect(geometry.properties.color).to.equal('purple')
      expect(geometry.properties.shape).to.equal(POINT_RADIUS)
      expect(geometry.properties.buffer.width).to.equal(Number.MIN_VALUE)
      expect(geometry.properties.buffer.unit).to.equal('feet')
      expect(geometry.geometry.type).to.equal('Point')
      expect(geometry.bbox[0]).to.equal(10)
      expect(geometry.bbox[1]).to.equal(30)
      expect(geometry.bbox[2]).to.equal(10)
      expect(geometry.bbox[3]).to.equal(30)
    })
  })
  describe('combineExtents', () => {
    it('default', () => {
      expect(
        combineExtents([
          [-50, -20, 30, 45],
          [-102, -90, 9, 2],
          [-5, -6, 50, 22],
          [0, 0, 0, 0],
        ])
      ).to.deep.equal([-102, -90, 50, 45])
    })
    it('empty array', () => {
      expect(combineExtents([])).to.deep.equal([0, 0, 0, 0])
    })
  })
})
