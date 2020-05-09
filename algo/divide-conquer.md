# 分治与回溯

## 括号生成

[LeetCode](https://leetcode.com/problems/generate-parentheses/)

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let result = [];
  helper(0, 0, n, "", result);
  return result;
};

var helper = function (left, right, n, s, memo) {
  //   terminate
  if (left === n && right === n) {
    memo.push(s);
    return;
  }
  //   process logic
  //   drill down
  if (left < n) helper(left + 1, right, n, s + "(", memo);
  if (right < left) helper(left, right + 1, n, s + ")", memo);
  //   reverse state
};
```

## Pow(x, n)

[LeetCode](https://leetcode.com/problems/powx-n/)

```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  //   terminator
  if (n === 0) return 1.0;
  //   process current logic split problems
  //   drill down, merge
  let subresult = myPow(x, n >>> 1);
  if (n & (1 === 1)) {
    return subresult * subresult * x;
  } else {
    return subresult * subresult;
  }
  //   reverse state
};
```

## 子集

[LeetCode](https://leetcode.com/problems/subsets/)

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// var subsets = function(nums) {
//   let result = [];
//   let cur = [];
//   helper(nums, 0, cur, result);
//   return result;
// };

var helper = function (nums, index, cur, memo) {
  //   terminator
  if (index === nums.length) {
    memo.push(cur);
    return;
  }
  //   process current logic
  //   drill down
  helper(nums, index + 1, cur.slice(), memo); // not pick nums[index]
  cur.push(nums[index]);
  helper(nums, index + 1, cur.slice(), memo); // pick
  //   reverse state
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let result = [[]];
  for (let num of nums) {
    let newset = [];
    for (let set of result) {
      let subset = set.concat(num);
      newset.push(subset);
    }
    result = result.concat(newset);
  }
  return result;
};
```

## 多数元素

[LeetCode](https://leetcode.com/problems/majority-element/description/)

## 电话号码的字母组合

[LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  let res = [];
  if (digits === "") return res;
  let map = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };
  helper(res, digits, 0, "", map);
  return res;
};

var helper = function (arr, digits, index, str, map) {
  if (digits.length === index) {
    arr.push(str);
    return;
  }
  let letters = map[digits[index]];
  for (let s of letters) {
    helper(arr, digits, index + 1, str.concat(s), map);
  }
};
```

## N 皇后

[LeetCode](https://leetcode.com/problems/n-queens/)

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let memo = [];
  helper(0, n, [], [], [], [], memo);
  return format(memo);
};

var helper = function (row, n, cols, left, right, state, memo) {
  if (row >= n) {
    memo.push(state);
    return;
  }
  for (let col = 0; col < n; col++) {
    if (cols[col] || left[row + col] || right[row - col]) continue;
    cols[col] = true;
    left[row + col] = true;
    right[row - col] = true;
    helper(row + 1, n, cols, left, right, state.concat([col]), memo);
    cols[col] = false;
    left[row + col] = false;
    right[row - col] = false;
  }
};

var format = function (memo) {
  let result = [];
  for (let arr of memo) {
    let ele = [];
    for (let pos of arr) {
      ele.push(".".repeat(pos) + "Q" + ".".repeat(arr.length - pos - 1));
    }
    result.push(ele);
  }
  return result;
};
```

## Kth Largest Element in an Array

[LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  k = nums.length - k;
  let begin = 0,
    end = nums.length - 1;
  while (begin < end) {
    let pivot = partition(nums, begin, end);
    if (pivot < k) {
      begin = pivot + 1;
    } else if (pivot > k) {
      end = pivot - 1;
    } else {
      break;
    }
  }
  return nums[k];
};

var partition = function (nums, begin, end) {
  let p = begin,
    q = end + 1;
  while (true) {
    while (p < end && nums[++p] < nums[begin]);
    while (q > begin && nums[--q] > nums[begin]);
    if (p >= q) break;
    [nums[p], nums[q]] = [nums[q], nums[p]];
  }
  [nums[begin], nums[q]] = [nums[q], nums[begin]];
  return q;
};
```
