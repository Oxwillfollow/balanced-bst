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

myTree.levelOrderForEach((data) => console.log(data));

export { Tree };
