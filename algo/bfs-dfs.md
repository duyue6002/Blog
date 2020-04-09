# BFS & DFS

## 二叉树的层次遍历

[LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/#/description)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let queue = [root],
    res = [];
  while (queue.length > 0) {
    let size = queue.length;
    let level = [];
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      level.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    res.push(level);
  }
  return res;
};
```

## 最小基因变化

[LeetCode](https://leetcode.com/problems/minimum-genetic-mutation/#/description)

```js
/**
 * 单向 BFS
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
  if (!bank.includes(end)) return -1;
  let queue = [];
  queue.push(start);
  let ladder = 0;
  let dict = new Set(bank);

  while (queue.length !== 0) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let word = queue.shift();
      if (word === end) return ladder;
      for (let j = 0; j < word.length; j++) {
        for (let ch of ["A", "G", "T", "C"]) {
          let tmp = word.slice(0, j) + ch + word.slice(j + 1);
          if (dict.has(tmp)) {
            queue.push(tmp);
            dict.delete(tmp);
          }
        }
      }
    }
    ladder++;
  }
  return -1;
};
```

## 括号生成

[LeetCode](https://leetcode.com/problems/generate-parentheses/#/description)

## 在每个树行中找最大值

[LeetCode](https://leetcode.com/problems/find-largest-value-in-each-tree-row/#/description)

## 单词接龙

[LeetCode](https://leetcode.com/problems/word-ladder/description/)

```js
/**
 * BFS
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  let queue = [];
  let dict = new Set(wordList);
  queue.push(beginWord);
  let ladder = 1;
  let alphabet = Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(97 + i));
  while (queue.length !== 0) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let word = queue.shift();
      if (word === endWord) return ladder;
      for (let j = 0; j < word.length; j++) {
        for (let ch of alphabet) {
          let tmp = word.slice(0, j) + ch + word.slice(j + 1);
          if (dict.has(tmp)) {
            queue.push(tmp);
            dict.delete(tmp);
          }
        }
      }
    }
    ladder++;
  }
  return 0;
};

/**
 * BFS
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return 0;
  let beginQueue = [],
    endQueue = [];
  beginQueue.push(beginWord);
  endQueue.push(endWord);
  let ladder = 1;
  let dict = new Set(wordList);

  let alphabet = Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(97 + i));
  while (beginQueue.length !== 0 && endQueue.length !== 0) {
    if (beginQueue.length > endQueue.length) {
      [beginQueue, endQueue] = [endQueue.slice(), beginQueue.slice()];
    }
    let length = beginQueue.length;
    for (let i = 0; i < length; i++) {
      let word = beginQueue.shift();
      for (let j = 0; j < word.length; j++) {
        for (let ch of alphabet) {
          let tmp = word.slice(0, j) + ch + word.slice(j + 1);
          if (endQueue.includes(tmp)) {
            return ladder + 1;
          }
          if (dict.has(tmp)) {
            beginQueue.push(tmp);
            dict.delete(tmp);
          }
        }
      }
    }
    ladder++;
  }
  return 0;
};
```

## 单词接龙 II

[LeetCode](https://leetcode.com/problems/word-ladder-ii/description/)

## 岛屿数量

[LeetCode](https://leetcode.com/problems/number-of-islands/)

## 扫雷游戏

[LeetCode](https://leetcode.com/problems/minesweeper/description/)
