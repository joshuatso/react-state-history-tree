export default class Node {
    constructor(value = null, parent = null) {
        this.value = value
        this.children = []
        this.parent = parent
        this.pathIndex = -1
    }
    stringify() {
        return this.value
    }
    addChild(child) {
        child.parent = this
        this.children.push(child)
        this.pathIndex = this.children.length - 1
    }
}