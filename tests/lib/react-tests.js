'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.testHook = void 0

var Adapter = require('enzyme-adapter-react-16')

var _require = require('enzyme'),
  configure = _require.configure

configure({
  adapter: new Adapter(),
})

var React = require('react')

var _require2 = require('enzyme'),
  mount = _require2.mount

var TestHook = function TestHook(_ref) {
  var callback = _ref.callback,
    params = _ref.params
  callback(params)
  return null
}

var testHook = function testHook(callback) {
  var params =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  return mount(
    React.createElement(TestHook, {
      callback: callback,
      params: params,
    })
  )
}

exports.testHook = testHook
