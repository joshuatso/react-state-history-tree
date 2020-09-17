import React, {useState, useRef} from 'react'
import useStateHistoryTree from "../hooks/useStateHistoryTree"
import {TextField, Button} from "@material-ui/core"
import CSSBaseline from "@material-ui/core/CssBaseline"
import RedoBranchesWidget from "./RedoBranchesWidget"

export default function Test() {

    return (
        <div>
            <CSSBaseline/>
            <RedoBranchesWidget multiline></RedoBranchesWidget>
        </div>
    )
}
