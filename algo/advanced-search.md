# 高级搜索

## 剪枝与回溯

剪枝其实就是递归时多做一些条件判断，不必要的情况无需再递归下去。

### 爬楼梯

[LeetCode](https://leetcode.com/problems/climbing-stairs/)

```js
/**
 *
 * @param {number} n
 * @returns {number}
 */
var climbStairs = function (n) {
  let memo = Array(n + 1).fill(0);
  memo[1] = 1;
  memo[2] = 2;
  return helper(memo, n);
};

/**
 *
 * @param {number[]} memo
 * @param {number} n
 */
var helper = function (memo, n) {
  if (n <= 0) return 0;
  if (!!memo[n]) return memo[n];
  memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
  return memo[n];
};
```

### 括号生成

[LeetCode](https://leetcode.com/problems/generate-parentheses/)

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let result = Array();
  helper(result, "", n, 0, 0);
  return result;
};

var helper = function (result, str, n, left, right) {
  if (left === n && right === n) {
    result.push(str);
    return;
  }

  if (left < n) {
    helper(result, str + "(", n, left + 1, right);
  }

  if (right < n && right < left) {
    helper(result, str + ")", n, left, right + 1);
  }
};
```

### N 皇后

[LeetCode](https://leetcode.com/problems/n-queens/)

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  if (n < 1) return [];
  let result = [];
  DFS(result, 0, n, [], [], [], []);
  return result;
};

var DFS = function (result, row, n, cols, left, right, cur) {
  if (row >= n) {
    result.push(cur.slice());
    return;
  }

  for (let col = 0; col < n; col++) {
    if (
      !cols.includes(col) &&
      !left.includes(row + col) &&
      !right.includes(row - col)
    ) {
      cols.push(col);
      left.push(row + col);
      right.push(row - col);

      let str = "";
      for (let i = 0; i < n; i++) {
        if (i === col) {
          str += "Q";
        } else {
          str += ".";
        }
      }
      cur.push(str);

      DFS(result, row + 1, n, cols, left, right, cur);

      cols.splice(cols.indexOf(col), 1);
      left.splice(left.indexOf(row + col), 1);
      right.splice(right.indexOf(row - col), 1);
      cur.pop();
    }
  }
};
```

### 有效的数独

[LeetCode](https://leetcode.com/problems/valid-sudoku/)

```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const row = Array.apply(null, { length: 9 }).map(() => ({}));
  const col = Array.apply(null, { length: 9 }).map(() => ({}));
  const block = Array.apply(null, { length: 9 }).map(() => ({}));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num !== ".") {
        const index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        if (num in row[i] || num in col[j] || num in block[index]) {
          return false;
        } else {
          row[i][num] = true;
          col[j][num] = true;
          block[index][num] = true;
        }
      }
    }
  }
  return true;
};
```

### 解数独

[LeetCode](https://leetcode.com/problems/sudoku-solver/)

本题解法与 N 皇后问题很像，都是利用剪枝降低运算成本。用数组存储可以放的数字，从数组中取数。

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  if ((board && board.length !== 9) || (board[0] && board[0].length !== 9))
    return;
  let rows = generateArray();
  let cols = generateArray();
  let blocks = generateArray();

  // 去除已用数字
  let empty = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        let ch = board[i][j];
        let index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        rows[i].splice(rows[i].indexOf(ch), 1);
        cols[j].splice(cols[j].indexOf(ch), 1);
        blocks[index].splice(blocks[index].indexOf(ch), 1);
      } else {
        empty.push([i, j]);
      }
    }
  }

  backtrack(0, empty, board, rows, cols, blocks);
};

var generateArray = function () {
  return Array.from(Array(9), () =>
    [...Array(9).keys()].map((x) => (x + 1).toString())
  );
};

var backtrack = function (iter, empty, board, rows, cols, blocks) {
  if (iter === empty.length) return true;

  let [i, j] = empty[iter];
  let index = Math.floor(i / 3) * 3 + Math.floor(j / 3);

  for (let num = 1; num <= 9; num++) {
    let ch = "" + num;
    if (
      rows[i].includes(ch) &&
      cols[j].includes(ch) &&
      blocks[index].includes(ch)
    ) {
      rows[i].splice(rows[i].indexOf(ch), 1);
      cols[j].splice(cols[j].indexOf(ch), 1);
      blocks[index].splice(blocks[index].indexOf(ch), 1);

      board[i][j] = ch;
      if (backtrack(iter + 1, empty, board, rows, cols, blocks)) return true;

      rows[i].push(ch);
      cols[j].push(ch);
      blocks[index].push(ch);
    }
  }
  return false;
};
```

另一种解法是用遍历的方法，判断当前格子放入数字是否有效。

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  if ((board && board.length !== 9) || (board[0] && board[0].length !== 9))
    return;
  DFS(board);
};

var DFS = function (board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === ".") {
        for (let num = 1; num <= 9; num++) {
          let c = "" + num;
          if (isValidSudoku(board, i, j, c)) {
            board[i][j] = c;
            if (DFS(board)) return true;
            else board[i][j] = ".";
          }
        }
        return false;
      }
    }
  }
  return true;
};

var isValidSudoku = function (board, row, col, c) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] !== "." && board[row][i] === c) return false;
    if (board[i][col] !== "." && board[i][col] === c) return false;
    let row_index = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    let col_index = Math.floor(col / 3) * 3 + (i % 3);
    if (
      board[row_index][col_index] !== "." &&
      board[row_index][col_index] === c
    )
      return false;
  }
  return true;
};
```

### 单词搜索

[LeetCode](https://leetcode.com/problems/word-search/)

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (!board || board.length === 0 || (board && board[0].length === 0))
    return false;
  let m = board.length,
    n = board[0].length;
  let table = Array.from(Array(m), () => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (word.indexOf(board[i][j]) === 0) {
        if (DFS(board, word, "", i, j, table)) {
          return true;
        }
      }
    }
  }
  return false;
};

var DFS = function (board, word, current, row, col, table) {
  current += board[row][col];
  table[row][col] = 1;

  if (current.length === word.length) {
    return current === word;
  }

  let ox = row,
    oy = col;
  let direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let [dx, dy] of direction) {
    ox += dx;
    oy += dy;
    if (
      ox >= 0 &&
      ox < board.length &&
      oy >= 0 &&
      oy < board[0].length &&
      table[ox][oy] !== 1 &&
      word.indexOf(current.concat(board[ox][oy])) === 0 &&
      DFS(board, word, current, ox, oy, table)
    )
      return true;
    ox -= dx;
    oy -= dy;
  }

  table[row][col] = 0;
  return false;
};
```

## 双向 BFS

### 单词接龙

[LeetCode](https://leetcode.com/problems/word-ladder/)

```js
/**
 * 单向 BFS
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
```

```js
/**
 * 双向 BFS
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

### 最小基因变化

[LeetCode](https://leetcode-cn.com/problems/minimum-genetic-mutation/)

## 启发式搜索（A star）

主要就是要找到估值函数，根据这个函数排列出优先队列，实质还是 BFS。

### 二进制矩阵中的最短路径

[LeetCode](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

```js
/**
 * 超时啊！！！！FUCK
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  if ((grid && grid.length === 0) || (grid[0] && grid[0].length === 0))
    return -1;
  let n = grid.length;
  let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dy = [-1, 0, 1, -1, 1, -1, 0, 1];
  let pq = [[0, 0, 0, 0]];
  let visited = [];
  while (pq.length !== 0) {
    let [distance, i, j, he] = pq.shift();
    visited.push([i, j]);
    let step = distance - he;
    if (i >= 0 && i < n && j >= 0 && j < n && grid[i][j] === 0) {
      if (i === n - 1 && j === n - 1) {
        return step + 1;
      }
      for (let k = 0; k < 8; k++) {
        let x = i + dx[k],
          y = j + dy[k];
        if (
          x >= 0 &&
          x < n &&
          y >= 0 &&
          y < n &&
          grid[x][y] === 0 &&
          !visited.some((v) => v[0] === x && v[1] === y)
        ) {
          pq.push([
            distance + 1 + heuristic(x, y, n - 1),
            x,
            y,
            he + heuristic(x, y, n - 1),
          ]);
        }
      }
    } else {
      return -1;
    }
    pq.sort((a, b) => a[0] - b[0]);
  }
  return -1;
};

var heuristic = function (x, y, n) {
  return Math.max(Math.abs(n - x), Math.abs(n - y));
};
```
