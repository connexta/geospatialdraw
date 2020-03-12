const {
  bboxPropsToGeo,
  geoToBBoxProps,
  coordinatePairToBBox,
  bboxToCoordinatePair,
} = require('../distribution/coordinates/geometry/bbox')
const { expect } = require('chai')
const { makeEmptyGeometry } = require('../distribution/geometry')
const { POLYGON } = require('../distribution/shapes')

describe('bboxPropsToGeo', () => {
  it('default', () => {
    const geo = bboxPropsToGeo({
      id: 'test',
      bbox: {
        north: 10,
        east: 5,
        south: -10,
        west: -5,
      },
      properties: {
        randomProp: 'example',
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.bbox).to.deep.equal([-5, -10, 5, 10])
    expect(geo.geometry.coordinates).to.deep.equal([
      [
        [-5, -10],
        [5, -10],
        [5, 10],
        [-5, 10],
        [-5, -10],
      ],
    ])
    expect(geo.properties.randomProp).to.equal('example')
  })
  it('reversed coordinates', () => {
    const geo = bboxPropsToGeo({
      id: 'test',
      bbox: {
        north: -10,
        east: -5,
        south: 10,
        west: 5,
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.bbox).to.deep.equal([-5, -10, 5, 10])
    expect(geo.geometry.coordinates).to.deep.equal([
      [
        [-5, -10],
        [5, -10],
        [5, 10],
        [-5, 10],
        [-5, -10],
      ],
    ])
  })
  it('half reversed coordinates', () => {
    const geo = bboxPropsToGeo({
      id: 'test',
      bbox: {
        north: 10,
        east: -5,
        south: -10,
        west: 5,
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.bbox).to.deep.equal([-5, -10, 5, 10])
    expect(geo.geometry.coordinates).to.deep.equal([
      [
        [-5, -10],
        [5, -10],
        [5, 10],
        [-5, 10],
        [-5, -10],
      ],
    ])
  })
})
describe('geoToBBoxProps', () => {
  it('default', () => {
    const geo = makeEmptyGeometry('someId', POLYGON)
    geo.geometry.coordinates = [
      [
        [-5, -10],
        [5, -10],
        [5, 10],
        [-5, 10],
        [-5, -10],
      ],
    ]
    geo.bbox = [-5, -10, 5, 10]
    geo.properties.randomProp = 67
    const { id, bbox, properties } = geoToBBoxProps(geo)
    expect(id).to.equal('someId')
    expect(bbox.north).to.equal(10)
    expect(bbox.south).to.equal(-10)
    expect(bbox.east).to.equal(5)
    expect(bbox.west).to.equal(-5)
    expect(properties.randomProp).to.equal(67)
  })
})
describe('coordinatePairToBBox', () => {
  it('default', () => {
    const { north, south, east, west } = coordinatePairToBBox([
      {
        lat: 48,
        lon: -100,
      },
      {
        lat: 30,
        lon: -80,
      },
    ])
    expect(north).to.equal(48)
    expect(south).to.equal(30)
    expect(east).to.equal(-80)
    expect(west).to.equal(-100)
  })
})
describe('bboxToCoordinatePair', () => {
  it('default', () => {
    const [upperLeft, lowerRight] = bboxToCoordinatePair({
      north: 60,
      south: 15,
      east: -118,
      west: -120,
    })
    expect(upperLeft.lat).to.equal(60)
    expect(upperLeft.lon).to.equal(-120)
    expect(lowerRight.lat).to.equal(15)
    expect(lowerRight.lon).to.equal(-118)
  })
})
