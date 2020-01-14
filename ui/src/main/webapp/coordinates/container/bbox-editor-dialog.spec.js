import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { LAT_LON } from 'geospatialdraw/bin/coordinates/units'
import { POLYGON } from 'geospatialdraw/bin/shapes/shape'
import { BBoxEditorDialog } from './bbox-editor-dialog'

describe('bboxEditorDialog', () => {
  let startGeo
  beforeEach(() => {
    startGeo = makeEmptyGeometry('', POLYGON)
    startGeo.geometry.coordinates = [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]]
    startGeo.bbox = [0, 0, 0, 0]
  })
  describe('<BBoxEditorDialog />', () => {
    it('render', () => {
      const wrapper = shallow(
        <BBoxEditorDialog
          geo={startGeo}
          coordinateUnit={LAT_LON}
          onUpdateGeo={() => {}}
        />
      )
      expect(wrapper.exists()).to.equal(true)
    })
  })
})
