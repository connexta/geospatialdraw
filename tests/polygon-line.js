const {
  coordinateArrayValueToLatLon,
  polygonPropsToGeo,
  linePropsToGeo,
  geoToPolygonProps,
  geoToLineProps,
} = require('../distribution/coordinates/geometry/polygon-line')
const { expect } = require('chai')
const { makeEmptyGeometry, METERS } = require('../distribution/geometry')
const { POLYGON, LINE } = require('../distribution/shapes')

describe('polygonPropsToGeo', () => {
  it('default', () => {
    const geo = polygonPropsToGeo({
      id: 'test',
      coordinates: [
        [40, 30],
        [23, 23],
        [33, 35],
      ],
      buffer: 5,
      bufferUnit: METERS,
      properties: {
        randomProp: 'example',
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.geometry.coordinates).to.deep.equal([
      [
        [40, 30],
        [23, 23],
        [33, 35],
        [40, 30],
      ],
    ])
    expect(geo.properties.randomProp).to.equal('example')
    expect(geo.properties.buffer.width).to.equal(5)
    expect(geo.properties.buffer.unit).to.equal(METERS)
  })
})
describe('geoToPolygonProps', () => {
  it('default', () => {
    const geo = makeEmptyGeometry('someId', POLYGON)
    geo.geometry.coordinates = [
      [
        [40, 30],
        [23, 23],
        [33, 35],
        [40, 30],
      ],
    ]
    geo.properties.randomProp = 67
    geo.properties.buffer = {
      width: 500000,
      unit: METERS,
    }
    const {
      id,
      coordinates,
      buffer,
      bufferUnit,
      properties,
    } = geoToPolygonProps(geo)
    expect(id).to.equal('someId')
    expect(coordinates).to.deep.equal([
      [40, 30],
      [23, 23],
      [33, 35],
    ])
    expect(buffer).to.equal(500000)
    expect(bufferUnit).to.equal(METERS)
    expect(properties.randomProp).to.equal(67)
  })
})
describe('linePropsToGeo', () => {
  it('default', () => {
    const geo = linePropsToGeo({
      id: 'test',
      coordinates: [
        [40, 30],
        [23, 23],
        [33, 35],
      ],
      buffer: 5,
      bufferUnit: METERS,
      properties: {
        randomProp: 'example',
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.geometry.coordinates).to.deep.equal([
      [40, 30],
      [23, 23],
      [33, 35],
    ])
    expect(geo.properties.randomProp).to.equal('example')
    expect(geo.properties.buffer.width).to.equal(5)
    expect(geo.properties.buffer.unit).to.equal(METERS)
  })
})
describe('geoToLineProps', () => {
  it('default', () => {
    const geo = makeEmptyGeometry('someId', POLYGON)
    geo.geometry.coordinates = [
      [40, 30],
      [23, 23],
      [33, 35],
    ]
    geo.properties.randomProp = 67
    geo.properties.buffer = {
      width: 500000,
      unit: METERS,
    }
    const { id, coordinates, buffer, bufferUnit, properties } = geoToLineProps(
      geo
    )
    expect(id).to.equal('someId')
    expect(coordinates).to.deep.equal([
      [40, 30],
      [23, 23],
      [33, 35],
    ])
    expect(buffer).to.equal(500000)
    expect(bufferUnit).to.equal(METERS)
    expect(properties.randomProp).to.equal(67)
  })
})
describe('coordinateArrayValueToLatLon', () => {
  it('default', () => {
    const { lat, lon } = coordinateArrayValueToLatLon([88, -11])
    expect(lat).to.equal(-11)
    expect(lon).to.equal(88)
  })
})
