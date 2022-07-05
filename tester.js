import BinaryTree from './BST.js';
addTester();
removeTester();
findTester();
sizeTester();

function addTester(){
    // add elements
    let binaryTree = new BinaryTree();
    for (var i = 0; i < 50; i++){
        binaryTree.add(i);
    }
    binaryTree.inOrderTraversal();
}

function removeTester(){
    return true;
}

function findTester(){
    return true;
}

function sizeTester(){
    return true;
}