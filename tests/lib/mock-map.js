"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MockMap =
/*#__PURE__*/
function () {
  function MockMap() {
    _classCallCheck(this, MockMap);

    _defineProperty(this, "testData", null);

    this.testData = {
      layerCount: 0,
      interactions: {},
      interactionsCount: 0,
      layers: [],
      eventListeners: {
        pointerdrag: new Set(),
        mousemove: new Set()
      }
    };
  }

  _createClass(MockMap, [{
    key: "addInteraction",
    value: function addInteraction(i) {
      this.testData.interactions[i] = i;
      this.testData.interactionsCount++;
    }
  }, {
    key: "removeInteraction",
    value: function removeInteraction(i) {
      this.testData.interactions[i];
      this.testData.interactionsCount--;
    }
  }, {
    key: "addLayer",
    value: function addLayer(layer) {
      this.testData.layerCount++;
      this.testData.layers.push(layer);
    }
  }, {
    key: "getTestData",
    value: function getTestData() {
      return this.testData;
    }
  }, {
    key: "on",
    value: function on(event, listener) {
      this.testData.eventListeners[event].add(listener);
    }
  }, {
    key: "un",
    value: function un(event, listener) {
      this.testData.eventListeners[event].delete(listener);
    }
  }]);

  return MockMap;
}();

var _default = MockMap;
exports.default = _default;
