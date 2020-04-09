# 练习之道

## Cheat Sheet

- [数据结构脑图](https://naotu.baidu.com/file/b832f043e2ead159d584cca4efb19703?token=7a6a56eb2630548c)
- [算法脑图](https://naotu.baidu.com/file/0a53d3a5343bd86375f348b2831d3610?token=5ab1de1c90d5f3ec)
- [Big O](https://www.bigocheatsheet.com/)

## 经典代码收藏

- 递归：加上备忘录为递归剪枝

  ```js
  function recursive(level, param) {
    // 终止条件
    if () {}
    // 当前层
    process(param);
    // 向下
    drill_down(level + 1, param);
    // 清空当前层的变量
  }
  ```

- 分治

  ```js
  function divide_conquer(problem, ...param) {
    // 终止条件
    if () {}
    // 分解问题
    data = prepare_data(problem);
    sub_problems = split_problem(problem, data);
    // 分治
    result[0] = divide_conquer(sub_problems[0], ...param);
    result[1] = divide_conquer(sub_problems[1], ...param);
    result[2] = divide_conquer(sub_problems[2], ...param);
    // 合并结果
    result = process_result(result[0], result[1], result[2])
    // 清空当前层变量
   }
  ```

- DFS

  ```js
  // 递归
  visited = [];
  function dfs(node, visited) {
    if (node in visited) return;
    visited.push(node);
    for (child in node.children) {
      if (!child in visited) {
        dfs(child, visited);
      }
    }
  }
  // stack
  function dfs(tree) {
    let stack = [tree.root],
      visited = [];
    while (stack.length > 0) {
      let node = stack.pop();
      visited.push(node);
      for (child in node.children) {
        if (!child in visited) {
          stack.push(child);
        }
      }
    }
  }
  ```

- BFS

  ```js
  // queue
  function bfs(tree) {
    let queue = [tree.root],
      visited = [];
    while (queue.length > 0) {
      let node = queue.shift();
      visited.push(node);
      for (child in node.children) {
        if (!child in visited) {
          queue.push(child);
        }
      }
    }
  }
  ```

- 二分查找：必须是有序数组

  ```js
  function binary_search(arr, target) {
    let left = 0,
      right = arr[arr.length - 1];
    while (left <= right) {
      let mid = Math.floor((right + left) / 2);
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] > target) {
        right = mid;
      } else {
        left = mid;
      }
    }
  }
  ```

- [Trie](https://duyue6002.github.io/Blog/#/algo/trie?id=%e5%ae%9e%e7%8e%b0-trie)
- [并查集](https://duyue6002.github.io/Blog/#/algo/union-find)
- 归并排序

  ```js
  function mergeSort(arr, left, right) {
    let mid = (left + right) >> 1;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  function merge(arr, left, mid, right) {
    let memo = Array(right - left + 1);
    let i = left,
      j = mid + 1,
      k = 0;
    while (i <= mid && j <= right) {
      memo[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    }
    while (i <= mid) {
      memo[k++] = arr[i++];
    }
    while (j <= right) {
      memo[k++] = arr[j++];
    }
    for (let p = 0; p < memo.length; p++) {
      arr[left + p] = memo[p];
    }
  }
  ```

- 快排

  ```js
  function quickSort(arr, left, right) {
    if (left <= right) return;
    let pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
  function partition(arr, left, right) {
    let pivot = right,
      counter = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < arr[pivot]) {
        [arr[i], arr[counter]] = [arr[counter], arr[i]];
        counter++;
      }
    }
    [arr[pivot], arr[counter]] = [arr[counter], arr[pivot]];
    return counter;
  }
  ```

<!-- - [堆排序](https://shimo.im/docs/6kRVHRphpgjHgCtx/read) -->
- [N 皇后](https://shimo.im/docs/rHTyt8hcpT6D9Tj8/read)

## 经典习题

- [爬楼梯](https://leetcode.com/problems/climbing-stairs/): 有备忘录的递归，DP
- [零钱兑换](https://leetcode.com/problems/coin-change/): 可以转换成爬楼梯，DP，BFS，有备忘录的递归
- [最长有效括号](https://leetcode.com/problems/longest-valid-parentheses/): 递归，DFS，DP
- [括号生成](https://leetcode.com/problems/generate-parentheses/): 递归，DFS，DP
- [直方图最大面积](https://leetcode.com/problems/largest-rectangle-in-histogram/): 栈
- [接雨水](https://leetcode.com/problems/trapping-rain-water/)：栈
- [滑动窗口最大值](https://leetcode.com/problems/sliding-window-maximum/): 双端队列
- [二叉树遍历](https://leetcode.com/problems/binary-tree-inorder-traversal/): BFS, DFS, 前中后递归/非递归遍历
- [分层输出树](https://leetcode.com/problems/n-ary-tree-level-order-traversal/): BFS, DFS
- [判断二叉搜索树](https://leetcode.com/problems/validate-binary-search-tree/): 中序遍历得到的是有序数组
- [股票买卖](https://duyue6002.github.io/Blog/#/algo/dp?id=%e5%8d%96%e8%82%a1%e7%a5%a8%e9%97%ae%e9%a2%98): 多维 DP 数组
- [打家劫舍](http://duyue6002.github.io/Blog/#/algo/dp?id=%e6%89%93%e5%ae%b6%e5%8a%ab%e8%88%8d)
- [编辑距离](https://leetcode.com/problems/edit-distance/): 两维 DP 数组
- [最长上升子序列](https://leetcode.com/problems/longest-increasing-subsequence/)
- [最长公共子序列](https://leetcode.com/problems/longest-common-subsequence/)
- [异位词](http://duyue6002.github.io/Blog/#/algo/string?id=%e5%bc%82%e4%bd%8d%e8%af%8d%e4%b8%8e%e6%bb%91%e5%8a%a8%e7%aa%97%e5%8f%a3)
- [回文串](http://duyue6002.github.io/Blog/#/algo/string?id=%e5%9b%9e%e6%96%87%e9%97%ae%e9%a2%98)
- [regex 和通配符匹配](http://duyue6002.github.io/Blog/#/algo/string?id=regex-%e5%92%8c%e9%80%9a%e9%85%8d%e7%ac%a6%e5%8c%b9%e9%85%8d)
- 高级数据结构: Trie, BloomFilter, LRU cache
