# 贪心

## 零钱兑换

[LeetCode](https://leetcode.com/problems/coin-change/)

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  return helper(coins, amount, new Array(amount + 1));
};

var helper = function (coins, rem, memo) {
  if (rem < 0) return -1;
  if (rem === 0) return 0;
  if (memo[rem]) return memo[rem];
  let imin = Number.MAX_SAFE_INTEGER;
  for (let coin of coins) {
    let res = helper(coins, rem - coin, memo);
    if (res >= 0 && res < imin) {
      imin = res + 1;
    }
  }
  memo[rem] = imin === Number.MAX_SAFE_INTEGER ? -1 : imin;
  return memo[rem];
};
```

## 柠檬水找零

[LeetCode](https://leetcode.com/problems/lemonade-change/description/)

## 买卖股票的最佳时机 II

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1];
    }
  }
  return res;
};
```

## 分发饼干

[LeetCode](https://leetcode.com/problems/assign-cookies/description/)

```js
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  let i = 0;
  for (let j = 0; i < g.length && j < s.length; j++) {
    if (s[j] >= g[i]) {
      i++;
    }
  }
  return i;
};
```

## 模拟行走机器人

[LeetCode](https://leetcode.com/problems/walking-robot-simulation/description/)

## 跳跃游戏

[LeetCode](https://leetcode.com/problems/jump-game/)

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  if (!nums) return false;
  let endReachable = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] + i >= endReachable) {
      endReachable = i;
    }
  }
  return endReachable === 0;
};
```

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  if (!nums) return false;
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false;
    k = Math.max(k, i + nums[i]);
  }
  return true;
};
```

## 跳跃游戏 II

[LeetCode](https://leetcode.com/problems/jump-game-ii/)

## Two City Scheduling

[LeetCode](https://leetcode.com/problems/two-city-scheduling/)

```js
/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  let res = 0;
  costs.sort((a, b) => b[1] - b[0] - a[1] + a[0]);
  const N = costs.length;
  for (let i = 0; i < N; i++) {
    if (i < N / 2) {
      res += costs[i][0];
    } else {
      res += costs[i][1];
    }
  }
  return res;
};
```
