class Node{
    left = null;
    right = null;
    value = null;
    parent = null;
    constructor(value) {
        this.value = value;
    }
}

export default class BinaryTree{
    #root;
    #size;

    constructor(){
        this.#root = null
        this.#size = 0;
    }

    /**
     * Adds element to the tree if it is not already.
     * @param {*} _value value to add to tree
     * @return {boolean} returns true if the element is added successfully, false otherwise
     */
    add(_value){
        // find element or where it is supposed to be
        let parentNode = find(_value);
        if (parentNode == null) return false;
        let toAdd = Node(_value);

        // adds the element to the tree
        let isRightChild = compareNodes(toAdd, parentNode);
        if (isRightChild) parentNode.right = toAdd;
        else parentNode.left = toAdd;
        
        this.#size++;
        
        return true;
    }

    /**
     * Removes an element from the tree if it exists
     * @param {*} _value value to remove from tree 
     * @return {boolean} returns true if the element is removed successfully, false otherwise
     */
    remove(_value){
        // if element is not in the tree, return false
        let toRemove = find(_value);
        if (toRemove.value != _value) return false;
        // element is in the tree
        let parentNode = toRemove.parent;
        let newChild = deleteNode(toRemove)
        this.#size--;
        // find if removed node is a right child, left child, or a root
        if (parentNode == null){
            // if removed node is a root.
            this.#root = newChild;
            return true;
        }
        
        let isRightChild = compareNodes(toRemove, parentNode);
        if (isRightChild) parentNode.right = newChild;
        else parentNode.left = newChild;
        this.#size--;
        return true;

    }

    compareNodes(node1, node2) {
        return node1.value > node2.value ? true : false;
    }

    deleteNode(nodeToDelete) {
        //Case 1: Root node
        if (nodeToDelete.parentNode == null){
            if (nodeToDelete.left != null){
                nodeToDelete.left.parent = null
                return nodeToDelete.left;
            }
            nodeToDelete.right.parent = null
            return nodeToDelete.right;
        }
        // Case 2: Leaf
        if (nodeToDelete.left == null && nodeToDelete.right == null){
            return null;
        }
        // Case 3: One child
        if (nodeToDelete.left == null){
            // child to replace is right child.
            let newChild = nodeToDelete.right;
            // set its parent to null.
            newChild.parent = null;
            // return it.
            return newChild;
        }
        else if (nodeToDelete.right == null){
            // child to replace is left child.
            let newChild = nodeToDelete.left;
            // set its parent to null.
            newChild.parent = null;
            // return it.
            return newChild;
        }
        // Case 3: Two children
        nodeToDelete.value = minValue(nodeToDelete.right);
        nodeToDelete.right = findHelper(nodeToDelete.right, nodeToDelete.value);
        return nodeToDelete;
    }


    /**
     * gets the smallest value in the tree
     * @returns the smallest value in the tree
     */
    minValue(){
        return minValueHelper(this.#root).value;
    }
    /**
     * gets the largest value in the tree
     * @returns the largest value in the tree
     */
    maxValue(){
        return maxValueHelper(this.#root).value;
    }

    /**
     * @param {Node} node the root of the tree from the method's perspective. 
     * @returns the smallest node in the passed in tree.
     */
    minValueHelper(node){
        let current = node;
        while (current.left != null){
            current = current.left;
        }
        return current;
    }

    /**
     * @param {Node} node the root of the tree from the method's perspective. 
     * @returns the largest node in the passed in tree.
     */    
    maxValueHelper(node){
        let current = node;
        while (current.right != null){
            current = current.right;
        }
        return current;
    }
    /**
     * 
     * @param {Node} root the root node from the perspective of the method
     * @param {*} value the value to find
     * @return {Node} returns the node containing that value if found
*                else, returns its parent if it would exist. 
     */
    findHelper(root, value){
        if (root.value === value){
            return root;
        }
        if (value < root.value){
            // go left
            // if we can't go left anymore, this is where the node would be

            if (root.left == null) return root;
            return findHelper(root.left, value);
        }
        // go right
        // if we can't go right anymore, this is where the node would be
        if (root.right == null) return root;
        return findHelper(root.right, value);
    }

    /**
     * searches for a value in the tree. 
     * @param {*} _value value to be found in the tree.
     * @return {Node} returns the node containing that value if found
     *                else, returns its parent if it would exist.
     */
     find(_value){
        return findHelper(this.#root, _value);
    }


    inOrderTraversal(){
        inOrderTraversalHelper(this.#root);
    }

    inOrderTraversalHelper(node){
        if (node == null) return;
        inOrderTraversalHelper(node.left);
        console.log("Value: " + node.value + " ");
        inOrderTraversalHelper(node.right);
    }

    get size(){
        return this.#size;
    }
}
