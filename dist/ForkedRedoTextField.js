import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import useStateHistoryTree from "../hooks/useStateHistoryTree";
import DoButton from "./DoButton.js";
import RedoCell from "./RedoCell";
import '../ForkedRedoTextField.css';
export default function ForkedRedoTextField({
  multiline = false,
  inputStyles,
  unselectedCellStyles = {},
  selectedCellStyles = {},
  cellAreaStyles = {},
  doButtonStyles = {},
  widgetContainerStyles = {}
}) {
  const [treeValue, setTreeValue, {
    undo,
    redo,
    getCurrentBranches,
    defaultKeyDownHandler,
    atRoot,
    atLeaf
  }] = useStateHistoryTree("");
  const widgetRef = useRef(null);
  const inputRef = useRef(null);
  const dummyRef = useRef(null);
  const containerRef = useRef(null);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [dummyOpen, setDummyOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(null); // used for determining styling and position of dummy, which is used for placing widget in caret position

  const [completeInputStyles, setCompleteInputStyles] = useState({});
  const [coordinates, setCoordinates] = useState(null); // adding forked redo and widget navigation functionality to default handler

  function keyDownHandler(e) {
    defaultKeyDownHandler(e); // open widget

    if ((e.metaKey || e.ctrlKey) && e.key === 'y' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      setBranches(getCurrentBranches().map(branch => branch.value));
      setWidgetOpen(true);
      setDummyOpen(true);
    } else if (widgetOpen && (e.key === 'Left' || e.key === "ArrowLeft")) {
      e.preventDefault();
      e.stopPropagation(); // start from right if selected does not exist yet

      if (!selectedBranchIndex) {
        setSelectedBranchIndex(branches.length - 1);
      } else {
        setSelectedBranchIndex(prevIndex => (prevIndex - 1) % branches.length);
      }
    } else if (widgetOpen && (e.key === 'Right' || e.key === "ArrowRight")) {
      e.preventDefault();
      e.stopPropagation(); // start from left if selected does not exist yet

      if (selectedBranchIndex === null) {
        setSelectedBranchIndex(0);
      } else {
        setSelectedBranchIndex(prevIndex => (prevIndex + 1) % branches.length);
      }
    } else {
      setWidgetOpen(false);
    }
  }

  function closeWidget() {
    setWidgetOpen(false);
  } // closes widget on click away


  useEffect(() => {
    const clickHandler = e => {
      if (!widgetRef.current.contains(e.target)) {
        closeWidget();
      }
    };

    if (widgetRef.current) {
      document.addEventListener("click", clickHandler);
    }

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [widgetRef]); // reset selected branch on widget close

  useEffect(() => {
    if (!widgetOpen) {
      setSelectedBranchIndex(null);
    }
  }, [widgetOpen]); // convert CSSStyleDeclaration to jsx style object

  useEffect(() => {
    if (inputRef.current) {
      let styles = { ...window.getComputedStyle(inputRef.current)
      }; // filter out all indexed properties

      for (var i = 0; i < 316; i++) {
        delete styles[i];
      } // capitalize all properties starting with webkit


      let webkitStyleEntries = Object.entries(styles).filter(([key, value]) => key.match(/webkit/));

      for (const [key, value] of webkitStyleEntries) {
        delete styles[key];
      }

      const upperWebkitStyleEntries = webkitStyleEntries.map(([key, value]) => [`W${key.slice(1)}`, value]);
      setCompleteInputStyles({ ...styles,
        ...Object.fromEntries(upperWebkitStyleEntries)
      });
    }
  }, [inputRef, inputStyles]); // relay coordinates of dummy to widget

  useLayoutEffect(() => {
    if (dummyRef.current) {
      const top = dummyRef.current.offsetTop + dummyRef.current.offsetHeight > inputRef.current.offsetHeight ? inputRef.current.offsetHeight : dummyRef.current.offsetTop + dummyRef.current.offsetHeight;
      setCoordinates({
        left: dummyRef.current.offsetLeft,
        top: top
      });
      setDummyOpen(false);
    }
  }, [dummyRef, dummyOpen]); // change orientation of widget based on window size

  const resizeHandler = useCallback(() => {
    if (widgetRef.current && containerRef.current && coordinates) {
      const containerOffset = containerRef.current.getBoundingClientRect();

      if (containerOffset.top + coordinates.top + widgetRef.current.offsetHeight > window.innerHeight) {
        widgetRef.current.style.top = `${coordinates.top - widgetRef.current.offsetHeight}px`;
      } else {
        widgetRef.current.style.top = `${coordinates.top}px`;
      }
    }
  }, [widgetRef, coordinates, containerRef]);
  useLayoutEffect(() => {
    resizeHandler();
  }, [widgetRef, widgetOpen, selectedBranchIndex, coordinates]);
  useLayoutEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    ref: containerRef
  }, multiline ? /*#__PURE__*/React.createElement("textarea", {
    ref: inputRef,
    style: inputStyles ? {
      resize: "none",
      ...inputStyles
    } : {
      resize: "none"
    },
    rows: 5,
    value: treeValue,
    onChange: e => setTreeValue(e.target.value),
    onKeyDown: keyDownHandler
  }) : /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    style: inputStyles,
    value: treeValue,
    onChange: e => setTreeValue(e.target.value),
    onKeyDown: keyDownHandler
  }), dummyOpen ? /*#__PURE__*/React.createElement("div", {
    style: { ...completeInputStyles,
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -100,
      overflow: "auto"
    }
  }, treeValue, /*#__PURE__*/React.createElement("span", {
    ref: dummyRef
  })) : null, /*#__PURE__*/React.createElement("div", {
    ref: widgetRef,
    style: { ...coordinates,
      boxSizing: "border-box",
      position: "absolute",
      border: "0.5px solid LightGrey",
      borderRadius: "3px",
      zIndex: 100,
      display: widgetOpen && !(atRoot && atLeaf) ? "flex" : "none",
      flexDirection: "row",
      ...widgetContainerStyles
    }
  }, /*#__PURE__*/React.createElement(DoButton, {
    type: "left",
    doButtonStyles: doButtonStyles,
    disabled: atRoot,
    onClick: () => {
      undo(true);
      inputRef.current.focus();
      closeWidget();
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      boxSizing: "border-box",
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: "326px",
      maxHeight: "326px",
      overflowY: "auto",
      backgroundColor: "white",
      ...cellAreaStyles
    }
  }, branches.map((branch, index) => /*#__PURE__*/React.createElement(RedoCell, {
    value: branch,
    key: `${index}RedoCell`,
    index: index,
    selectedCellStyles: selectedCellStyles,
    unselectedCellStyles: unselectedCellStyles,
    onClick: e => setSelectedBranchIndex(index),
    onSubmit: () => {
      redo(index);
      inputRef.current.focus();
      closeWidget();
    },
    selected: index == selectedBranchIndex
  }))), /*#__PURE__*/React.createElement(DoButton, {
    type: "right",
    doButtonStyles: doButtonStyles,
    disabled: atLeaf,
    onClick: () => {
      redo(null, true);
      inputRef.current.focus();
      closeWidget();
    }
  }))));
}