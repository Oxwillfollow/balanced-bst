import { Tree } from "./balanced-bst";

test("includes", () => {
  const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  expect(myTree.includes(1000)).toBe(false);
  expect(myTree.includes(67)).toBe(true);
});

test("deleteItem", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50, 60, 65, 70]);

  myTree.deleteItem(40);

  expect(myTree.includes(40)).toBe(false);
});

test("levelOrderForEach", () => {
  const myTree = new Tree([10, 20, 30, 40, 45, 50]);

  let testData = [];
  myTree.levelOrderForEach((data) => testData.push(data));

  expect(testData).toEqual([30, 10, 45, 20, 40, 50]);
});
