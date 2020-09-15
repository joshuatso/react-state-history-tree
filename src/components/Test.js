import React, {useState, useRef} from 'react'
import useHistoryTree from "../hooks/useHistoryTree"
import {TextField, Button} from "@material-ui/core"

export default function Test() {
    const [value, setValue, undo, redo, getCurrentForks, defaultKeyDownHandler] = useHistoryTree("")

    return (
        <div>
            <TextField value={value} onChange={e => setValue(e.target.value)} onKeyDown={defaultKeyDownHandler}></TextField>
        </div>
    )
}
