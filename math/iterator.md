# 迭代

不断用旧的变量值，递推计算新的变量值。循环的典型利用。

## 求数值的精确度或近似值

利用二分法，不断迭代，无限逼近。

```js
/**
 *
 * @param {Number} num 要求平方根的数
 * @param {Number} deltaThreshold 控制精确度
 * @param {Number} maxTry 控制最多循环次数
 */
function getSquareRoot(num, deltaThreshold, maxTry) {
  let min = 1.0,
    max = num;
  for (let i = 0; i < maxTry; i++) {
    let mid = (min + max) / 2;
    let square = mid * mid;
    let delta = Math.abs(square / num - 1);
    if (delta <= deltaThreshold) {
      return mid;
    } else {
      if (square > num) {
        max = mid;
      } else {
        min = mid;
      }
    }
  }
}
```

## 在一定范围内找目标值

常见于查字典，需要现将字典排序，利用二分迭代找到对应的单词/字母。

> 二分针对的是有序数组

```js
/**
 *
 * @param {Array} array 字符串数组
 * @param {String} str 要查询的字符串
 */
function search(array, str) {
  if (!array || !array.length || array.length === 0) return false;
  array = array.sort();
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (str < array[mid]) {
      right = mid - 1;
    } else if (str > array[mid]) {
      left = mid + 1;
    } else {
      return true;
    }
  }
  return false;
}
```
