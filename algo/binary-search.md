# 二分查找

## isBadVersion

[LeetCode](https://leetcode.com/problems/first-bad-version/)

```js
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let start = 0,
      end = n;
    while (start <= end) {
      let mid = start + ((end - start) >> 1);
      if (isBadVersion(mid) && !isBadVersion(mid - 1)) return mid;
      else if (isBadVersion(mid)) end = mid - 1;
      else start = mid + 1;
    }
    return -1;
  };
};
```

## x 的平方根

[LeetCode](https://leetcode.com/problems/sqrtx/)

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x === 0 || x === 1) return x;
  let left = 1,
    right = x;
  while (left <= right) {
    let mid = left + ((right - left) >>> 1);
    if (mid * mid > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
};
```

## 有效的完全平方数

[LeetCode](https://leetcode.com/problems/valid-perfect-square/)

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  if (num === 0 || num === 1) return true;
  let left = 1,
    right = num;
  while (left <= right) {
    let mid = left + ((right - left) >>> 1);
    if (mid * mid === num) {
      return true;
    } else if (mid * mid > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return false;
};
```

## 搜索旋转排序数组

[LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    let mid = (right + left) >>> 1;
    //     [0, mid] go up
    if (nums[mid] >= nums[0] && (target > nums[mid] || target < nums[0])) {
      left = mid + 1;
    } else if (target > nums[mid] && target < nums[0]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left === right && nums[left] === target ? left : -1;
};
```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    if (nums[left] < nums[right]) break;
    let mid = (left + right) >> 1;
    if (nums[mid] >= nums[left]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  const minIndex = left;
  left = 0;
  right = nums.length - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    let realmid = (minIndex + mid) % nums.length;
    if (target === nums[realmid]) return realmid;
    else if (target > nums[realmid]) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};
```

## 搜索二维矩阵

[LeetCode](https://leetcode.com/problems/search-a-2d-matrix/)

## 寻找旋转排序数组中的最小值

[LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    if (nums[left] < nums[right]) break;
    let mid = (left + right) >> 1;
    if (nums[mid] >= nums[left]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
};
```
