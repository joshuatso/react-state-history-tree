import React from 'react'

export default function RedoCell({value, index, selectedCellStyles, unselectedCellStyles, onClick, onSubmit, selected}) {
    return (
        <div 
            onClick={onClick} 
            style={{
                maxWidth: "calc(100% - 4px)",
                margin: "2px",
                borderRadius: "2px",
                cursor: "default"
            }}
        >
            <button 
                style={{
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
                }}
                onClick={onSubmit}
            >
                <div 
                    style={{
                        maxWidth:"320px",
                        maxHeight: "320px",
                        padding: "3px",
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        hyphens: "auto",
                        borderRadius: "2px",
                        backgroundColor: "#005ce6",
                        color: "white",
                        ...selectedCellStyles
                    }}
                >
                    <span style={{marginRight: "2px", fontSize: "10px"}}>{index+1}</span>
                    {value}
                </div>
            </button>
            <div 
                style={{
                    maxWidth: "50px",
                    padding: "3px",
                    display: selected ? "none" : "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    ...unselectedCellStyles
                }}
            >
                <span style={{marginRight: "2px", fontSize: "10px", color: "grey"}}>{index+1}</span>
                <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{value}</span>
            </div>
        </div>
    )
}
