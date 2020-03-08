# 并查集

组团、配对问题，看两两元素是否在同一集合里。

模板如下：

```js
let unionFind = function(n) {
  let count = n;
  let parent = Array(n);

  let init = function(n) {
    for (let i = 0; i < n; i++) {
      parent[i] = i;
    }
  };

  let findParent = function(x) {
    while (x !== parent[x]) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };

  let union = function(p, q) {
    let P = findParent(p),
      Q = findParent(q);
    if (P === Q) return;
    parent[P] = Q;
    count--;
  };
};
```

## 朋友圈

[LeetCode](https://leetcode.com/problems/friend-circles)

与岛屿问题相同，将是朋友的并在一起，成为一个集合，最后看集合的个数就是朋友圈的个数。

```js
/**
 *
 * @param {number[][]} M
 */
var findCircleNum = function(M) {
  if (M.length === 0) return 0;
  let length = M.length;
  let count = length;
  let parent = Array(length);
  for (let i = 0; i < length; i++) {
    parent[i] = i;
  }

  // 找到元素所在集合 parent
  let find = function(n) {
    while (n !== parent[n]) {
      parent[n] = parent[parent[n]];
      n = parent[n];
    }
    return n;
  };

  let union = function(p, q) {
    let P = find(p),
      Q = find(q);
    if (P === Q) return;
    parent[P] = Q;
    count--;
  };

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (M[i][j] === 1) {
        union(i, j);
      }
    }
  }

  return count;
};
```

## 岛屿数量

[LeetCode](https://leetcode.com/problems/number-of-islands/)

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if (grid.length === 0 || (!!grid[0] && grid[0].length === 0)) return 0;
  let row = grid.length,
    col = grid[0].length;

  let dx = [-1, 1, 0, 0];
  let dy = [0, 0, 1, -1];

  let uf = new unionFind(grid);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === "1") {
        for (let k = 0; k < 4; k++) {
          let x = i + dx[k],
            y = j + dy[k];
          if (x >= 0 && x < row && y >= 0 && y < col && grid[x][y] === "1") {
            uf.union(i * col + j, x * col + y);
          }
        }
      }
    }
  }

  return uf.count;
};

var unionFind = function(grid) {
  let row = grid.length,
    col = grid[0].length;
  this.parent = Array(row * col).fill(0);
  this.count = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === "1") {
        this.parent[i * col + j] = i * col + j;
        this.count++;
      }
    }
  }

  this.find = function(p) {
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  };

  this.union = function(p, q) {
    let P = this.find(p),
      Q = this.find(q);
    if (P === Q) return;
    this.parent[P] = Q;
    this.count--;
  };
};
```

## 被围绕的区域

[LeetCode](https://leetcode.com/problems/surrounded-regions/)

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board.length === 0 || (board[0] && board[0].length === 0)) return;
  let row = board.length,
    col = board[0].length;
  let dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];
  let uf = new unionFind(board);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === "O") {
        if (i === 0 || j === 0 || i === row - 1 || j === col - 1) {
          uf.union(i * col + j, row * col);
        } else {
          for (let k = 0; k < 4; k++) {
            let x = i + dx[k],
              y = j + dy[k];
            if (x >= 0 && x < row && y >= 0 && y < col && board[x][y] === "O") {
              uf.union(i * col + j, x * col + y);
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!uf.connected(i * col + j, row * col)) {
        board[i][j] = "X";
      }
    }
  }
};

var unionFind = function(board) {
  let row = board.length,
    col = board[0].length;
  this.parent = Array(row * col + 1).fill(0);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === "O") {
        this.parent[i * col + j] = i * col + j;
      }
    }
  }

  this.find = function(n) {
    while (n !== this.parent[n]) {
      this.parent[n] = this.parent[this.parent[n]];
      n = this.parent[n];
    }
    return n;
  };

  this.union = function(p, q) {
    let P = this.find(p),
      Q = this.find(q);
    if (P === Q) return;
    this.parent[P] = Q;
  };

  this.connected = function(p, q) {
    return this.find(p) === this.find(q);
  };
};
```
