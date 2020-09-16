import React, {useState, useEffect} from 'react'

class Node {
    constructor(value = null, parent = null) {
        this.value = value
        this.children = []
        this.parent = parent
        this.pathIndex = -1
    }
    getValue() {
        return this.value
    }
    getChildrenValues() {
        return this.children.map((child, index) => ({index, value: child.value}))
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

    function undo(toClosestFork=false) {
        const findClosestBackwardFork = node => {
            if (node == root || node.children.length > 1) {
                return node
            } else {
                findClosestBackwardFork(node.parent)
            }
        }
        if (current != root) {
            toClosestFork ? setCurrent(findClosestBackwardFork(current.parent)) : setCurrent(current.parent)
        }
    }

    function redo(pathIndex=null, toClosestFork=false) {
        const findClosestForwardFork = node => {
            if (node.pathIndex == -1 || node.children.length > 1) {
                return node
            } else {
                findClosestForwardFork(node.children[node.pathIndex])
            }
        }
        if (current && current.pathIndex != -1) {
            if (!pathIndex && !toClosestFork) {
                setCurrent(current.children[current.pathIndex])
            } else if (!!pathIndex) {
                current.pathIndex = pathIndex
                setCurrent(current.children[pathIndex])
            } else {
                setCurrent(findClosestForwardFork(current.children[current.pathIndex]))
            }
        }
    }

    function getCurrentSubtree() {
        if (!current || current.children.length == 0) {
            return []
        } else {
            return current.stripMethods().children
        }
    }

    function getCurrentBranches() {
        if (!current || current.children.length == 0) {
            return []
        } else {
            return current.getChildrenValues()
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

    return [value, addValue, undo, redo, getCurrentBranches, defaultKeyDownHandler]
}
