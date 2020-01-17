const LineString = require('ol/geom/LineString').default
const Point = require('ol/geom/Point').default
const Polygon = require('ol/geom/Polygon').default
const Feature = require('ol/Feature').default
const { expect } = require('chai')
const ShapeDetector = require('../bin/shapes/shape-detector').default
const {
  LINE,
  POLYGON,
  BOUNDING_BOX,
  POINT_RADIUS,
  POINT,
} = require('../bin/shapes')

describe('ShapeDetector', () => {
  let shapeDetector = null
  beforeEach(() => {
    shapeDetector = new ShapeDetector()
  })
  describe('isBoundingBoxFeature', () => {
    it('Clockwise From Bottom Left', () => {
      const feature = new Feature(
        new Polygon([
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Clockwise From Top Left', () => {
      const feature = new Feature(
        new Polygon([
          [
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
            [0, 1],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Clockwise From Top Right', () => {
      const feature = new Feature(
        new Polygon([
          [
            [1, 1],
            [1, 0],
            [0, 0],
            [0, 1],
            [1, 1],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Clockwise Bottom Right', () => {
      const feature = new Feature(
        new Polygon([
          [
            [1, 0],
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Old Editor Bounding Box', () => {
      const feature = new Feature(
        new Polygon([
          [
            [37.15079928954003, 35.252426841484066],
            [38.8031053182774, 35.252426841484066],
            [38.8031053182774, 34.092763897976624],
            [37.15079928954003, 34.092763897976624],
            [37.15079928954003, 35.252426841484066],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Random Bounding Box', () => {
      const feature = new Feature(
        new Polygon([
          [
            [-103.23955535888672, 41.966400146484375],
            [-102.4200439453125, 41.966400146484375],
            [-102.4200439453125, 42.591590881347656],
            [-103.23955535888672, 42.591590881347656],
            [-103.23955535888672, 41.966400146484375],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(true)
    })
    it('Not a bounding box first and last coordinates', () => {
      const feature = new Feature(
        new Polygon([
          [
            [1, 0.1],
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0.1],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(false)
    })
    it('Not a bounding box middle coordinate', () => {
      const feature = new Feature(
        new Polygon([
          [
            [1, 0],
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 0],
          ],
        ])
      )
      const actual = shapeDetector.isBoundingBoxFeature(feature)
      expect(actual).to.equal(false)
    })
  })
  describe('shapeFromFeature', () => {
    it('Line', () => {
      const feature = new Feature(
        new LineString([
          [5, 5],
          [0, 0],
        ])
      )
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(LINE)
    })
    it('Line closed loop', () => {
      const feature = new Feature(
        new LineString([
          [5, 5],
          [0, 0],
          [5, 5],
        ])
      )
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(LINE)
    })
    it('Bounding Box', () => {
      const feature = new Feature(
        new Polygon([
          [
            [0.212, 0.389],
            [0.212, 0.503],
            [0.513, 0.503],
            [0.513, 0.389],
            [0.212, 0.389],
          ],
        ])
      )
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(BOUNDING_BOX)
    })
    it('Point Radius', () => {
      const feature = new Feature(new Point([0, 0]))
      feature.set('buffer', { width: 1, unit: 'meters' })
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(POINT_RADIUS)
    })
    it('Point', () => {
      const feature = new Feature(new Point([0, 0]))
      feature.set('buffer', { width: 0, unit: 'meters' })
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(POINT)
    })
    it('Polygon near circular', () => {
      const feature = new Feature(
        new Polygon([
          [
            [0.0, -2.3125],
            [-2.0027, -1.1563],
            [-2.0027, 1.1563],
            [0.0, 2.3125],
            [2.0027, 1.1563],
            [2.0127, -1.1673],
            [0.0, -2.3125],
          ],
        ])
      )
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(POLYGON)
    })
    it('Polygon triangle', () => {
      const feature = new Feature(
        new Polygon([
          [
            [0.0, 0.0],
            [3.0, 3.0],
            [3.0, 0.0],
            [0.0, 0.0],
          ],
        ])
      )
      const actual = shapeDetector.shapeFromFeature(feature)
      expect(actual).to.equal(POLYGON)
    })
  })
})
