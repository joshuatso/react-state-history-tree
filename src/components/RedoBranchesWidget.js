import React, {useEffect, useRef, useState} from 'react'

export default function RedoBranchesWidget({anchorRef, branches, redo, open=true, onClose}) {
    const element = useRef(null)
    const [widgetOpen, setWidgetOpen] = useState(open)
    const [selectedBranchIndex, setSelectedBranchIndex] = useState(null)

    function closeWidget() {
        setWidgetOpen(false)
        onClose()
    }

    useEffect(() => {
        const clickHandler = e => {
            if (!element.current.contains(e.target)) {
                closeWidget()
            }
        }
        if (element) {
            document.addEventListener("click", clickHandler)
        }
        return () => {
            document.removeEventListener("click", clickHandler)
        }
    }, [element])

    useEffect(() => {
        setWidgetOpen(open)
    }, [open])

    return (
        <div ref={element} style={{
            boxSizing: "border-box",
            position: "relative",
            display: widgetOpen ? "inline-flex" : "none", 
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "362px",
            overflow: "hidden",
            border: "0.5px solid LightGrey",
            borderRadius: "3px"
        }}>
            {branches.map((branch, index) =>
                <div onClick={e => setSelectedBranchIndex(index)} style={{
                    maxWidth: "calc(100% - 4px)",
                    margin: "2px",
                    padding: "3px",
                    borderRadius: "2px",
                    cursor: "pointer"
                }}>
                    <div style={{
                        display: index == selectedBranchIndex ? "block" : "none",
                        width:"358px",
                        maxWidth:"100%",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                        borderRadius: "2px",
                        backgroundColor: "blue",
                        color: "white",
                    }}>
                        <span style={{marginRight: "2px", fontSize: "10px"}}>{index+1}</span>
                        {branch}
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                            <button onClick={() => {
                                console.log(index)
                                redo(index)
                                closeWidget()
                            }}>
                                Select
                            </button>
                        </div>
                    </div>
                    <div style={{
                        maxWidth: "50px",
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
    )
}
