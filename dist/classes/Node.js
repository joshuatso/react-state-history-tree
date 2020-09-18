"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// represents one state in tree
var Node = /*#__PURE__*/function () {
  function Node() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Node);

    this.value = value;
    this.children = [];
    this.parent = parent;
    this.pathIndex = -1;
  }

  _createClass(Node, [{
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "getChildrenValues",
    value: function getChildrenValues() {
      return this.children.map(function (child, index) {
        return {
          index: index,
          value: child.value
        };
      });
    }
  }, {
    key: "stripMethods",
    value: function stripMethods() {
      return {
        value: this.value,
        children: this.children.map(function (child, index) {
          return _objectSpread({
            index: index
          }, child.stripMethods());
        }),
        pathIndex: this.pathIndex
      };
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      child.parent = this;
      this.children.push(child);
      this.pathIndex = this.children.length - 1;
    }
  }]);

  return Node;
}();

exports.default = Node;