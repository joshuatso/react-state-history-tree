"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStateHistoryTree;

var _react = _interopRequireWildcard(require("react"));

var _Node = _interopRequireDefault(require("../classes/Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useStateHistoryTree(initialState) {
  // current value
  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)(new _Node.default(initialState)),
      _useState4 = _slicedToArray(_useState3, 2),
      root = _useState4[0],
      setRoot = _useState4[1]; // current node


  var _useState5 = (0, _react.useState)(root),
      _useState6 = _slicedToArray(_useState5, 2),
      current = _useState6[0],
      setCurrent = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      atRoot = _useState8[0],
      setAtRoot = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      atLeaf = _useState10[0],
      setAtLeaf = _useState10[1];

  function addValue(newValue) {
    var newNode;

    if (newValue instanceof Function) {
      newNode = new _Node.default(newValue(value));
    } else {
      newNode = new _Node.default(newValue);
    }

    current.addChild(newNode);
    setCurrent(newNode);
  }

  function undo() {
    var toClosestFork = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var findClosestBackwardFork = function findClosestBackwardFork(node) {
      if (node == root || node.children.length > 1) {
        return node;
      } else {
        return findClosestBackwardFork(node.parent);
      }
    };

    if (current != root) {
      if (toClosestFork) {
        var node = findClosestBackwardFork(current.parent);
        setCurrent(node);
      } else {
        setCurrent(current.parent);
      }
    }
  }

  function redo() {
    var pathIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var toClosestFork = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var findClosestForwardFork = function findClosestForwardFork(node) {
      if (node.pathIndex == -1 || node.children.length > 1) {
        return node;
      } else {
        return findClosestForwardFork(node.children[node.pathIndex]);
      }
    };

    if (current != null && current.pathIndex != -1) {
      if (pathIndex === null && toClosestFork === false) {
        setCurrent(current.children[current.pathIndex]);
      } else if (pathIndex !== null && pathIndex !== undefined) {
        current.pathIndex = pathIndex;
        setCurrent(current.children[pathIndex]);
      } else {
        setCurrent(findClosestForwardFork(current.children[current.pathIndex]));
      }
    }
  }

  function getCurrentSubtree() {
    if (!current || current.children.length == 0) {
      return [];
    } else {
      return current.stripMethods().children;
    }
  }

  function getCurrentBranches() {
    if (!current || current.children.length == 0) {
      return [];
    } else {
      return current.getChildrenValues();
    }
  }

  (0, _react.useEffect)(function () {
    if (current) {
      if (current == root) {
        setAtRoot(true);
      } else {
        setAtRoot(false);
      }

      if (current.children.length == 0) {
        setAtLeaf(true);
      } else {
        setAtLeaf(false);
      }

      setValue(current.value);
    }
  }, [current]);

  function defaultKeyDownHandler(e) {
    console.log("in"); // ctrl + z and ctrl + shift + z

    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      undo();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      redo();
    }
  }

  return [value, addValue, {
    undo: undo,
    redo: redo,
    getCurrentBranches: getCurrentBranches,
    getCurrentSubtree: getCurrentSubtree,
    defaultKeyDownHandler: defaultKeyDownHandler,
    atRoot: atRoot,
    atLeaf: atLeaf
  }];
}