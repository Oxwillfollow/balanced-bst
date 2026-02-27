# balanced-bst

A javascript implementation of a balanced Binary Search Tree. Made to work with numeric data.

Tested with `jest`

## class Node

Properties:

- `data`: the data of the node.
- `leftChild`: the node to the lower left.
- `rightChild`: the node to the lower right.

## class Tree

Properties:

- `root`: the root node of the tree.

Constructor:

`constructor(array)`: takes an array and builds a balanced BST, assigns the root node.

Private Methods:

- `#buildTree(array, startIndex, endIndex)`: recursive function used by the constructor and rebalance() method to build the tree.
- `#getSuccesor(node)`: helper function used by deleteItem() method to get the node with the suceeding value of the one given.
- `#countHeightRecursively(node, height)`: recursive function used by height() and #isBalancedRecursively() methods to find the height of a node relative to the lowest subtree.
- `#isBalancedRecursively(node)`: recursive function used by isBalanced() that returns `true` or `false` based on the height differences of the trees subtrees.
- `#traverseRecursively(node, callback)`: recursive function for In Order Traversing and calling the callback function with the data of each node.
- `#traverseRecursivelyPreOrder(node, callback)`: recursive function for Pre Order Traversing and calling the callback function with the data of each node.
- `#traverseRecursivelyPostOrder(node, callback)`: recursive function for Post Order Traversing and calling the callback function with the data of each node.

Public Methods:

- `includes(value)`: returns `true` if tree contains the given value and `false` if it doesn't.
- `insert(value)`: adds a new node with the given value to the tree. If given value already exists, doesn't do anything.
- `deleteItem(value)`: finds and deletes the given value in the tree.
- `height(value)`: returns the height (levels to the lowest subtree) of a given value if its found within the tree.
- `depth(value)`: returns the depth (levels to the root node) of a given value if its found within the tree.
- `levelOrderForEach(callback)`: traverses the tree in breadth-first level order and calls the callback on each value as it traverses.
- `inOrderForEach(callback)`: traverses the tree depth-first, in-order, and calls the callback on each value as it traverses.
- `preOrderForEach(callback)`: traverses the tree depth-first, pre-order, and calls the callback on each value as it traverses.
- `postOrderForEach(callback)`: traverses the tree depth-first, post-order, and calls the callback on each value as it traverses.
- `isBalanced()`: returns `true` if the tree is balanced and `false` if it isn't. A balanced tree has a maximum subtree height difference of 1.
- `rebalance()`: takes the current tree and recreates it to be a balanced one.
