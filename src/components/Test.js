import React, {useState, useRef} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import {TextField, Button} from "@material-ui/core"
import CSSBaseline from "@material-ui/core/CssBaseline"
import RedoBranchesWidget from "./RedoBranchesWidget"

export default function Test() {
    const [value, setValue, undo, redo, getCurrentBranches, defaultKeyDownHandler] = useStateHistoryTree("")
    const [widgetOpen, setWidgetOpen] = useState(false)
    const [branches, setBranches] = useState([])

    function keyDownHandler(e) {
        defaultKeyDownHandler(e)
        if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'y' && !e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            setBranches(getCurrentBranches().map(branch => branch.value))
            setWidgetOpen(true)
        }
    }

    return (
        <div>
            <CSSBaseline/>
            <TextField value={value} onChange={e => setValue(e.target.value)} onKeyDown={keyDownHandler}></TextField>
            {widgetOpen && <RedoBranchesWidget branches={branches} redo={redo} open={widgetOpen} onClose={() => setWidgetOpen(false)}></RedoBranchesWidget>}
        </div>
    )
}
