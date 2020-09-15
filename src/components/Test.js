import React, {useState} from 'react'
import useHistoryTree from "../hooks/useHistoryTree"
import {TextField, Button} from "@material-ui/core"

export default function Test() {
    const [value, setValue, undo, redo] = useHistoryTree("")
    return (
        <div>
            <TextField value={value} onChange={e => setValue(e.target.value)}></TextField>
            <Button onClick={undo}>Undo</Button>
            <Button></Button>
        </div>
    )
}
