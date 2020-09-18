import React, {useState, useRef} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import ForkedRedoTextField from "./ForkedRedoTextField"
import CSSBaseline from "@material-ui/core/CssBaseline"

export default function Test() {
    const [color, setColor, 
              {
                  undo, 
                  redo, 
                  getCurrentBranches, 
                  getCurrentSubtree, 
                  defaultKeyDownHandler, 
                  atRoot, 
                  atLeaf
              }
          ] = useStateHistoryTree("blue")
          
    return (
        <>
        <CSSBaseline/>
      <div onKeyDown={defaultKeyDownHandler} tabindex="0">
          <div style={{backgroundColor: color}}>{color}</div>
          <button onClick={() => setColor(prevColor => "blue")}>blue</button>
          <button onClick={() => setColor("red")}>red</button>
          <button onClick={() => setColor("green")}>green</button>
      </div>
      <div style={{margin: "200px"}}>
      <ForkedRedoTextField multiline></ForkedRedoTextField>
      </div>
      </>
    );
  };
