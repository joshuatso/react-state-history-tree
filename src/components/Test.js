import React, {useState, useRef} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import {TextField, Button} from "@material-ui/core"
import CSSBaseline from "@material-ui/core/CssBaseline"
import ForkedRedoTextField from "./ForkedRedoTextField"

export default function Test() {

    return (
        <div>
            <CSSBaseline/>
            <ForkedRedoTextField multiline></ForkedRedoTextField>
        </div>
    )
}
