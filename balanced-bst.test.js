import { Tree } from "./balanced-bst";

test("includes", () => {
  const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  expect(myTree.includes(1000)).toBe(false);
  expect(myTree.includes(67)).toBe(true);
});
