export default class Tree {
    constructor(root=null) {
        this.root = root
        this.current = root
        this.initialized = !!root
    }
    stringify() {
        if (!this.current) {
            return ""
        } else {
            return this.current.stringify()
        }
    }
    addChildToCurrent(child) {
        if (!this.initialized) {
            this.root = child
            this.current = child
            this.initialized = true
        } else {
            this.current.addChild(child)
            this.current = child
        }
        return this
    }
    undo() {
        if (this.current != this.root) {
            this.current = this.current.parent
        }
        return this
    }
    redo(pathIndex = null){
        if (this.current && this.current.pathIndex != -1) {
            if (!pathIndex) {
                this.current = this.current.children[this.current.pathIndex]
            } else {
                this.current.pathIndex = pathIndex
                this.current = this.current.children[pathIndex]
            }
        }
        return this
    }
    getCurrentForks() {
        if (!this.current || this.current.children.length == 0) {
            return []
        } else {
            return this.current.children.map(child => child.stringify())
        }
    }
}