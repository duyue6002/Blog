# 排序

## 初级排序 - $O(N^2)$

1. 选择排序：每次选最小值，放在未排序数组的起始位置
2. 插入排序：从前到后构建有序数组，未排序数组从后向前拿元素，插入到已排序数组中
3. 冒泡排序：嵌套循环，相邻元素根据大小交换

## 高级排序 - $O(N*logN)$

1. 快速排序：选择 pivot，小放左大放右，递归将两边再排序

```js
function quickSort(array, begin, end) {
  if (begin >= end) return;
  let pivot = partition(array, begin, end);
  quickSort(array, begin, pivot - 1);
  quickSort(array, pivot + 1, end);
}

function partition(array, begin, end) {
  let pivot = end,
    counter = begin;
  for (let i = begin; i < end; i++) {
    if (array[i] < array[counter]) {
      [array[i], array[counter]] = [array[counter], array[i]];
      counter++;
    }
  }
  [array[counter], array[pivot]] = [array[pivot], array[counter]];
  return counter;
}
```

2. 归并排序：长度为 n 的数组分成 n/2 子序列，对子序列归并，将有序的子序列合成完整有序数组

```js
function mergeSort(array, begin, end) {
  if (begin >= end) return;
  let mid = (begin + end) >> 1;
  mergeSort(array, begin, mid);
  mergeSort(array, mid + 1, end);
  merge(array, begin, mid, end);
}

function merge(array, begin, mid, end) {
  let tmp = Array(end - begin + 1);
  let i = begin,
    j = mid + 1,
    k = 0;
  while (i <= mid && j <= end) {
    tmp[k++] = array[i] <= array[j] ? array[i++] : array[j++];
  }
  while (i <= mid) {
    tmp[k++] = array[i++];
  }
  while (j <= end) {
    tmp[k++] = array[j++];
  }
  for (let p = 0; p < tmp.length; p++) {
    array[begin + p] = tmp[p];
  }
}
```

3. 堆排序：

## [有效的字母异位词](https://leetcode.com/problems/valid-anagram/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  s = s
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  t = t
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");
  return s === t;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  let counter = Array(123).fill(0);
  for (let i = 0; i < s.length; i++) {
    counter[s[i].charCodeAt()]++;
    counter[t[i].charCodeAt()]--;
  }
  return counter.every(x => x === 0);
};
```

## [合并区间](https://leetcode.com/problems/merge-intervals/)

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  let res = [];
  let left = intervals[0][0],
    right = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > right) {
      res.push([left, right]);
      left = intervals[i][0];
    }
    if (intervals[i][1] > right) {
      right = intervals[i][1];
    }
  }
  res.push([left, right]);
  return res;
};
```

## [翻转对](https://leetcode.com/problems/reverse-pairs/)

```js
/**
 * 巧用归并
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  if (!nums || nums.length === 0) return 0;
  return mergeSort(nums, 0, nums.length - 1);
};

var mergeSort = function(nums, begin, end) {
  if (begin >= end) return 0;
  let mid = (begin + end) >> 1;
  let count = mergeSort(nums, begin, mid) + mergeSort(nums, mid + 1, end);
  let cache = Array(end - begin + 1);
  let t = begin,
    i = begin,
    k = 0;
  for (let j = mid + 1; j <= end; j++, k++) {
    while (t <= mid && nums[t] <= 2 * nums[j]) t++;
    while (i <= mid && nums[i] < nums[j]) cache[k++] = nums[i++];
    cache[k] = nums[j];
    count += mid - t + 1;
  }
  while (i <= mid) {
    cache[k++] = nums[i++];
  }
  for (let p = 0; p < cache.length; p++) {
    nums[begin + p] = cache[p];
  }
  return count;
};
```

## [数组的相对排序](https://leetcode.com/problems/relative-sort-array/)

```js
/**
 * 计数排序
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
  let cache = Array(1001).fill(0);
  let res = [];
  for (let num of arr1) {
    cache[num]++;
  }
  for (let num of arr2) {
    while (cache[num] > 0) {
      res.push(num);
      cache[num]--;
    }
  }
  for (let num = 0; num < 1001; num++) {
    while (cache[num] > 0) {
      res.push(num);
      cache[num]--;
    }
  }
  return res;
};
```
