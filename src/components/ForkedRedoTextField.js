import React, {useEffect, useLayoutEffect, useRef, useState, useCallback} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import DoButton from "./DoButton.js"
import RedoCell from "./RedoCell"
import '../ForkedRedoTextField.css'

export default function ForkedRedoTextField({multiline=false, rows=3, inputStyles, unselectedCellStyles={}, selectedCellStyles={}, cellAreaStyles={}, doButtonStyles={}, widgetContainerStyles={}}) {
    const [treeValue, setTreeValue, {undo, redo, getCurrentBranches, defaultKeyDownHandler, atRoot, atLeaf}] = useStateHistoryTree("")
    const widgetRef = useRef(null)
    const inputRef = useRef(null)
    const dummyRef = useRef(null)
    const containerRef = useRef(null)
    const [widgetOpen, setWidgetOpen] = useState(false)
    const [dummyOpen, setDummyOpen] = useState(false)
    const [branches, setBranches] = useState([])
    const [selectedBranchIndex, setSelectedBranchIndex] = useState(null)

    // used for determining styling and position of dummy, which is used for placing widget in caret position
    const [completeInputStyles, setCompleteInputStyles] = useState({})
    const [coordinates, setCoordinates] = useState(null)

    // widget navigation functionality, returns if widget should be kept open
    function navigationHandler(e) {
        if (widgetOpen && (e.key === 'Left' || e.key === 'ArrowLeft')) {
            e.preventDefault()
            e.stopPropagation()
            // start from right if selected does not exist yet
            if (!selectedBranchIndex) {
                setSelectedBranchIndex(branches.length - 1)
            } else {
                setSelectedBranchIndex(prevIndex => (prevIndex-1)%(branches.length))
            }
            return true
        } else if (widgetOpen && (e.key === 'Right' || e.key === 'ArrowRight')) {
            e.preventDefault()
            e.stopPropagation()
            // start from left if selected does not exist yet
            if (selectedBranchIndex === null) {
                setSelectedBranchIndex(0)
            } else  {
                setSelectedBranchIndex(prevIndex => (prevIndex+1)%(branches.length))
            }
            return true
        } else if (widgetOpen && selectedBranchIndex !== null && e.key === "Enter") {
            e.preventDefault()
            e.stopPropagation()
            redo(selectedBranchIndex)
            inputRef.current.focus()
            closeWidget()
            return false
        }
        return false
    }

    // adding forked redo and widget navigation functionality to default handler
    function keyDownHandler(e) {
        defaultKeyDownHandler(e)
        const keepOpen = navigationHandler(e)
        // open widget
        if ((e.metaKey || e.ctrlKey) && e.key === 'y' && !e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            setBranches(getCurrentBranches().map(branch => branch.value))
            setWidgetOpen(true)
            setDummyOpen(true)
        } else {
            setWidgetOpen(keepOpen)
        }
    }

    function closeWidget() {
        setWidgetOpen(false)
    }

    // closes widget on click away
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

    // reset selected branch on widget close
    useEffect(() => {
        if (!widgetOpen) {
            setSelectedBranchIndex(null)
        }
    }, [widgetOpen])

    // convert CSSStyleDeclaration to jsx style object
    useEffect(() => {
        if (inputRef.current) {
            const styles = {...window.getComputedStyle(inputRef.current)}
            // filter out all numerically indexed properties
            const nonNumericalStyleEntries = Object.entries(styles).filter(([key, val]) => isNaN(key))
            // capitalize all properties starting with webkit
            const finalStyleEntries = nonNumericalStyleEntries.map(([key, value]) => key.startsWith('webkit') ? [`W${key.slice(1)}`, value] : [key, value])
            setCompleteInputStyles(Object.fromEntries(finalStyleEntries))
        }
    }, [inputRef, inputStyles])

    // relay coordinates of dummy to widget
    useLayoutEffect(() => {
        if (dummyRef.current) {
            const top = dummyRef.current.offsetTop + dummyRef.current.offsetHeight > inputRef.current.offsetHeight ? inputRef.current.offsetHeight : dummyRef.current.offsetTop + dummyRef.current.offsetHeight
            setCoordinates({left: dummyRef.current.offsetLeft, top: top})
            setDummyOpen(false)
        }
    }, [dummyRef, dummyOpen])

    // change orientation of widget based on window size
    const resizeHandler = useCallback(() => {
        if (widgetRef.current && containerRef.current && coordinates) {
            const containerOffset = containerRef.current.getBoundingClientRect()
            if (containerOffset.top + coordinates.top + widgetRef.current.offsetHeight > window.innerHeight) {
                widgetRef.current.style.top = `${coordinates.top - widgetRef.current.offsetHeight}px`
            } else {
                widgetRef.current.style.top = `${coordinates.top}px`
            }
        }
    }, [widgetRef, coordinates, containerRef])

    useLayoutEffect(() => {
        resizeHandler()
    }, [widgetRef, widgetOpen, selectedBranchIndex, coordinates])

    useLayoutEffect(() => {
        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    })

    return (
        <div style={{position: "relative"}} ref={containerRef}>
            {multiline ? 
                <textarea 
                    ref={inputRef} 
                    style={inputStyles ? {resize: "none", ...inputStyles} : {resize: "none"}} 
                    rows={rows} 
                    value={treeValue} 
                    onChange={e => setTreeValue(e.target.value)} 
                    onKeyDown={keyDownHandler}
                />
                :
                <input 
                    ref={inputRef}
                    style={inputStyles} 
                    value={treeValue} 
                    onChange={e => setTreeValue(e.target.value)} 
                    onKeyDown={keyDownHandler}
                />
            }
            {dummyOpen ? 
                <div style={{...completeInputStyles, position: "absolute", top: 0, left: 0, zIndex: -100, overflow: "auto"}}>
                    {treeValue}
                    <span ref={dummyRef}></span>
                </div> 
                : 
                null
            }
            <div 
                ref={widgetRef} 
                style={{
                    ...coordinates,
                    boxSizing: "border-box",
                    position: "absolute",
                    border: "0.5px solid LightGrey",
                    borderRadius: "3px",
                    zIndex: 100,
                    display: widgetOpen && !(atRoot && atLeaf) ? "flex" : "none",
                    flexDirection: "row",
                    ...widgetContainerStyles
                }}
                onKeyDown={navigationHandler}
                tabIndex="0"
            >
                <DoButton type={"left"} 
                    doButtonStyles={doButtonStyles} 
                    disabled={atRoot} 
                    onClick={() => {
                        undo(true)
                        inputRef.current.focus()
                        closeWidget()
                    }}
                />
                <div 
                    style={{
                        boxSizing: "border-box",
                        display: "inline-flex", 
                        flexDirection: "row",
                        flexWrap: "wrap",
                        maxWidth: "326px",
                        maxHeight: "326px",
                        overflowY: "auto",
                        backgroundColor: "white",
                        ...cellAreaStyles
                    }}
                >
                    {branches.map((branch, index) =>
                        <RedoCell value={branch}
                            key={`${index}RedoCell`} 
                            index={index}
                            selectedCellStyles={selectedCellStyles} 
                            unselectedCellStyles={unselectedCellStyles} 
                            onClick={e => setSelectedBranchIndex(index)}
                            onSubmit={() => {
                                redo(index)
                                inputRef.current.focus()
                                closeWidget()
                            }}
                            selected={index == selectedBranchIndex}
                        ></RedoCell>
                    )}
                </div>
                <DoButton type={"right"} 
                    doButtonStyles={doButtonStyles} 
                    disabled={atLeaf} 
                    onClick={() => {
                        redo(null, true)
                        inputRef.current.focus()
                        closeWidget()
                    }}
                />
            </div>
        </div>
    )
}
