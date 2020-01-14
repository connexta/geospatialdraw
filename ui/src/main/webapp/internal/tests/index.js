/** @internal */

import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })

import React from 'react'
import { mount } from 'enzyme'

const TestHook = ({ callback, params }) => {
  callback(params)
  return null
}

export const testHook = (callback, params = {}) => {
  return mount(<TestHook callback={callback} params={params} />)
}
