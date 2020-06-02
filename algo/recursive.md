# 递归

## 爬楼梯

[LeetCode](https://leetcode.com/problems/climbing-stairs/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let memo = Array(n + 1);
  memo[1] = 1;
  memo[2] = 2;
  return helper(n, memo);
};

var helper = function(n, memo) {
  if (n <= 0) return 0;
  if (memo[n]) return memo[n];
  memo[n] = helper(n - 1, memo) + helper(n - 2, memo);
  return memo[n];
};
```

## 括号生成

[LeetCode](https://leetcode.com/problems/generate-parentheses/)

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let result = [];
  helper(0, 0, n, "", result);
  return result;
};

var helper = function(left, right, n, s, memo) {
  //   terminate
  if (left === n && right === n) {
    memo.push(s);
    return;
  }
  //   process logic
  //   drill down
  if (left < n) helper(left + 1, right, n, s + "(", memo);
  if (right < left) helper(left, right + 1, n, s + ")", memo);
  //   reverse state
};
```

## 翻转二叉树

[LeetCode](https://leetcode.com/problems/invert-binary-tree/description/)

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root) return null;
  invertTree(root.left);
  invertTree(root.right);
  [root.left, root.right] = [root.right, root.left];
  return root;
};
```

## 验证二叉搜索树

[LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)

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
 * @return {boolean}
 */
var isValidBST = function(root) {
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

var helper = function(node, lower, upper) {
  //   terminator
  if (!node) return true;
  //   process current logic
  if (node.val <= lower || node.val >= upper) return false;
  //   drill down
  if (!helper(node.left, lower, node.val)) return false;
  if (!helper(node.right, node.val, upper)) return false;
  return true;
  //   reverse state
};
```

## 二叉树的最大深度

[LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

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
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

## 二叉树的最小深度

[LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/)

## 二叉树的序列化与反序列化

[LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

## 二叉树的最近公共祖先

[LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

## 前序与中序遍历序列构造二叉树

[LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

## 组合

[LeetCode](https://leetcode.com/problems/combinations/)

## 全排列

[LeetCode](https://leetcode.com/problems/permutations/)

## 全排列 II

[LeetCode](https://leetcode.com/problems/permutations-ii/)
