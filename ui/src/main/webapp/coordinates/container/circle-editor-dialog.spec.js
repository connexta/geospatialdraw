import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { LAT_LON } from 'geospatialdraw/bin/coordinates/units'
import { CircleEditorDialog } from './circle-editor-dialog'
import { POINT_RADIUS } from 'geospatialdraw/bin/shapes/shape'

describe('<CircleEditorDialog />', () => {
  it('render', () => {
    const startGeo = makeEmptyGeometry('', POINT_RADIUS)
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
