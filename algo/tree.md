# 树

## 二叉树的中序遍历

[LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)

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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let result = [];
  let stack = [];
  let cur = root;
  while (cur || stack.length !== 0) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
};

var inorderTraversal = function (root) {
  let result = [];
  helper(root, result);
  return result;
};

var helper = function (node, memo) {
  if (!node) return;
  if (node.left) helper(node.left, memo);
  memo.push(node.val);
  if (node.right) helper(node.right, memo);
};
```

## 二叉树的前序遍历

[LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)

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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  let result = [];
  if (!root) return result;
  let stack = [];
  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
};
```

## N 叉树的后序遍历

[LeetCode](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)

```js
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  let result = [];
  if (!root) return result;
  let stack = [];
  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);
    let length = node.children.length;
    for (let i = 0; i < length; i++) {
      stack.push(node.children[i]);
    }
  }
  return result.reverse();
};
```

## N 叉树的前序遍历

[LeetCode](https://leetcode.com/problems/n-ary-tree-preorder-traversal/description/)

```js
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  let result = [];
  helper(root, result);
  return result;
};

var helper = function (node, memo) {
  if (!node) return;
  memo.push(node.val);
  for (let child of node.children) {
    helper(child, memo);
  }
};

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  let result = [];
  if (!root) return result;
  let stack = [];
  stack.push(root);
  while (stack.length > 0) {
    let node = stack.pop();
    result.push(node.val);
    let length = node.children.length;
    for (let i = length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }
  return result;
};
```

## N 叉树的层序遍历

[LeetCode](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

```js
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let result = [];
  if (!root) return result;
  let queue = [];
  queue.push(root);
  while (queue.length > 0) {
    let data = [];
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      data.push(node.val);
      for (let child of node.children) {
        queue.push(child);
      }
    }
    result.push(data);
  }
  return result;
};
```

## 二叉树的直径

[LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)

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
var diameterOfBinaryTree = function (root) {
  let max = 0;
  function depth(node) {
    if (!node) return 0;
    let left = depth(node.left);
    let right = depth(node.right);
    max = Math.max(left + right, max);
    return Math.max(left, right);
  }
  depth(root);
  return max;
};
```

## 先序遍历构造二叉树

[LeetCode](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const root = new TreeNode(preorder[0]);
  construct(root, preorder, 1, preorder.length);
  return root;
};

var construct = function (node, preorder, start, end) {
  if (start === end) return;
  let rightIndex = end;
  for (let i = start; i < end; i++) {
    if (i === start && preorder[i] < node.val) {
      node.left = new TreeNode(preorder[i]);
    }
    if (preorder[i] > node.val) {
      node.right = new TreeNode(preorder[i]);
      rightIndex = i;
      break;
    }
  }
  node.left && construct(node.left, preorder, start + 1, rightIndex);
  node.right && construct(node.right, preorder, rightIndex + 1, end);
  return node;
};
```
