import React, {useState, useEffect, useCallback} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import ForkedRedoTextField from "./ForkedRedoTextField"
import CssBaseline from "@material-ui/core/CssBaseline"

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

    const ColorButton = ({buttonColor}) => 
        <button onClick={() => setColor(buttonColor, color != buttonColor)}>
            {buttonColor}
        </button>

    useEffect(() => {
        window.addEventListener("keydown", defaultKeyDownHandler)
        return () => {
            window.removeEventListener("keydown", defaultKeyDownHandler)
        }
    })

    return (
        <>
            <CssBaseline/>
            <div style={{backgroundColor: color, color: "white"}}>{color}</div>
            <ColorButton buttonColor="yellow"></ColorButton>
            <ColorButton buttonColor="blue"></ColorButton>
            <ColorButton buttonColor="red"></ColorButton>
            <ColorButton buttonColor="green"></ColorButton>
            <div style={{margin: "200px"}}>
                <ForkedRedoTextField multiline></ForkedRedoTextField>
            </div>
        </>
    );
};
