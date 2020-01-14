import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { LineEditorDialog } from './line-editor-dialog'
import { LINE } from 'geospatialdraw/bin/shapes/shape'

describe('<LineEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', LINE)
    startGeo.geometry.coordinates = [
      [10, 12],
      [30, 50],
      [45, 34],
      [32, 24],
      [10, 12],
    ]
    startGeo.bbox = [10, 12, 45, 50]
    const wrapper = shallow(<LineEditorDialog geo={startGeo} onOk={() => {}} />)
    expect(wrapper.exists()).to.equal(true)
  })
})
