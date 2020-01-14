"use strict";

const SourceVector = require('ol/source/Vector').default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MockDrawingContext =
/*#__PURE__*/
function () {
  function MockDrawingContext() {
    var _this = this;

    _classCallCheck(this, MockDrawingContext);

    _defineProperty(this, "methodCalls", {});

    _defineProperty(this, "source", null);

    this.source = new SourceVector();
    this.methodCalls = {};
    var methodList = ['addInteractions', 'addInteractionsWithoutModify', 'getStyle', 'remakeInteractions', 'removeFeature', 'removeInteractions', 'removeListeners', 'setDrawInteraction', 'setEvent', 'setModifyInteraction', 'updateBufferFeature', 'updateFeature'];
    methodList.forEach(function (functionName) {
      _this.methodCalls[functionName] = [];

      _this[functionName] = function () {
        this.methodCalls[functionName].push(arguments);
      };
    });
    var callCounter = this.getStyle.bind(this);

    this.getStyle = function () {
      callCounter();
      return [];
    };
  }

  _createClass(MockDrawingContext, [{
    key: "getSource",
    value: function getSource() {
      return this.source;
    }
  }, {
    key: "getMethodCalls",
    value: function getMethodCalls() {
      return this.methodCalls;
    }
  }, {
    key: "circleRadiusToMeters",
    value: function circleRadiusToMeters(number) {
      return radius;
    }
  }]);

  return MockDrawingContext;
}();

var _default = MockDrawingContext;
exports.default = _default;
