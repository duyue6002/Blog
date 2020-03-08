# 位运算

## 常用运算

左移，<<

右移，>>

按位或，|

按位与，&

按位取反，~

按位异或，^

```js
x^0 = x
x^1s = ~x // 1s = ~0(全1)
x^(~x) = 1s(~0)
x^x = 0
```

```js
// 判断奇偶
x % 2 === 1 => (x & 1) === 1
x % 2 === 0 => (x & 1) === 0
// 除2
x >> 1 => x = x / 2
// 清零最低位的1
x = x & (x - 1)
// 得到最低位的1表示的数
x & -x
x & ~x === 0
```

## 位 1 的个数

[LeetCode](https://leetcode.com/problems/number-of-1-bits/)

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let count = 0;
  while (n !== 0) {
    count++;
    n = n & (n - 1);
  }
  return count;
};

/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n = n >>> 1;
  }
  return count;
};
```

## 2 的幂

[LeetCode](https://leetcode.com/problems/power-of-two/)

n 的二进制表示只有一个 1，那么这个数就是 2 的幂。

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
  return n > 0 && (n & (n - 1)) === 0;
};
```

## 颠倒二进制位

[LeetCode](https://leetcode.com/problems/reverse-bits/)

```js
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res *= 2; // 左移对符号位为 1 的不成立
    res += n & 1;
    n >>>= 1;
  }
  return res;
};
```

## N 皇后 II

[LeetCode](https://leetcode.com/problems/n-queens-ii/description/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
  let count = 0;
  let DFS = function(n, row, col, left, right) {
    if (row >= n) {
      count++;
      return;
    }
    let bits = ~(col | left | right) & ((1 << n) - 1);
    while (bits) {
      let p = bits & -bits;
      bits &= bits - 1;
      DFS(n, row + 1, col | p, (left | p) << 1, (right | p) >> 1);
    }
  };
  DFS(n, 0, 0, 0, 0);
  return count;
};
```

## 比特位计数

[LeetCode](https://leetcode.com/problems/counting-bits/description/)

### DP + 最高有效位

> P(x+b)=P(x)+1, b=2^m >x

```js
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  let res = Array(num + 1).fill(0);
  let i = 0,
    b = 1;
  while (b <= num) {
    while (i < b && i + b <= num) {
      res[i + b] = res[i] + 1;
      i++;
    }
    i = 0;
    b <<= 1;
  }
  return res;
};
```

### DP + 最低有效位

> P(x)=P(x/2)+(x mod 2)

```js
/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function(num) {
  let res = Array(num + 1).fill(0);
  for (let i = 0; i <= num; i++) {
    res[i] = res[Math.floor(i / 2)] + (i % 2);
  }
  return res;
};
```
