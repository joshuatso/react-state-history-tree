import React, {useState, useEffect} from 'react'

class Node {
    constructor(value = null, parent = null) {
        this.value = value
        this.children = []
        this.parent = parent
        this.pathIndex = -1
    }
    stringify() {
        return this.value
    }
    stripMethods() {
        return {value: this.value, children: this.children.map((child, index) => ({index, ...child.stripMethods()})), pathIndex: this.pathIndex}
    }
    addChild(child) {
        child.parent = this
        this.children.push(child)
        this.pathIndex = this.children.length - 1
    }
}

export default function useHistoryTree(initialState) {
    const [value, setValue] = useState(initialState)

    const [root, setRoot] = useState(new Node(initialState))
    const [current, setCurrent] = useState(root)
    const [initialized, setInitialized] = useState(!!root)

    function addValue(newValue) {
        if (!initialized) {
            const newNode = new Node(newValue)
            setRoot(newNode)
            setCurrent(newNode)
            setInitialized(true)
        } else {
            const newNode = new Node(newValue)
            current.addChild(newNode)
            setCurrent(newNode)
        }
    }

    function undo() {
        if (current != root) {
            setCurrent(current.parent)
        }
    }

    function redo(pathIndex=null) {
        if (current && current.pathIndex != -1) {
            if (!pathIndex) {
                setCurrent(current.children[current.pathIndex])
            } else {
                current.pathIndex = pathIndex
                setCurrent(current.children[pathIndex])
            }
        }
    }

    function getCurrentForks() {
        if (!current || current.children.length == 0) {
            return []
        } else {
            return current.stripMethods().children
        }
    }

    useEffect(() => {
        if (current) {
            setValue(current.value)
        }
    }, [current])

    function defaultKeyDownHandler(e) {
        if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'z' && !e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            undo()
        } else if ((e.metaKey || e.ctrlKey) && String.fromCharCode(e.which).toLowerCase() === 'z' && e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            redo()
        }
    }

    return [value, addValue, undo, redo, getCurrentForks, defaultKeyDownHandler]
}
