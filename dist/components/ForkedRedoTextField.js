"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ForkedRedoTextField;

var _react = _interopRequireWildcard(require("react"));

var _useStateHistoryTree4 = _interopRequireDefault(require("../hooks/useStateHistoryTree"));

var _DoButton = _interopRequireDefault(require("./DoButton.js"));

var _RedoCell = _interopRequireDefault(require("./RedoCell"));

require("../ForkedRedoTextField.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ForkedRedoTextField(_ref) {
  var _ref$multiline = _ref.multiline,
      multiline = _ref$multiline === void 0 ? false : _ref$multiline,
      _ref$rows = _ref.rows,
      rows = _ref$rows === void 0 ? 3 : _ref$rows,
      inputStyles = _ref.inputStyles,
      _ref$unselectedCellSt = _ref.unselectedCellStyles,
      unselectedCellStyles = _ref$unselectedCellSt === void 0 ? {} : _ref$unselectedCellSt,
      _ref$selectedCellStyl = _ref.selectedCellStyles,
      selectedCellStyles = _ref$selectedCellStyl === void 0 ? {} : _ref$selectedCellStyl,
      _ref$cellAreaStyles = _ref.cellAreaStyles,
      cellAreaStyles = _ref$cellAreaStyles === void 0 ? {} : _ref$cellAreaStyles,
      _ref$doButtonStyles = _ref.doButtonStyles,
      doButtonStyles = _ref$doButtonStyles === void 0 ? {} : _ref$doButtonStyles,
      _ref$widgetContainerS = _ref.widgetContainerStyles,
      widgetContainerStyles = _ref$widgetContainerS === void 0 ? {} : _ref$widgetContainerS;

  var _useStateHistoryTree = (0, _useStateHistoryTree4.default)(""),
      _useStateHistoryTree2 = _slicedToArray(_useStateHistoryTree, 3),
      treeValue = _useStateHistoryTree2[0],
      setTreeValue = _useStateHistoryTree2[1],
      _useStateHistoryTree3 = _useStateHistoryTree2[2],
      undo = _useStateHistoryTree3.undo,
      redo = _useStateHistoryTree3.redo,
      getCurrentBranches = _useStateHistoryTree3.getCurrentBranches,
      defaultKeyDownHandler = _useStateHistoryTree3.defaultKeyDownHandler,
      atRoot = _useStateHistoryTree3.atRoot,
      atLeaf = _useStateHistoryTree3.atLeaf;

  var widgetRef = (0, _react.useRef)(null);
  var inputRef = (0, _react.useRef)(null);
  var dummyRef = (0, _react.useRef)(null);
  var containerRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      widgetOpen = _useState2[0],
      setWidgetOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      dummyOpen = _useState4[0],
      setDummyOpen = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      branches = _useState6[0],
      setBranches = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedBranchIndex = _useState8[0],
      setSelectedBranchIndex = _useState8[1]; // used for determining styling and position of dummy, which is used for placing widget in caret position


  var _useState9 = (0, _react.useState)({}),
      _useState10 = _slicedToArray(_useState9, 2),
      completeInputStyles = _useState10[0],
      setCompleteInputStyles = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      coordinates = _useState12[0],
      setCoordinates = _useState12[1]; // adding forked redo and widget navigation functionality to default handler


  function keyDownHandler(e) {
    defaultKeyDownHandler(e); // open widget

    if ((e.metaKey || e.ctrlKey) && e.key === 'y' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      setBranches(getCurrentBranches().map(function (branch) {
        return branch.value;
      }));
      setWidgetOpen(true);
      setDummyOpen(true);
    } else if (widgetOpen && (e.key === 'Left' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      e.stopPropagation(); // start from right if selected does not exist yet

      if (!selectedBranchIndex) {
        setSelectedBranchIndex(branches.length - 1);
      } else {
        setSelectedBranchIndex(function (prevIndex) {
          return (prevIndex - 1) % branches.length;
        });
      }
    } else if (widgetOpen && (e.key === 'Right' || e.key === 'ArrowRight')) {
      e.preventDefault();
      e.stopPropagation(); // start from left if selected does not exist yet

      if (selectedBranchIndex === null) {
        setSelectedBranchIndex(0);
      } else {
        setSelectedBranchIndex(function (prevIndex) {
          return (prevIndex + 1) % branches.length;
        });
      }
    } else if (widgetOpen && selectedBranchIndex !== null && e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      redo(selectedBranchIndex);
      inputRef.current.focus();
      closeWidget();
    } else {
      setWidgetOpen(false);
    }
  }

  function closeWidget() {
    setWidgetOpen(false);
  } // closes widget on click away


  (0, _react.useEffect)(function () {
    var clickHandler = function clickHandler(e) {
      if (!widgetRef.current.contains(e.target)) {
        closeWidget();
      }
    };

    if (widgetRef.current) {
      document.addEventListener("click", clickHandler);
    }

    return function () {
      document.removeEventListener("click", clickHandler);
    };
  }, [widgetRef]); // reset selected branch on widget close

  (0, _react.useEffect)(function () {
    if (!widgetOpen) {
      setSelectedBranchIndex(null);
    }
  }, [widgetOpen]); // convert CSSStyleDeclaration to jsx style object

  (0, _react.useEffect)(function () {
    if (inputRef.current) {
      var styles = _objectSpread({}, window.getComputedStyle(inputRef.current)); // filter out all indexed properties


      for (var i = 0; i < 316; i++) {
        delete styles[i];
      } // capitalize all properties starting with webkit


      var webkitStyleEntries = Object.entries(styles).filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        return key.match(/webkit/);
      });

      var _iterator = _createForOfIteratorHelper(webkitStyleEntries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          delete styles[key];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var upperWebkitStyleEntries = webkitStyleEntries.map(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return ["W".concat(key.slice(1)), value];
      });
      setCompleteInputStyles(_objectSpread(_objectSpread({}, styles), Object.fromEntries(upperWebkitStyleEntries)));
    }
  }, [inputRef, inputStyles]); // relay coordinates of dummy to widget

  (0, _react.useLayoutEffect)(function () {
    if (dummyRef.current) {
      var top = dummyRef.current.offsetTop + dummyRef.current.offsetHeight > inputRef.current.offsetHeight ? inputRef.current.offsetHeight : dummyRef.current.offsetTop + dummyRef.current.offsetHeight;
      setCoordinates({
        left: dummyRef.current.offsetLeft,
        top: top
      });
      setDummyOpen(false);
    }
  }, [dummyRef, dummyOpen]); // change orientation of widget based on window size

  var resizeHandler = (0, _react.useCallback)(function () {
    if (widgetRef.current && containerRef.current && coordinates) {
      var containerOffset = containerRef.current.getBoundingClientRect();

      if (containerOffset.top + coordinates.top + widgetRef.current.offsetHeight > window.innerHeight) {
        widgetRef.current.style.top = "".concat(coordinates.top - widgetRef.current.offsetHeight, "px");
      } else {
        widgetRef.current.style.top = "".concat(coordinates.top, "px");
      }
    }
  }, [widgetRef, coordinates, containerRef]);
  (0, _react.useLayoutEffect)(function () {
    resizeHandler();
  }, [widgetRef, widgetOpen, selectedBranchIndex, coordinates]);
  (0, _react.useLayoutEffect)(function () {
    window.addEventListener("resize", resizeHandler);
    return function () {
      window.removeEventListener("resize", resizeHandler);
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: "relative"
    },
    ref: containerRef
  }, multiline ? /*#__PURE__*/_react.default.createElement("textarea", {
    ref: inputRef,
    style: inputStyles ? _objectSpread({
      resize: "none"
    }, inputStyles) : {
      resize: "none"
    },
    rows: rows,
    value: treeValue,
    onChange: function onChange(e) {
      return setTreeValue(e.target.value);
    },
    onKeyDown: keyDownHandler
  }) : /*#__PURE__*/_react.default.createElement("input", {
    ref: inputRef,
    style: inputStyles,
    value: treeValue,
    onChange: function onChange(e) {
      return setTreeValue(e.target.value);
    },
    onKeyDown: keyDownHandler
  }), dummyOpen ? /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread(_objectSpread({}, completeInputStyles), {}, {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -100,
      overflow: "auto"
    })
  }, treeValue, /*#__PURE__*/_react.default.createElement("span", {
    ref: dummyRef
  })) : null, /*#__PURE__*/_react.default.createElement("div", {
    ref: widgetRef,
    style: _objectSpread(_objectSpread({}, coordinates), {}, {
      boxSizing: "border-box",
      position: "absolute",
      border: "0.5px solid LightGrey",
      borderRadius: "3px",
      zIndex: 100,
      display: widgetOpen && !(atRoot && atLeaf) ? "flex" : "none",
      flexDirection: "row"
    }, widgetContainerStyles)
  }, /*#__PURE__*/_react.default.createElement(_DoButton.default, {
    type: "left",
    doButtonStyles: doButtonStyles,
    disabled: atRoot,
    onClick: function onClick() {
      undo(true);
      inputRef.current.focus();
      closeWidget();
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      boxSizing: "border-box",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: "326px",
      maxHeight: "326px",
      overflowY: "auto",
      backgroundColor: "white"
    }, cellAreaStyles)
  }, branches.map(function (branch, index) {
    return /*#__PURE__*/_react.default.createElement(_RedoCell.default, {
      value: branch,
      key: "".concat(index, "RedoCell"),
      index: index,
      selectedCellStyles: selectedCellStyles,
      unselectedCellStyles: unselectedCellStyles,
      onClick: function onClick(e) {
        return setSelectedBranchIndex(index);
      },
      onSubmit: function onSubmit() {
        redo(index);
        inputRef.current.focus();
        closeWidget();
      },
      selected: index == selectedBranchIndex
    });
  })), /*#__PURE__*/_react.default.createElement(_DoButton.default, {
    type: "right",
    doButtonStyles: doButtonStyles,
    disabled: atLeaf,
    onClick: function onClick() {
      redo(null, true);
      inputRef.current.focus();
      closeWidget();
    }
  })));
}