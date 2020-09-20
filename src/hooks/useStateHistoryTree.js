import React, {useState, useEffect} from 'react'
import Node from "../classes/Node"

export default function useStateHistoryTree(initialState) {
    // current value
    const [value, setValue] = useState(initialState)

    const [root, setRoot] = useState(new Node(initialState))
    
    // current node
    const [current, setCurrent] = useState(root)

    const [atRoot, setAtRoot] = useState(true)
    const [atLeaf, setAtLeaf] = useState(true)

    function addValue(newValue, commit=true) {
        if (commit) {
            let newNode
            if (newValue instanceof Function) {
                newNode = new Node(newValue(value))
            } else {
                newNode = new Node(newValue)
            }
            current.addChild(newNode)
            setCurrent(newNode)
        } else {
            setValue(newValue)
        }
    }

    function undo(toClosestFork=false) {
        const findClosestBackwardFork = (node) => {
            if (node == root || node.children.length > 1) {
                return node
            } else {
                return findClosestBackwardFork(node.parent)
            }
        }
        if (current != root) {
            if (toClosestFork) {
                const node = findClosestBackwardFork(current.parent)
                setCurrent(node)
            } else {
                setCurrent(current.parent)
            }
        }
    }

    function redo(pathIndex=null, toClosestFork=false) {
        const findClosestForwardFork = (node) => {
            if (node.pathIndex == -1 || node.children.length > 1) {
                return node
            } else {
                return findClosestForwardFork(node.children[node.pathIndex])
            }
        }
        if (current != null && current.pathIndex != -1) {
            if (pathIndex === null && toClosestFork === false) {
                setCurrent(current.children[current.pathIndex])
            } else if (pathIndex !== null && pathIndex !== undefined) {
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
            if (current == root) {
                setAtRoot(true)
            } else {
                setAtRoot(false)
            }
            if (current.children.length == 0) {
                setAtLeaf(true)
            } else {
                setAtLeaf(false)
            }
            setValue(current.value)
        }
    }, [current])

    function defaultKeyDownHandler(e) {
        // ctrl + z and ctrl + shift + z
        if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            undo()
        } else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            redo()
        }
    }

    return [value, addValue, {undo, redo, getCurrentBranches, getCurrentSubtree, defaultKeyDownHandler, atRoot, atLeaf}]
}
