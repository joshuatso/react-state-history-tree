import React, {useEffect, useRef, useState} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"

export default function RedoBranchesWidget({multiline}) {
    const [treeValue, setTreeValue, undo, redo, getCurrentBranches, defaultKeyDownHandler] = useStateHistoryTree("")
    const widgetRef = useRef(null)
    const inputRef = useRef(null)
    const dummyRef = useRef(null)
    const [widgetOpen, setWidgetOpen] = useState(false)
    const [branches, setBranches] = useState([])
    const [selectedBranchIndex, setSelectedBranchIndex] = useState(null)
    const [inputStyles, setInputStyles] = useState({})
    const [coordinates, setCoordinates] = useState(null)

    function keyDownHandler(e) {
        defaultKeyDownHandler(e)
        if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'y' && !e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            setBranches(getCurrentBranches().map(branch => branch.value))
            setWidgetOpen(true)
        } else {
            setWidgetOpen(false)
        }
    }

    function closeWidget() {
        setWidgetOpen(false)
    }

    useEffect(() => {
        const clickHandler = e => {
            if (!widgetRef.current.contains(e.target)) {
                closeWidget()
            }
        }
        if (widgetRef.current) {
            document.addEventListener("click", clickHandler)
        }
        return () => {
            document.removeEventListener("click", clickHandler)
        }
    }, [widgetRef])

    useEffect(() => {
        if (!widgetOpen) {
            setSelectedBranchIndex(null)
        }
    }, [widgetOpen])

    useEffect(() => {
        if (inputRef.current) {
            let styles = {...window.getComputedStyle(inputRef.current)}
            for (var i=0; i < 316; i++) {
                delete styles[i]
            }
            console.log(styles)
            setInputStyles(styles)
        }
    }, [inputRef])

    useEffect(() => {
        if (dummyRef.current) {
            const top = dummyRef.current.offsetTop > inputRef.current.offsetHeight ? inputRef.current.offsetHeight : dummyRef.current.offsetTop + dummyRef.current.offsetHeight
            setCoordinates({left: dummyRef.current.offsetLeft, top: top})
        }
    }, [dummyRef, treeValue])

    return (
        <>
        <div style={{position: "relative", margin: "300px"}}>
            {multiline ? 
                <textarea style={{resize: "none"}} rows={5} ref={inputRef} value={treeValue} onChange={e => setTreeValue(e.target.value)} onKeyDown={keyDownHandler}/>
                :
                <input ref={inputRef} value={treeValue} onChange={e => setTreeValue(e.target.value)} onKeyDown={keyDownHandler}/>
            }
            <div style={{...inputStyles, position: "absolute", top: 0, left: 0, zIndex: -100, overflow: "auto"}}>
                {treeValue}
                <span ref={dummyRef}></span>
            </div>
            <div ref={widgetRef} style={{
            ...coordinates,
            boxSizing: "border-box",
            position: "absolute",
            display: widgetOpen ? "inline-flex" : "none", 
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "326px",
            maxHeight: "326px",
            overflowY: "auto",
            border: "0.5px solid LightGrey",
            borderRadius: "3px",
            backgroundColor: "white",
            zIndex: 100
            }}>
                {branches.map((branch, index) =>
                    <div onClick={e => setSelectedBranchIndex(index)} style={{
                        maxWidth: "calc(100% - 4px)",
                        margin: "2px",
                        borderRadius: "2px",
                        cursor: "default"
                    }}>
                        <button style={{
                                    all: "unset",
                                    boxSizing: "border-box",
                                    display: index == selectedBranchIndex ? "block" : "none",
                                    backgroundColor: "#00000000",
                                    border: "none",
                                    color: "white",
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    padding: 0,
                                    margin: 0
                                }}
                                    onClick={() => {
                                    redo(index)
                                    inputRef.current.focus()
                                    closeWidget()
                                }}>
                            <div style={{
                                maxWidth:"320px",
                                maxHeight: "320px",
                                padding: "3px",
                                overflowWrap: "break-word",
                                wordWrap: "break-word",
                                hyphens: "auto",
                                borderRadius: "2px",
                                backgroundColor: "#005ce6",
                                color: "white",
                            }}>
                                <span style={{marginRight: "2px", fontSize: "10px"}}>{index+1}</span>
                                {branch}
                            </div>
                        </button>
                        <div style={{
                            maxWidth: "50px",
                            padding: "3px",
                            display: index == selectedBranchIndex ? "none" : "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                        }}
                        >
                            <span style={{marginRight: "2px", fontSize: "10px", color: "grey"}}>{index+1}</span>
                            <span style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>{branch}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
