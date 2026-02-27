class Node {
  leftChild = null;
  rightChild = null;

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  root = null;

  constructor(array) {
    // sort array and remove duplicates
    const sortedArray = array
      .sort((a, b) => a - b)
      .filter((data, index) => array.indexOf(data) === index);

    this.root = this.#buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  #buildTree(array, startIndex, endIndex) {
    if (startIndex > endIndex) return null;

    const midIndex = Math.trunc((startIndex + endIndex) / 2);

    let rootNode = new Node(array[midIndex]);

    rootNode.leftChild = this.#buildTree(array, startIndex, midIndex - 1);

    rootNode.rightChild = this.#buildTree(array, midIndex + 1, endIndex);

    return rootNode;
  }

  #getSuccessor(node) {
    node = node.rightChild;
    while (node !== null && node.leftChild !== null) {
      node = node.leftChild;
    }

    return node;
  }

  includes(value) {
    let node = this.root;

    while (node !== null && node.data !== value) {
      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
    }

    return node !== null;
  }

  height(value) {
    let node = this.root;

    while (node !== null && node.data !== value) {
      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
    }

    if (!node) return undefined;

    return this.#countHeightRecursively(node);
  }

  depth(value) {
    let node = this.root;
    let depth = 0;

    while (node !== null && node.data !== value) {
      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
      depth++;
    }

    if (!node) return undefined;

    return depth;
  }

  #countHeightRecursively(node, height = -1) {
    if (node === null) return height;

    let left = this.#countHeightRecursively(node.leftChild, height + 1);
    let right = this.#countHeightRecursively(node.rightChild, height + 1);

    if (left > right) return left;
    else return right;
  }

  insert(value) {
    let node = this.root;
    let nodeParent;

    while (node !== null) {
      if (node.data === value) return;

      nodeParent = node;

      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
    }

    if (nodeParent.data > value) nodeParent.leftChild = new Node(value);
    else nodeParent.rightChild = new Node(value);
  }

  deleteItem(value) {
    let node = this.root;
    let parentNode = null; // reference to the parent node to be able to delete the node from the tree

    // find the node with given value in tree
    while (node !== null && node.data !== value) {
      parentNode = node;
      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
    }

    if (node !== null) {
      if (node.leftChild === null && node.rightChild === null) {
        // if has no children - set the node to null
        if (this.root === node) this.root = null;
        else if (parentNode.data > node.data) parentNode.leftChild = null;
        else parentNode.rightChild = null;
      } else if (node.leftChild !== null && node.rightChild === null) {
        // if only has a left child - replace with left child
        if (parentNode.data > node.data) parentNode.leftChild = node.leftChild;
        else parentNode.rightChild = node.leftChild;
      } else if (node.rightChild !== null && node.leftChild === null) {
        // if only has a right child - replace with right child
        if (parentNode.data > node.data) parentNode.leftChild = node.rightChild;
        else parentNode.rightChild = node.rightChild;
      } else {
        // if has a left and right child, replace with descendant which is the successor in value (eg. in tree of numbers 1-10 replacing 7 with 8)
        let successor = this.#getSuccessor(node);
        this.deleteItem(successor.data);
        node.data = successor.data;
      }
    }
  }

  levelOrderForEach(callback) {
    // traverse breadth-first and invoke callback(value) on each node
    if (callback === undefined || typeof callback !== "function")
      throw Error("Callback function is required!");

    if (!this.root) return;

    let queue = [];

    let node = this.root;
    callback(node.data);

    if (node.leftChild) queue.push(node.leftChild);
    if (node.rightChild) queue.push(node.rightChild);

    while (queue.length > 0) {
      node = queue.shift();
      callback(node.data);

      if (node.leftChild) queue.push(node.leftChild);
      if (node.rightChild) queue.push(node.rightChild);
    }
  }

  inOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function")
      throw Error("Callback function is required!");

    // traverse left subtree, call node, traverse right subtree
    this.#traverseRecursively(this.root, callback);
  }

  preOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function")
      throw Error("Callback function is required!");

    // traverse left subtree, call node, traverse right subtree
    this.#traverseRecursivelyPreOrder(this.root, callback);
  }

  postOrderForEach(callback) {
    if (callback === undefined || typeof callback !== "function")
      throw Error("Callback function is required!");

    // traverse left subtree, call node, traverse right subtree
    this.#traverseRecursivelyPostOrder(this.root, callback);
  }

  #traverseRecursively(node = this.root, callback) {
    if (node === null) return;

    this.#traverseRecursively(node.leftChild, callback);
    callback(node.data);
    this.#traverseRecursively(node.rightChild, callback);
  }

  #traverseRecursivelyPreOrder(node = this.root, callback) {
    if (node === null) return;

    callback(node.data);
    this.#traverseRecursivelyPreOrder(node.leftChild, callback);
    this.#traverseRecursivelyPreOrder(node.rightChild, callback);
  }

  #traverseRecursivelyPostOrder(node = this.root, callback) {
    if (node === null) return;

    this.#traverseRecursivelyPostOrder(node.leftChild, callback);
    this.#traverseRecursivelyPostOrder(node.rightChild, callback);
    callback(node.data);
  }

  isBalanced() {
    return this.#isBalancedRecursively();
  }

  #isBalancedRecursively(node = this.root) {
    if (node === null) return true; // base case

    // get height diff of subtree left and subtree right
    let left = this.#countHeightRecursively(node.leftChild);
    let right = this.#countHeightRecursively(node.rightChild);

    let difference = Math.abs(left - right);
    if (difference > 1) return false;

    // do this for each node in the tree
    return (
      this.#isBalancedRecursively(node.leftChild) &&
      this.#isBalancedRecursively(node.rightChild)
    );
  }

  rebalance() {
    let nodes = [];

    // traverse in order to get a sorted array
    this.#traverseRecursively(this.root, function (data) {
      nodes.push(data);
    });

    this.root = this.#buildTree(nodes, 0, nodes.length - 1);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const myTree = new Tree([10, 20, 30, 40, 45, 50]);

prettyPrint(myTree.root);

console.log(myTree.isBalanced());

myTree.insert(33);
myTree.insert(34);
myTree.insert(35);
myTree.insert(36);
myTree.insert(37);

prettyPrint(myTree.root);

console.log(myTree.isBalanced());

myTree.rebalance();

prettyPrint(myTree.root);

console.log(myTree.isBalanced());

export { Tree };
