# 哈希表

## 有效的字母异位词

[LeetCode](https://leetcode.com/problems/valid-anagram/description/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  let map = {};
  for (let c of s) {
    if (c in map) {
      let count = map[c] + 1;
      map[c] = count;
    } else {
      map[c] = 1;
    }
  }
  for (let c of t) {
    if (!(c in map)) {
      return false;
    } else {
      let count = map[c] - 1;
      map[c] = count;
    }
  }
  return Object.values(map).every(value => value === 0);
};
```

## 字母异位词分组

[LeetCode](https://leetcode.com/problems/group-anagrams/)

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let map = {};
  for (let s of strs) {
    let key = s
      .split("")
      .sort((a, b) => a.localeCompare(b))
      .join("");
    if (!map.hasOwnProperty(key)) {
      map[key] = [];
    }
    map[key].push(s);
  }
  return Object.values(map);
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
