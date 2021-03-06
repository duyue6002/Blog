# 树

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
```

## 二叉树的中序遍历

[LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)

```js
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

## 翻转二叉树

[LeetCode](https://leetcode.com/problems/invert-binary-tree/)

```js
// 递归
var invertTree = function (root) {
  if (!root) return null;
  invertTree(root.left);
  invertTree(root.right);
  [root.left, root.right] = [root.right, root.left];
  return root;
};
// 迭代
var invertTree = function (root) {
  if (!root) return null;
  let queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    [node.left, node.right] = [node.right, node.left];
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return root;
};
```

## 二叉树的直径

[LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)

```js
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

## 二叉树中的最大路径和

[LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let max = Number.MIN_SAFE_INTEGER;
  function helper(node) {
    if (!node) return 0;
    let left = Math.max(0, helper(node.left));
    let right = Math.max(0, helper(node.right));
    max = Math.max(max, left + right + node.val);
    return Math.max(left, right) + node.val;
  }
  helper(root);
  return max;
};
```

## 路径总和

[LeetCode](https://leetcode.com/problems/path-sum/)

```js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  if (!root) return false;
  if (!root.left && !root.right && root.val === sum) return true;
  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
};
```

## 路径总和 II

[LeetCode](https://leetcode.com/problems/path-sum-ii/)

```js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  let result = [];
  helper(root, sum, 0, [], result);
  return result;
};

var helper = function (node, sum, cur, path, result) {
  if (!node) return;
  path.push(node.val);
  cur += node.val;
  if (cur === sum && !node.left && !node.right) {
    result.push(path.slice());
  }
  if (node.left) {
    helper(node.left, sum, cur, path, result);
  }
  if (node.right) {
    helper(node.right, sum, cur, path, result);
  }
  path.pop();
};
```

## 先序遍历构造二叉树

[LeetCode](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)

```js
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

## 二叉树的最大深度

[LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
```

## 验证二叉搜索树

[LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

var helper = function(node, lower, upper) {
  if (!node) return true;
  if (node.val <= lower || node.val >= upper) return false;
  return helper(node.left, lower, node.val) && helper(node.right, node.val, upper);
}
```

## 对称二叉树

[LeetCode](https://leetcode.com/problems/symmetric-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  return isMirror(root, root);
};

var isMirror = function(t1, t2) {
  if (!t1 && !t2) return true;
  if (!t1 || !t2) return false;
  return (t1.val === t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
}
```

## 将有序数组转换为二叉搜索树

[LeetCode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if (nums.length === 0) return null;
  return helper(nums, 0, nums.length - 1);
};

var helper = function(nums, left, right) {
  if (left > right) return null;
  let mid = left + ((right - left) >> 1);
  let node = new TreeNode(nums[mid]);
  node.left = helper(nums, left, mid - 1);
  node.right = helper(nums, mid + 1, right);
  return node;
}
```