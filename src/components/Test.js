import React, {useState, useRef} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import ForkedRedoTextField from "./ForkedRedoTextField"

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
            <div onKeyDown={defaultKeyDownHandler} tabindex="0">
                <div style={{backgroundColor: color, color: "white"}}>{color}</div>
                <button onClick={() => setColor(prevColor => "blue")}>blue</button>
                <button onClick={() => setColor("red")}>red</button>
                <button onClick={() => setColor("green")}>green</button>
            </div>
            <ForkedRedoTextField multiline></ForkedRedoTextField>
        </>
    );
  };
