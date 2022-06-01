class Node{
    next = null;
    value = null;
    parent = null;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class BinaryTree{
    #root;
    #size;
}