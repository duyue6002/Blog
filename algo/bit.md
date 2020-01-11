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
x^1s = ~x
x^(~x) = 1s(~0)
x^x = 0
```

```js
// 判断奇偶
x % 2 === 1	 => (x & 1) === 1
x % 2 === 0	 => (x & 1) === 0
// 除2
x >> 1 	=> x = x / 2
// 清零最低位的1
x = x & (x - 1)
// 得到最低位的1表示的数
x & -x
x & ~x === 0
```

## [位1的个数](https://leetcode.com/problems/number-of-1-bits/)

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
    count += (n & 1)
    n = n >>> 1
  }
  return count;
};
```

## [2的幂](https://leetcode.com/problems/power-of-two/)

n 的二进制表示只有一个 1，那么这个数就是 2 的幂
