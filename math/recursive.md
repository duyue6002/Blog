# 递归

## 数学归纳法

1. n = 1 成立
2. 假设 n = k - 1 成立，可以推出 n = k 时成立

```js
/**
 * 第一个格子放 1 个麦子，第二个放 2 个，第三个放 4 个，以此类推
 * 求到第 k 个格子时，共有多少麦子，以及第 k 个格子放了多少麦子
 * sum 的结果为 2^k - 1，使用数学归纳法证明的代码如下
 * @param {Number} k
 * @param {Object} result {wheatNum: 0, wheatTotalNum: 0}
 */
function prove(k, result) {
  if (k === 1) {
    if (Math.pow(2, 1) - 1 === 1) {
      result.wheatNum = 1;
      result.wheatTotalNum = 1;
      return true;
    } else {
      return false;
    }
  } else {
    let previous = prove(k - 1, result);
    result.wheatNum *= 2;
    result.wheatTotalNum += result.wheatNum;
    let current = false;
    if (result.wheatTotalNum === Math.pow(2, k) - 1) current = true;
    if (previous && current) return true;
    else return false;
  }
}
```

递归的数学原理就是数学归纳法，求某个数时，逆向递推直到求出第一个数，从而得出结果。

与递归不同的迭代，使用的是正向递推的方式求出结果。

有时，递归比迭代更简单。例如，爬楼梯问题，结合数学归纳法的思路，递归的解法为：

1. 假设 n = k - 1 时，问题已解决。在 n = k 时，问题如何解决
2. n = 1 的初始状态，问题如何解决
