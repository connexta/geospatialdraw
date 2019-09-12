import '../../internal/tests'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { LAT_LON, makeEmptyGeometry } from '../../geometry'
import { CircleEditorDialog } from './circle-editor-dialog'

describe('<CircleEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', 'Point Radius')
    startGeo.geometry.coordinates = [10, 50]
    startGeo.bbox = [10, 50, 10, 50]
    const wrapper = shallow(
      <CircleEditorDialog
        geo={startGeo}
        coordinateUnit={LAT_LON}
        onUpdateGeo={() => {}}
      />
    )
    expect(wrapper.exists()).to.equal(true)
  })
})
