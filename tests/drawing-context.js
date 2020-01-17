require('./lib/ol-tests')
const Feature = require('ol/Feature').default
const Style = require('ol/style/Style').default
const ExtentInteraction = require('ol/interaction/Extent').default
const Polygon = require('ol/geom/Polygon').default
const { expect } = require('chai')
const MockMap = require('./lib/mock-map').default
const DrawingContext = require('../bin/drawing/openlayers/drawing-context')
  .default
const { makeEmptyGeometry } = require('../bin/geometry')

const DRAW_LAYER_INDEX = 2
const BUFFER_LAYER_INDEX = 1

describe('DrawingContext', () => {
  let context = null
  let map = null
  beforeEach(() => {
    map = new MockMap()
    context = new DrawingContext({
      map,
      drawingStyle: new Style(),
    })
  })
  describe('constructor', () => {
    it('default', () => {
      expect(map.getTestData().layerCount).to.equal(3)
      expect(map.getTestData().interactionsCount).to.equal(0)
    })
  })
  describe('updateFeature', () => {
    it('default', () => {
      const geometry = new Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new Feature(geometry)
      const source = map.getTestData().layers[DRAW_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      context.updateFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      context.updateFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
    })
  })
  describe('updateBufferFeature', () => {
    it('no buffer', () => {
      const geometry = new Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new Feature(geometry)
      const source = map.getTestData().layers[BUFFER_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(0)
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(0)
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
      context.removeListeners()
      expect(source.getFeatures().length).to.equal(0)
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
    })
    it('has buffer', () => {
      const geometry = new Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new Feature({
        geometry,
        buffer: {
          width: 1,
          unit: 'meters',
        },
      })
      const source = map.getTestData().layers[BUFFER_LAYER_INDEX].getSource()
      expect(source.getFeatures().length).to.equal(0)
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      context.updateBufferFeature(feature)
      expect(source.getFeatures().length).to.equal(1)
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(1)
      context.removeListeners()
      context.removeInteractions()
      expect(source.getFeatures().length).to.equal(0)
      expect(map.getTestData().eventListeners['pointerdrag'].size).to.equal(0)
    })
  })
  describe('setEvent', () => {
    it('snap', () => {
      context.setEvent('snap', 'event', () => {})
      context.removeListeners()
    })
    it('modify', () => {
      context.setEvent('modify', 'event', () => {})
      context.removeListeners()
    })
    it('draw', () => {
      context.setDrawInteraction(new ExtentInteraction())
      context.setEvent('draw', 'event', () => {})
      context.removeListeners()
    })
  })
  describe('removeListeners', () => {
    it('default', () => {
      context.setDrawInteraction(new ExtentInteraction())
      context.setEvent('snap', 'event', () => {})
      context.setEvent('draw', 'event', () => {})
      context.setEvent('modify', 'event', () => {})
      context.removeListeners()
    })
  })
  describe('addInteractions', () => {
    it('without draw interaction', () => {
      context.addInteractions()
      expect(map.getTestData().interactionsCount).to.equal(2)
    })
    it('with draw interaction', () => {
      context.setDrawInteraction(new ExtentInteraction())
      context.addInteractions()
      expect(map.getTestData().interactionsCount).to.equal(3)
    })
  })
  describe('addInteractionsWithoutModify', () => {
    it('without draw interaction', () => {
      context.addInteractionsWithoutModify()
      expect(map.getTestData().interactionsCount).to.equal(1)
    })
    it('with draw interaction', () => {
      context.setDrawInteraction(new ExtentInteraction())
      context.addInteractionsWithoutModify()
      expect(map.getTestData().interactionsCount).to.equal(2)
    })
  })
  describe('removeInteractions', () => {
    it('default', () => {
      const geometry = new Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ])
      const feature = new Feature(geometry)
      const source = map.getTestData().layers[0].getSource()
      context.updateFeature(feature)
      context.addInteractions()
      context.removeInteractions()
      expect(map.getTestData().interactionsCount).to.equal(0)
    })
  })
})
