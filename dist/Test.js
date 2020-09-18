import React, { useState, useRef } from 'react';
import useStateHistoryTree from "../hooks/useStateHistoryTree";
import { TextField, Button } from "@material-ui/core";
import CSSBaseline from "@material-ui/core/CssBaseline";
import ForkedRedoTextField from "./ForkedRedoTextField";
export default function Test() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CSSBaseline, null), /*#__PURE__*/React.createElement(ForkedRedoTextField, {
    multiline: true
  }));
}