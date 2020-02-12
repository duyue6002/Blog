# 字典树

前缀树，利用空间换时间的思路，提高搜索效率。

## [实现 Trie](https://leetcode.com/problems/implement-trie-prefix-tree/)

利用好 JS 对象的便利性，不需要构建明确的父子树关系，直接构造出嵌套关系即可。

```js
/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = {};
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let cur = this.root;
  for (let ch of word) {
    cur[ch] = cur[ch] || {};
    cur = cur[ch];
  }
  cur.isWord = true;
};

Trie.prototype.traverse = function(word) {
  let cur = this.root;
  for (let ch of word) {
    if (!cur) return null;
    cur = cur[ch];
  }
  return cur;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let node = this.traverse(word);
  return !!node && !!node.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  return !!this.traverse(prefix);
};
```

## [单词搜索 II](https://leetcode.com/problems/word-search-ii/)

好难啊...

```js
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  let row = board.length;
  if (row === 0) return [];
  let col = board[0].length;
  if (words.length === 0) return [];
  let trie = new Trie();
  words.forEach(word => trie.insert(word));
  let result = [];
  let visited = Array.from(Array(row), () => Array(col).fill(false));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      DFS(board, visited, i, j, "", trie, result);
    }
  }
  return [...new Set(result)];
};

var Trie = function() {
  let root = {};

  let insert = function(word) {
    let cur = root;
    for (let ch of word) {
      cur = cur[ch] = cur[ch] || {};
    }
    cur.isWord = true;
  };

  let traverse = function(word) {
    let cur = root;
    for (let ch of word) {
      if (!cur) return false;
      cur = cur[ch];
    }
    return cur;
  };

  let search = function(word) {
    let node = traverse(word);
    return !!node && !!node.isWord;
  };

  let startWith = function(prefix) {
    return !!traverse(prefix);
  };

  return { insert, search, startWith };
};

let dx = [1, -1, 0, 0];
let dy = [0, 0, 1, -1];

var DFS = function(board, visited, i, j, str, trie, result) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
  if (visited[i][j]) return;
  str += board[i][j];
  if (!trie.startWith(str)) return;
  if (trie.search(str)) {
    result.push(str);
  }
  visited[i][j] = true;
  for (let k = 0; k < 4; k++) {
    DFS(board, visited, i + dx[k], j + dy[k], str, trie, result);
  }

  visited[i][j] = false;
};
```
