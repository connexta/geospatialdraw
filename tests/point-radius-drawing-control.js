require('./lib/ol-tests')
const Feature = require('ol/Feature').default
const LineString = require('ol/geom/LineString').default
const turf = require('@turf/turf')
const { expect } = require('chai')
const MockDrawingContext = require('./lib/mock-drawing-context').default
const PointRadiusDrawingControl = require('../distribution/drawing/openlayers/point-radius-drawing-control')
  .default
const { POINT_RADIUS } = require('../distribution/shapes')
const { METERS } = require('../distribution/geometry')

describe('PointRadiusDrawingControl', () => {
  const makeCoordinates = () => [
    [50, 50],
    turf.rhumbDestination([50, 50], 70, 90, {
      units: 'meters',
    }).geometry.coordinates,
  ]
  const makeFeature = () =>
    new Feature({
      geometry: new LineString(makeCoordinates()),
      color: 'blue',
      shape: POINT_RADIUS,
      buffer: {
        width: 70,
        unit: METERS,
      },
      id: '',
    })
  const makeGeoJSON = () => ({
    type: 'Feature',
    properties: {
      color: 'blue',
      shape: POINT_RADIUS,
      buffer: {
        width: 70,
        unit: METERS,
      },
      id: '',
    },
    geometry: {
      type: 'Point',
      coordinates: [50, 50],
    },
    bbox: [50, 50, 50, 50],
  })
  const geoWithoutBBox = ({ bbox, ...rest }) => rest
  let context = null
  let recievedGeo = null
  const receiver = geoJSON => {
    recievedGeo = geoJSON
    recievedGeo.properties.buffer.width = Math.round(
      recievedGeo.properties.buffer.width
    )
  }
  let control = null
  beforeEach(() => {
    recievedGeo = null
    context = new MockDrawingContext()
    control = new PointRadiusDrawingControl(context, receiver)
  })
  describe('constructor', () => {
    it('default', () => {
      expect(control).to.not.equal(undefined)
      expect(control).to.not.equal(null)
    })
  })
  describe('onCompleteDrawing', () => {
    it('default', () => {
      control.setGeo(makeGeoJSON())
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(geoWithoutBBox(recievedGeo)).to.deep.equal(
        geoWithoutBBox(expected)
      )
      expect(recievedGeo.bbox[0]).to.be.below(expected.bbox[0])
      expect(recievedGeo.bbox[1]).to.be.below(expected.bbox[1])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
      expect(context.getMethodCalls().updateFeature.length).to.not.equal(0)
    })
    it('startDrawing -> onCompleteDrawing', () => {
      control.startDrawing()
      control.setGeo(makeGeoJSON())
      control.onCompleteDrawing({
        feature: makeFeature(),
      })
      const expected = makeGeoJSON()
      expect(geoWithoutBBox(recievedGeo)).to.deep.equal(
        geoWithoutBBox(expected)
      )
      expect(recievedGeo.bbox[0]).to.be.below(expected.bbox[0])
      expect(recievedGeo.bbox[1]).to.be.below(expected.bbox[1])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
    })
  })
  describe('onCompleteModify', () => {
    it('default', () => {
      control.setGeo(makeGeoJSON())
      control.onCompleteModify({
        features: {
          getArray: () => [makeFeature()],
        },
      })
      const expected = makeGeoJSON()
      expect(geoWithoutBBox(recievedGeo)).to.deep.equal(
        geoWithoutBBox(expected)
      )
      expect(recievedGeo.bbox[0]).to.be.below(expected.bbox[0])
      expect(recievedGeo.bbox[1]).to.be.below(expected.bbox[1])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
      expect(recievedGeo.bbox[2]).to.be.above(expected.bbox[2])
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
