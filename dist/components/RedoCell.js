"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RedoCell;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function RedoCell(_ref) {
  var value = _ref.value,
      index = _ref.index,
      selectedCellStyles = _ref.selectedCellStyles,
      unselectedCellStyles = _ref.unselectedCellStyles,
      onClick = _ref.onClick,
      onSubmit = _ref.onSubmit,
      selected = _ref.selected;
  return /*#__PURE__*/_react.default.createElement("div", {
    onClick: onClick,
    style: {
      maxWidth: "calc(100% - 4px)",
      margin: "2px",
      borderRadius: "2px",
      cursor: "default"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    style: {
      all: "unset",
      boxSizing: "border-box",
      display: selected ? "block" : "none",
      backgroundColor: "#00000000",
      border: "none",
      color: "white",
      cursor: "pointer",
      textDecoration: "none",
      padding: 0,
      margin: 0
    },
    onClick: onSubmit
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      maxWidth: "320px",
      maxHeight: "320px",
      padding: "3px",
      overflowWrap: "break-word",
      wordWrap: "break-word",
      hyphens: "auto",
      borderRadius: "2px",
      backgroundColor: "#005ce6",
      color: "white"
    }, selectedCellStyles)
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginRight: "2px",
      fontSize: "10px"
    }
  }, index + 1), value)), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      maxWidth: "50px",
      padding: "3px",
      display: selected ? "none" : "flex",
      flexDirection: "row",
      alignItems: "baseline"
    }, unselectedCellStyles)
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      marginRight: "2px",
      fontSize: "10px",
      color: "grey"
    }
  }, index + 1), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, value)));
}