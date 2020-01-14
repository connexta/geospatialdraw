const {
  pointPropsToGeo,
  pointRadiusPropsToGeo,
  geoToPointProps,
  geoToPointRadiusProps,
} = require('../bin/coordinates/geometry/point-circle')
const { expect } = require('chai')
const { makeEmptyGeometry, MILES, METERS } = require('../bin/geometry')
const { POINT, POINT_RADIUS } = require('../bin/shapes')

describe('pointPropsToGeo', () => {
  it('default', () => {
    const geo = pointPropsToGeo({
      id: 'test',
      lat: 15,
      lon: 20,
      properties: {
        randomProp: 'example',
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.geometry.coordinates).to.deep.equal([20, 15])
    expect(geo.properties.randomProp).to.equal('example')
  })
})
describe('geoToPointProps', () => {
  it('default', () => {
    const geo = makeEmptyGeometry('someId', POINT)
    geo.geometry.coordinates = [-5, -10]
    geo.properties.randomProp = 67
    const { id, lat, lon, properties } = geoToPointProps(geo)
    expect(id).to.equal('someId')
    expect(lat).to.equal(-10)
    expect(lon).to.equal(-5)
    expect(properties.randomProp).to.equal(67)
  })
})
describe('pointRadiusPropsToGeo', () => {
  it('default', () => {
    const geo = pointRadiusPropsToGeo({
      id: 'test',
      lat: 15,
      lon: 20,
      radius: 600,
      radiusUnit: MILES,
      properties: {
        randomProp: 'example',
      },
    })
    expect(geo.properties.id).to.equal('test')
    expect(geo.geometry.coordinates).to.deep.equal([20, 15])
    expect(geo.properties.randomProp).to.equal('example')
  })
})
describe('geoToPointRadiusProps', () => {
  it('default', () => {
    const geo = makeEmptyGeometry('', POINT_RADIUS)
    geo.geometry.coordinates = [-5, -10]
    geo.properties.randomProp = 67
    geo.properties.id = 'someId'
    geo.properties.buffer = {
      width: 50,
      unit: METERS,
    }
    const {
      id,
      lat,
      lon,
      radius,
      radiusUnit,
      properties,
    } = geoToPointRadiusProps(geo)
    expect(id).to.equal('someId')
    expect(lat).to.equal(-10)
    expect(lon).to.equal(-5)
    expect(radius).to.equal(50)
    expect(radiusUnit).to.equal(METERS)
    expect(properties.randomProp).to.equal(67)
  })
})
