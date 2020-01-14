import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { PolygonEditorDialog } from './polygon-editor-dialog'
import { LINE } from 'geospatialdraw/bin/shapes/shape'

describe('<PolygonEditorDialog />', () => {
  let startGeo
  beforeEach(() => {
    startGeo = makeEmptyGeometry('', LINE)
    startGeo.geometry.coordinates = [
      [[10, 12], [30, 50], [45, 34], [32, 24], [10, 12]],
    ]
    startGeo.bbox = [10, 12, 45, 50]
  })
  it('render', () => {
    const wrapper = shallow(
      <PolygonEditorDialog geo={startGeo} onOk={() => {}} />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
