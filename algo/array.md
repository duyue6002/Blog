# 数组

## 盛最多水的容器

[LeetCode](https://leetcode.com/problems/container-with-most-water/)

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  for (let i = 0, j = height.length - 1; i < j; ) {
    let minHeight = height[i] < height[j] ? height[i++] : height[j--];
    let area = (j - i + 1) * minHeight;
    max = Math.max(max, area);
  }
  return max;
};

var maxArea = function (height) {
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
var moveZeroes = function (nums) {
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
var moveZeroes = function (nums) {
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

/**
 * method 3
 * @param {*} nums
 */
var moveZeroes = function (nums) {
  let i = 0;
  for (let num of nums) {
    if (num !== 0) {
      nums[i++] = num;
    }
  }
  while (i < nums.length) {
    nums[i++] = 0;
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
var climbStairs = function (n) {
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
var threeSum = function (nums) {
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
var removeDuplicates = function (nums) {
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
var rotate = function (nums, k) {
  let length = nums.length;
  k %= length;
  reverse(nums, 0, length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, length - 1);
};

var reverse = function (nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
};
```

## 旋转图像

[LeetCode](https://leetcode.com/problems/rotate-image/)

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  matrix.reverse();
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
};
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
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--]
    } else {
      nums1[k--] = nums2[j--]
    }
  }
  while (j >= 0) {
    nums1[k--] = nums2[j--]
  }
};
```

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let copy = nums1.slice(0, m);
  let i = 0,
    j = 0,
    k = 0;
  while (i < m && j < n) {
    nums1[k++] = copy[i] < nums2[j] ? copy[i++] : nums2[j++];
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
var twoSum = function (nums, target) {
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
var plusOne = function (digits) {
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
var plusOne = function (digits) {
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

## 有序数组中的单一元素

[LeetCode](https://leetcode.com/problems/single-element-in-a-sorted-array/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i] && j - i === 1) return nums[i];
    if (j - i > 1) {
      i = j;
    }
  }
  return nums[i];
};
```

## 岛屿周长

[LeetCode](https://leetcode.com/problems/island-perimeter)

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        res = calculate(grid, i, j, m, n, res);
      }
    }
  }
  return res;
};

var calculate = function (grid, i, j, m, n, res) {
  res += 4;
  const map = [
    [0, -1],
    [-1, 0],
  ];
  for (let [x, y] of map) {
    let dx = i + x,
      dy = j + y;
    if (dx >= 0 && dx < m && dy >= 0 && dy < n && grid[dx][dy] === 1) {
      res -= 2;
    }
  }
  return res;
};
```

## 两个数组的交集 II

[LeetCode](https://leetcode.com/problems/intersection-of-two-arrays-ii/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map = {},
    res = [];
  for (let num of nums1) {
    if (map[num]) {
      map[num]++;
    } else {
      map[num] = 1;
    }
  }
  for (let num of nums2) {
    if (map[num] && map[num] > 0) {
      res.push(num);
      map[num]--;
    }
  }
  return res;
};
```

## 有效的数独

[LeetCode](https://leetcode.com/problems/valid-sudoku/)

```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const row = Array.apply(null, { length: 9 }).map(() => ({}));
  const col = Array.apply(null, { length: 9 }).map(() => ({}));
  const block = Array.apply(null, { length: 9 }).map(() => ({}));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num !== ".") {
        const index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        if (num in row[i] || num in col[j] || num in block[index]) {
          return false;
        } else {
          row[i][num] = true;
          col[j][num] = true;
          block[index][num] = true;
        }
      }
    }
  }
  return true;
};
```
