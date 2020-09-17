// represents one state in tree
export default class Node {
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