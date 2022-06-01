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
        // if element already exists, return false
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
        if (toRemove == null) return false;
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



    get size(){
        return this.#size;
    }
}