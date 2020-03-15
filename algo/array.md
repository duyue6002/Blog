# 数组

## 盛最多水的容器

[LeetCode](https://leetcode.com/problems/container-with-most-water/)

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let max = 0;
  for (let i = 0, j = height.length - 1; i < j; ) {
    let minHeight = height[i] < height[j] ? height[i++] : height[j--];
    let area = (j - i + 1) * minHeight;
    max = Math.max(max, area);
  }
  return max;
};

var maxArea = function(height) {
  let max = 0;
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length - 1; j++) {
      let area = (j - i) * Math.min(height[i], height[j]);
      max = Math.max(max, area);
    }
  }
  return max;
};
```

## 移动零

[LeetCode](https://leetcode-cn.com/problems/move-zeroes/)

```js
/**
 * method 1
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] === 0) {
      // find no-zero number
      let j = i + 1;
      for (; j < nums.length; j++) {
        if (nums[j] !== 0) {
          break;
        }
      }
      // swap
      if (j === nums.length) {
        break;
      } else {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }
};

/**
 * method 2
 * @param {*} nums
 */
var moveZeroes = function(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[j] = nums[i];
      if (i !== j) {
        nums[i] = 0;
      }
      j++;
    }
  }
};
```

## 爬楼梯

[LeetCode](https://leetcode.com/problems/climbing-stairs/)

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n <= 2) return n;
  let f1 = 1,
    f2 = 2,
    f3 = 3;
  for (let i = 3; i < n; i++) {
    f1 = f2;
    f2 = f3;
    f3 = f1 + f2;
  }
  return f3;
};
```

## 三数之和

[LeetCode](https://leetcode.com/problems/3sum/)

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums = nums.sort((a, b) => a - b);
  let result = [];
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] >= 0) break;
    let i = k + 1,
      j = nums.length - 1;
    while (i < j) {
      let s = nums[k] + nums[i] + nums[j];
      if (s < 0) {
        i++;
        while (nums[i] === nums[i - 1]) {
          i++;
        }
      } else if (s > 0) {
        j--;
        while (nums[j] === nums[j + 1]) {
          j--;
        }
      } else if (s === 0) {
        result.push([nums[k], nums[i], nums[j]]);
        break;
      }
    }
  }
  return result;
};
```

## 删除排序数组中的重复项

[LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
};
```

## 旋转数组

[LeetCode](https://leetcode.com/problems/rotate-array/)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  let length = nums.length;
  k %= length;
  reverse(nums, 0, length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, length - 1);
};

var reverse = function(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}
```

## 合并两个有序数组

[LeetCode](https://leetcode.com/problems/merge-sorted-array/)

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let copy = nums1.slice(0, m);
  let i = 0, j = 0, k = 0;
  while (i < m && j < n) {
    nums1[k++] = (copy[i] < nums2[j]) ? copy[i++] : nums2[j++];
  }
  while (i < m) {
    nums1[k++] = copy[i++];
  }
  while (j < n) {
    nums1[k++] = nums2[j++];
  }
};
```

## 两数之和

[LeetCode](https://leetcode.com/problems/two-sum/)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let buff = {};
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in buff) {
      return [buff[nums[i]], i];
    } else {
      buff[target - nums[i]] = i;
    }
  }
};
```

## 加一

[LeetCode](https://leetcode-cn.com/problems/plus-one/)

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let flag = true;
  let index = digits.length - 1;
  while (flag && index >= 0) {
    digits[index] += 1;
    if (digits[index] === 10) {
      digits[index] = 0;
    } else {
      flag = false;
    }
    index--;
  }
  if (flag && index < 0) {
    digits.unshift(1);
  }
  return digits;
};

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  digits.unshift(1);
  return digits;
};
```
