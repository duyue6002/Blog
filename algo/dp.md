# 动态规划

动态规划与递归/分治没有本质区别，关键是选择最优子结构，每一步只存最优解。

- 找重复性（分治）
- 定义状态数组
- DP 方程

解题思路：

- 最优子结构：`opt[n] = best_of(opt[n-1], opt[n-2])`
- 储存中间状态：`opt[i]`
- 递推

MIT 动态规划：[Video](https://www.bilibili.com/video/av53233912?from=search&seid=2847395688604491997)

## Fibonacci 数列

### Fibonacci

```js
function fib(n, memo) {
  if (n <= 1) {
    return n;
  }
  if (memo[n] === 0) {
    memo[n] = fib(n - 1) + fib(n - 2);
  }
  return memo[n];
}
```

## 最长公共子序列和不同路径

### 最长公共子序列

[LeetCode](https://leetcode.com/problems/longest-common-subsequence/)

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  let m = text1.length,
    n = text2.length;
  let dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
};
```

### 不同路径

[LeetCode](https://leetcode.com/problems/unique-paths/)

TODO

### 不同路径 II

[LeetCode](https://leetcode.com/problems/unique-paths-ii/)

TODO

## 三角形最小路径和 & 最大子序和

### 爬楼梯

[LeetCode](https://leetcode-cn.com/problems/climbing-stairs/description/)

### 三角形最小路径和

[LeetCode](https://leetcode.com/problems/triangle)

- 重复性：`problem(i,j) = min(sub(i+1,j), sub(i+1,j+1)) + a[i,j]`
- 状态数组：`f[i,j]`
- DP 方程：`f[i,j] = min(f[i+1,j], f[i+1,j+1]) + a[i,j]`

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  let dp = JSON.parse(JSON.stringify(triangle));
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      dp[i][j] += Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  return dp[0][0];
};
```

### 最大子序和

[LeetCode](https://leetcode.com/problems/maximum-subarray/)

- 重复性：`max_sum(i) = max(max_sum(i-1),0) + a[i]`
- 定义状态数组：`f[i]`
- DP 方程：`f[i] = max(f[i-1], 0) + a[i]`

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let arr = nums.slice();
  for (let i = 1; i < nums.length; i++) {
    arr[i] = Math.max(arr[i - 1], 0) + nums[i];
  }
  return Math.max(...arr);
};
```

### 乘积最大子序列

[LeetCode](https://leetcode.com/problems/maximum-product-subarray/)

比上题多了存储最小乘积的步骤，由于负负得正，可以获得更大的乘积。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let imax = nums[0],
    imin = nums[0];
  let dp = nums.slice();
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      [imax, imin] = [imin, imax];
    }
    imax = Math.max(imax * nums[i], nums[i]);
    imin = Math.min(imin * nums[i], nums[i]);
    dp[i] = imax;
  }
  return Math.max(...dp);
};
```

### 零钱兑换

[LeetCode](https://leetcode.com/problems/coin-change/)

DP 自顶向下：

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  return helper(coins, amount, new Array(amount + 1));
};

// F[S] = min(F[S-c]) + 1
var helper = function(coins, rem, memo) {
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

DP 自底向上：

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};
```

## 打家劫舍

### House Robber

[LeetCode](https://leetcode.com/problems/house-robber/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let dp = Array(nums.length + 2).fill(0);
  for (let i = 2; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 2]);
  }
  return dp[dp.length - 1];
};
```

```js
/**
 * 上方改进版，用 res 存储当前最大值
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let dp = Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  let res = Math.max(dp[0], dp[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    res = Math.max(res, dp[i]);
  }
  return res;
};
```

```js
/**
 * faster
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let dp = Array.from(Array(nums.length), () => Array(2).fill(0));
  dp[0][1] = nums[0];
  for (let i = 1; i < dp.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
    dp[i][1] = dp[i - 1][0] + nums[i];
  }
  return Math.max(dp[dp.length - 1][0], dp[dp.length - 1][1]);
};
```

### House Robber II

[LeetCode](https://leetcode.com/problems/house-robber-ii/)

当第一间屋被选中时，最后一间不可选，反之亦然。则对数组两次遍历，分别得出第一间不选和最后一间不选的结果，两者取大即可。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return Math.max(helper(nums.slice(1)), helper(nums.slice(0, -1)));
};

var helper = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let dp = Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  let res = Math.max(dp[0], dp[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    res = Math.max(res, dp[i]);
  }
  return res;
};
```

## 卖股票问题

### 只卖一次

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length === 0) return 0;
  let dp = Array(prices.length).fill(0);
  let imin = prices[0];
  for (let i = 1; i < prices.length; i++) {
    dp[i] = Math.max(dp[i - 1], prices[i] - imin);
    imin = Math.min(prices[i], imin);
  }
  return dp[dp.length - 1];
};
```

### 卖无限次

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    res += Math.max(0, prices[i] - prices[i - 1]);
  }
  return res;
};
```

### 卖两次

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii)

通用 DP 方程：`dp[k,i] = max(dp[k,i-1], prices[i]-prices[j]+dp[k-1,j-1])`. [详解](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/discuss/135704/Detail-explanation-of-DP-solution)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length === 0) return 0;
  let dp = Array.from(Array(3), () => Array(prices.length).fill(0));
  for (let k = 1; k < 3; k++) {
    let imin = prices[0];
    for (let i = 1; i < prices.length; i++) {
      // 遇到求最小值的loop可以简化
      // for (let j = 1; j <= i; j++) {
      //   imin = Math.min(imin, prices[j] - dp[k - 1][j - 1]);
      // }
      imin = Math.min(imin, prices[i] - dp[k - 1][i - 1]);
      dp[k][i] = Math.max(dp[k][i - 1], prices[i] - imin);
    }
  }

  // swap loop
  for (let i = 1; i < prices.length; i++) {
    for (let k = 1; k < 3; k++) {
      imin[k] = Math.min(imin[k], prices[i] - dp[k - 1][i - 1]);
      dp[k][i] = Math.max(dp[k][i - 1], prices[i] - imin[k]);
    }
  }

  // dp降维，因为dp[k][i]只和前一个dp[k][i-1]相关
  dp = Array(3).fill(0);
  for (let i = 1; i < prices.length; i++) {
    for (let k = 1; k < 3; k++) {
      imin[k] = Math.min(imin[k], prices[i] - dp[k - 1]);
      dp[k] = Math.max(dp[k], prices[i] - imin[k]);
    }
  }

  return dp[2][prices.length - 1];

  // 因为本题k=2，可以简化为：
  let onebuy = prices[0],
    onesell = 0,
    twobuy = prices[0],
    twosell = 0;
  for (let i = 1; i < prices.length; i++) {
    onebuy = Math.min(onebuy, prices[i]);
    onesell = Math.max(onesell, prices[i] - onebuy);
    twobuy = Math.min(twobuy, prices[i] - onesell);
    twosell = Math.max(twosell, prices[i] - twobuy);
  }
  return twosell;
};
```

### 有 cooldown 的卖股票

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)

构造状态转移方程：[详解](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-l-3/)

```js
/**
 *
 * @param {number[]} prices
 * @returns {number}
 */
var maxProfit = function(prices) {
  let dp = Array.from(Array(prices.length + 2), () => Array(2).fill(0));
  dp[0][0] = dp[1][0] = 0; // 当前不持有股票，下一步可以买入，利润为0
  dp[0][1] = dp[1][1] = Number.MIN_SAFE_INTEGER; // 开始时不可能持有股票，改情况不可能
  for (i = 2; i <= prices.length + 1; i++) {
    let price = prices[i - 2];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + price);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - price);
  }
  return dp[dp.length - 1][0];
};
```

### 卖 k 次

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv)

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  if (prices.length === 0) return 0;
  // 对k的判断，会使速度变快
  if (k >= prices.length / 2) return quickSolve(prices);
  let dp = Array(k + 1).fill(0);
  let imin = Array(k + 1).fill(prices[0]);
  for (let i = 1; i < prices.length; i++) {
    for (let j = 1; j <= k; j++) {
      imin[j] = Math.min(imin[j], prices[i] - dp[j - 1]);
      dp[j] = Math.max(dp[j], prices[i] - imin[j]);
    }
  }
  return dp[k];
};

var quickSolve = function(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
};
```

### 有手续费的卖

[LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)

```js
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  let dp_0 = 0,
    dp_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < prices.length; i++) {
    dp_0 = Math.max(dp_0, dp_1 + prices[i]);
    dp_1 = Math.max(dp_1, dp_0 - prices[i] - fee);
  }
  return dp_0;
};
```

## 练习

### 最小路径和

[LeetCode](https://leetcode.com/problems/minimum-path-sum/)

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let dp = JSON.parse(JSON.stringify(grid));
  let m = grid.length,
    n = grid[0].length;
  if (m === 0 || n === 0) return 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i - 1 >= 0 && j - 1 >= 0) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      } else if (i - 1 >= 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else if (j - 1 >= 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      }
    }
  }
  return dp[m - 1][n - 1];
};
```

### 编辑距离

[LeetCode](https://leetcode.com/problems/edit-distance/)

```bash
word1[i-1] !== word2[j-1]:
if word1[0...i-1) === word2[0...j):
  delete word1[i-1]: dp[i][j] = dp[i-1][j] + 1
if word1[0...i) + word2[j-1] === word2[0...j):
  insert word2[j-1]: dp[i][j] = dp[i][j-1] + 1
replace word1[i-1] = word2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
# 实质上是求：
dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1)
word1[i-1] === word2[j-1]:
  dp[i][j] = dp[i-1][j-1]
```

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let len1 = word1.length,
    len2 = word2.length;
  let dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));
  for (let i = 1; i <= len1; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= len2; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] == word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          Math.min(dp[i - 1][j - 1], Math.min(dp[i][j - 1], dp[i - 1][j])) + 1;
      }
    }
  }
  return dp[len1][len2];
};
```

### 最大正方形

[LeetCode](https://leetcode.com/problems/maximal-square/)

```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
  if (matrix.length === 0) return 0;
  let row = matrix.length,
    col = matrix[0].length;
  let dp = Array.from(Array(row), () => Array(col).fill(0));
  let sz = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j] !== "0") {
        if (i && j) {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        } else {
          dp[i][j] = matrix[i][j] - "0";
        }
      }
      sz = Math.max(dp[i][j], sz);
    }
  }
  return sz * sz;
};
```

### 矩形区域不超过 K 的最大数值和

[LeetCode](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)

TODO

### 青蛙过河

[LeetCode](https://leetcode.com/problems/frog-jump/)

TODO

### 分割数组的最大值

[LeetCode](https://leetcode.com/problems/split-array-largest-sum/)

TODO

### 学生出勤记录 II

[LeetCode](https://leetcode.com/problems/student-attendance-record-ii/)

TODO

### 任务调度器

[LeetCode](https://leetcode.com/problems/task-scheduler/)

TODO

### 回文子串

[LeetCode](https://leetcode.com/problems/palindromic-substrings/)

TODO

### 最小覆盖子串

[LeetCode](https://leetcode.com/problems/minimum-window-substring/)

TODO

### 戳气球

[LeetCode](https://leetcode.com/problems/burst-balloons/)

TODO

## 高级 DP

### 最长上升子序列

[LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;
  let dp = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return Math.max(...dp);
};
```

### 解码方法

[LeetCode](https://leetcode.com/problems/decode-ways)

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  let dp = Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i < dp.length; i++) {
    let one = parseInt(s[i - 1]);
    let two = parseInt(s.slice(i - 2, i));
    if (one >= 1 && one <= 9) {
      dp[i] += dp[i - 1];
    }
    if (two >= 10 && two <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[s.length];
};
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s[0] === "0") return 0;
  let n = s.length;
  let dp = Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    if (s[i - 1] === "0") {
      if (s[i - 2] === "1" || s[i - 2] === "2") {
        dp[i] = dp[i - 2];
      } else {
        return 0;
      }
    } else if (
      s[i - 2] === "1" ||
      (s[i - 2] === "2" && s[i - 1] >= "1" && s[i - 1] <= "6")
    ) {
      dp[i] = dp[i - 1] + dp[i - 2];
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[n];
};
```

### 最长有效括号

[LeetCode](https://leetcode.com/problems/longest-valid-parentheses)

DP 方程：

```bash
If s[i] is '(', set longest[i] to 0,because any string end with '(' cannot be a valid one.

Else if s[i] is ')'

     If s[i-1] is '(', longest[i] = longest[i-2] + 2

     Else if s[i-1] is ')' and s[i-longest[i-1]-1] == '(', longest[i] = longest[i-1] + 2 + longest[i-longest[i-1]-2]
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let dp = Array(s.length).fill(0);
  let imax = 0;
  for (let i = 1; i < s.length; i++) {
    if (
      s[i] === ")" &&
      i - dp[i - 1] - 1 >= 0 &&
      s[i - dp[i - 1] - 1] === "("
    ) {
      dp[i] =
        dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
      imax = Math.max(imax, dp[i]);
    }
  }
  return imax;
};
```

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  if (s.length === 0) return 0;
  let dp = Array(s.length + 1).fill(0);
  for (let i = 1; i <= s.length; i++) {
    if (s[i - 1] === ")") {
      if (s[i - 2] === "(") {
        dp[i] = dp[i - 2] + 2;
      } else {
        let index = i - 2 - dp[i - 1];
        if (index >= 0 && s[index] === "(") {
          dp[i] = dp[i - 1] + 2 + dp[index];
        }
      }
    }
  }
  return Math.max(...dp);
};
```

### 最大矩形

[LeetCode](https://leetcode.com/problems/maximal-rectangle/)

TODO

### 不同的子序列

[LeetCode](https://leetcode.com/problems/distinct-subsequences/)

TODO

### 赛车

[LeetCode](https://leetcode.com/problems/race-car/)

TODO

### 括号生成

[LeetCode](https://leetcode.com/problems/generate-parentheses/)

`dp[i]` 与 `dp[i-1]` 的区别在于多了一对`()`，这对括号的位置有下面这么多种方法放入：
`( + (i = p时的括号排列组合数) + ) + (i = q时的括号排列组合数)`，p 的范围是[0, n-1]，q 的范围是[n-1, 0]。

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let dp = Array(n + 1);
  dp[0] = [""];
  for (let i = 1; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j < i; j++) {
      for (let k1 of dp[j]) {
        for (let k2 of dp[i - 1 - j]) {
          dp[i].push("(" + k1 + ")" + k2);
        }
      }
    }
  }
  return dp[n];
};
```

### 使用最小花费爬楼梯

[LeetCode](https://leetcode.com/problems/min-cost-climbing-stairs/)

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  //   dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
  let n = cost.length;
  let dp = Array(n);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return Math.min(dp[n - 1], dp[n - 2]);
};
```

### 完全平方数

[LeetCode](https://leetcode.com/problems/perfect-squares/)

TODO

### 跳跃游戏

[LeetCode](https://leetcode.com/problems/jump-game/)

TODO

### 跳跃游戏 II

[LeetCode](https://leetcode.com/problems/jump-game-ii/)

TODO

### 不同路径 III

[LeetCode](https://leetcode.com/problems/unique-paths-iii/)

TODO

### 零钱兑换 II

[LeetCode](https://leetcode.com/problems/coin-change-2/)

TODO
