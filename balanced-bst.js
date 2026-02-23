class Node {
  leftChild = null;
  rightChild = null;

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  root = undefined;

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

  includes(value) {
    let node = this.root;

    while (node !== null && node.data !== value) {
      if (node.data > value) node = node.leftChild;
      else node = node.rightChild;
    }

    return node !== null;
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

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(myTree.root);
