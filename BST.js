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
        
        return true;

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
     * @return {String} an inorder string representation of the tree
     */
     toString(){
        return "";
    }

    get size(){
        return this.#size;
    }
}
