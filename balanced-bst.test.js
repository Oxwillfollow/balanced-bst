import { Tree } from "./balanced-bst";

test("includes", () => {
  const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  expect(myTree.includes(1000)).toBe(false);
  expect(myTree.includes(67)).toBe(true);
});

test("insert", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50, 60, 65, 70]);

  myTree.insert(100);

  expect(myTree.includes(100)).toBe(true);
});

test("deleteItem", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50, 60, 65, 70]);

  myTree.deleteItem(40);

  expect(myTree.includes(40)).toBe(false);
});

test("levelOrderForEach", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50]);

  let dataLevelorder = [];
  myTree.levelOrderForEach((data) => dataLevelorder.push(data));

  expect(dataLevelorder).toEqual([30, 10, 45, 20, 40, 50]);
});

test("inOrderForEach, preOrderForEach, postOrderForEach", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50]);

  let dataInOrder = [];
  let dataPreOrder = [];
  let dataPostOrder = [];
  myTree.inOrderForEach((data) => dataInOrder.push(data));
  myTree.preOrderForEach((data) => dataPreOrder.push(data));
  myTree.postOrderForEach((data) => dataPostOrder.push(data));

  expect(dataInOrder).toEqual([10, 20, 30, 40, 45, 50]);
  expect(dataPreOrder).toEqual([30, 10, 20, 45, 40, 50]);
  expect(dataPostOrder).toEqual([20, 10, 40, 50, 45, 30]);
});

test("height, depth", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50]);
  expect(myTree.height(30)).toBe(2);
  expect(myTree.depth(30)).toBe(0);
  expect(myTree.height(50)).toBe(0);
  expect(myTree.depth(50)).toBe(2);
});
