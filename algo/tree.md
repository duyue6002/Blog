# 树

## [二叉树的中序遍历](https://leetcode.com/problems/binary-tree-inorder-traversal/)

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
var inorderTraversal = function(root) {
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

var inorderTraversal = function(root) {
  let result = [];
  helper(root, result);
  return result;
};

var helper = function(node, memo) {
  if (!node) return;
  if (node.left) helper(node.left, memo);
  memo.push(node.val);
  if (node.right) helper(node.right, memo);
};
```

## [二叉树的前序遍历](https://leetcode.com/problems/binary-tree-preorder-traversal/)

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
var preorderTraversal = function(root) {
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

## [N叉树的后序遍历](https://leetcode.com/problems/n-ary-tree-postorder-traversal/)

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
var postorder = function(root) {
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

## [N叉树的前序遍历](https://leetcode.com/problems/n-ary-tree-preorder-traversal/description/)

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
var preorder = function(root) {
  let result = [];
  helper(root, result);
  return result;
};

var helper = function(node, memo) {
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
var preorder = function(root) {
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

## [N叉树的层序遍历](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

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
var levelOrder = function(root) {
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