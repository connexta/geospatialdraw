import '../../internal/tests'
import * as React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import CoordinateListEditor from './coordinate-list-editor'
import { LAT_LON } from 'geospatialdraw/bin/coordinates/units'
import { METERS } from 'geospatialdraw/bin/geometry/units'

// describe('<CoordinateListEditor />', () => {
//   it('render', () => {
//     const wrapper = shallow(
//       <CoordinateListEditor
//         coordinateList={[[10, 12], [30, 50], [45, 34], [32, 24], [10, 12]]}
//         coordinateUnit={LAT_LON}
//         buffer={5}
//         bufferUnit={METERS}
//         onChange={() => {}}
//       />
//     )
//     expect(wrapper.exists()).to.equal(true)
//   })
// })
