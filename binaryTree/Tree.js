class Tree {
    constructor() {
        this.root = null;
    }

    hasNode(data) {
        return this.searchRoot(this.root, data)
    }
    // addNode(node) {
    //     if(!this.root) {
    //         this.root = node;
    //         return;
    //     }

    //     let ptr = this.root;
    //     while(true) {
    //         if(node.data < ptr.data) {
    //             if(!ptr.left) {
    //                 ptr.left = node;
    //                 break;
    //             }
    //             else {
    //                 ptr = ptr.left;
    //             }
    //         }
    //         if (node.data > ptr.data) {
    //             if (!ptr.right) {
    //                 ptr.right = node;
    //                 break;
    //             }
    //             else {
    //                 ptr = ptr.right;
    //             }
    //         }
    //     }
    // }
    addNodeRecursive(childNode, parentTree) {
        if (parentTree === null) {
            this.root = childNode;
            return;
        }

        if (childNode.data < parentTree.data) {
            if (parentTree.left === null) {
                parentTree.left = childNode;
            } else {
                this.addNodeRecursive(childNode, parentTree.left);
            }
        } else if (childNode.data > parentTree.data) {
            if (parentTree.right === null) {
                parentTree.right = childNode;
            } else {
                this.addNodeRecursive(childNode, parentTree.right);
            }
        }
    }

    addNode(node) {
        this.addNodeRecursive(node, this.root);
    }

    hasNode(data) {
        return this.searchRoot(this.root, data)
    }

    searchRoot(root, data) {
        if(!root) {
            return false;
        }
        if(root.data === data) {
            return true;
        }
        if(root.data > data) {
            return this.searchRoot(root.left, data);
        }
        if(root.data < data) {
            return this.searchRoot(root.right, data);
        }
    }
}

module.exports = Tree;
