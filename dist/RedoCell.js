import React from 'react';
export default function RedoCell({
  value,
  index,
  selectedCellStyles,
  unselectedCellStyles,
  onClick,
  onSubmit,
  selected
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      maxWidth: "calc(100% - 4px)",
      margin: "2px",
      borderRadius: "2px",
      cursor: "default"
    }
  }, /*#__PURE__*/React.createElement("button", {
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
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "320px",
      maxHeight: "320px",
      padding: "3px",
      overflowWrap: "break-word",
      wordWrap: "break-word",
      hyphens: "auto",
      borderRadius: "2px",
      backgroundColor: "#005ce6",
      color: "white",
      ...selectedCellStyles
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: "2px",
      fontSize: "10px"
    }
  }, index + 1), value)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "50px",
      padding: "3px",
      display: selected ? "none" : "flex",
      flexDirection: "row",
      alignItems: "baseline",
      ...unselectedCellStyles
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: "2px",
      fontSize: "10px",
      color: "grey"
    }
  }, index + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, value)));
}