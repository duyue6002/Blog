# 迭代

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
