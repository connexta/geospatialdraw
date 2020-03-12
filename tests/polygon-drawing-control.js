require('./lib/ol-tests')
const Feature = require('ol/Feature').default
const Polygon = require('ol/geom/Polygon').default
const { expect } = require('chai')
const MockDrawingContext = require('./lib/mock-drawing-context').default
const PolygonDrawingControl = require('../distribution/drawing/openlayers/polygon-drawing-control')
  .default
const { POLYGON } = require('../distribution/shapes')
const { METERS } = require('../distribution/geometry')

describe('PolygonDrawingControl', () => {
  const makeFeature = () =>
    new Feature({
      geometry: new Polygon([
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ]),
      color: 'blue',
      shape: POLYGON,
      id: '',
      buffer: {
        width: 0,
        unit: METERS,
      },
    })
  const makeGeoJSON = () => ({
    type: 'Feature',
    properties: {
      color: 'blue',
      shape: POLYGON,
      id: '',
      buffer: {
        width: 0,
        unit: METERS,
      },
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [50, 50],
          [10, 10],
          [20, 20],
          [50, 50],
        ],
      ],
    },
    bbox: [10, 10, 50, 50],
  })
  let context = null
  let recievedGeo = null
  const receiver = geoJSON => {
    recievedGeo = geoJSON
  }
  let control = null
  beforeEach(() => {
    recievedGeo = null
    context = new MockDrawingContext()
    control = new PolygonDrawingControl(context, receiver)
  })
  describe('constructor', () => {
    it('default', () => {
      expect(control).to.not.equal(undefined)
      expect(control).to.not.equal(null)
    })
  })
  describe('onCompleteDrawing', () => {
    it('default', () => {
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expected.properties.color = ''
      expect(recievedGeo).to.deep.equal(expected)
      expect(context.getMethodCalls().updateFeature.length).to.equal(1)
    })
    it('startDrawing -> onCompleteDrawing', () => {
      const startGeo = makeGeoJSON()
      startGeo.geometry.coordinates = [
        [
          [88, 5],
          [22, 15],
          [64, 20],
          [88, 5],
        ],
      ]
      control.startDrawing()
      control.setGeo(startGeo)
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(recievedGeo).to.deep.equal(expected)
    })
  })
  describe('onCompleteModify', () => {
    it('default', () => {
      control.onCompleteModify({
        features: {
          getArray: () => [makeFeature()],
        },
      })
      const expected = makeGeoJSON()
      expected.properties.color = ''
      expect(recievedGeo).to.deep.equal(expected)
    })
  })
  describe('setGeo', () => {
    it('default', () => {
      control.setGeo(makeGeoJSON())
      expect(context.getMethodCalls().updateFeature.length).to.equal(1)
      expect(context.getMethodCalls().removeFeature.length).to.equal(0)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('setProperties', () => {
    it('buffer.unit still valid value', () => {
      control.setGeo(makeGeoJSON())
      control.setProperties({
        someProp: 'some value',
      })
      control.onCompleteModify({
        features: {
          getArray: () => [makeFeature()],
        },
      })
      expect(recievedGeo.properties).to.deep.equal({
        buffer: {
          width: 0,
          unit: METERS,
        },
        color: '',
        id: '',
        someProp: 'some value',
        shape: POLYGON,
      })
    })
  })
  describe('startDrawing', () => {
    it('default', () => {
      control.startDrawing()
      expect(context.getMethodCalls().addInteractions.length).to.equal(1)
      expect(context.getMethodCalls().setEvent.length).to.equal(4)
      expect(context.getMethodCalls().setDrawInteraction.length).to.equal(1)
      expect(context.getMethodCalls().updateFeature.length).to.equal(0)
      expect(context.getMethodCalls().removeFeature.length).to.equal(1)
      expect(control.isDrawing()).to.equal(true)
    })
  })
  describe('cancelDrawing', () => {
    it('default', () => {
      control.cancelDrawing()
      expect(context.getMethodCalls().removeListeners.length).to.equal(1)
      expect(context.getMethodCalls().removeInteractions.length).to.equal(1)
      expect(control.isDrawing()).to.equal(false)
    })
  })
})
