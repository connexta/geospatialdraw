import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { LAT_LON, makeEmptyGeometry } from '../../geometry'
import { PointEditorDialog } from './point-editor-dialog'

describe('<PointEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', 'Line')
    startGeo.geometry.coordinates = [
      [10, 12],
      [30, 50],
      [45, 34],
      [32, 24],
      [10, 12],
    ]
    startGeo.bbox = [10, 12, 45, 50]
    const wrapper = shallow(
      <PointEditorDialog
        geo={startGeo}
        coordinateUnit={LAT_LON}
        onUpdateGeo={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
