const { testHook } = require('./lib/react-tests')
const { expect } = require('chai')
const useGeometryJSONMemo = require('../distribution/geometry/memo').default
const { makeBBoxGeo } = require('../distribution/geometry/shape-factory')
const React = require('react').default
const { useEffect } = require('react')

const useGeometryChanged = (geometry, onChange) => {
  const memo = useGeometryJSONMemo(geometry)
  useEffect(() => {
    onChange(geometry)
  }, [memo])
}

describe('useGeometryJSONMemo', () => {
  it('coordinates and properties memoized', done => {
    testHook(() => {
      const memo = useGeometryJSONMemo(
        makeBBoxGeo('test', [0, 0, 50, 60], { color: 'blue' })
      )
      expect(memo.coordinates[2][0]).to.equal(50)
      expect(memo.coordinates[2][1]).to.equal(60)
      expect(JSON.parse(memo.properties).color).to.equal('blue')
      done()
    })
  })
  describe('combined with useEffect', () => {
    it('geometry changed', done => {
      let count = 0
      const onChange = updated => {
        if (count++ > 0) {
          const expected = makeBBoxGeo('test', [0, 0, 50, 60])
          expect(updated).to.deep.equal(expected)
          done()
        }
      }
      const wrapper = testHook(
        ({ geometry }) => {
          useGeometryChanged(geometry, onChange)
        },
        {
          geometry: makeBBoxGeo('test', [0, 0, 40, 40]),
        }
      )
      wrapper.setProps({
        params: {
          geometry: makeBBoxGeo('test', [0, 0, 50, 60]),
        },
      })
      wrapper.update()
    })
  })
})
