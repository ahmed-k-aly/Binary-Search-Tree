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
     * @param {*} _value 
     * @return {boolean} returns true if the element is added successfully, false otherwise
     */
    add(_value){
        // if element already exists, return false
        let parentNode = find(_value);
        if (parentNode == null) return false;
        let toAdd = Node(_value);
        isRightChild = compareNodes(toAdd, parentNode);
        parentNode.right = toAdd;
        return true;
        // else, add element to tree
    }

    get size(){
        return this.#size;
    }
}