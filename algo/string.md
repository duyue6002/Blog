# 字符串

在 JS 中，字符串是 immutable 的。

## 字符串基础问题

### 转换成小写字母

[LeetCode](https://leetcode.com/problems/to-lower-case/)

```js
/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function (str) {
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      str = str.slice(0, i) + String.fromCharCode(code + 32) + str.slice(i + 1);
    }
  }
  return str;
};
```

### 最后一个单词的长度

[LeetCode](https://leetcode.com/problems/length-of-last-word/)

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let count = 0;
  let index = s.length - 1;
  let flag = s[index] === " " ? true : false; // 最后一个char是空格
  for (; index >= 0; index--) {
    if (s[index] === " " && !flag) return count;
    if (s[index] !== " ") {
      count++;
      flag = false;
    }
  }
  return count;
};
```

### 宝石与石头

[LeetCode](https://leetcode.com/problems/jewels-and-stones/)

```js
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
  let count = 0;
  let map = {};
  for (let ch of J) {
    map[ch] = true;
  }
  for (let i = 0; i < S.length; i++) {
    if (map[S[i]]) {
      count++;
    }
  }
  return count;
};
```

### 字符串中的第一个唯一字符

[LeetCode](https://leetcode.com/problems/first-unique-character-in-a-string/)

```js
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let map = {};
  let first = s.length;
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (map[ch]) {
      map[ch]["counter"]++;
    } else {
      map[ch] = { index: i, counter: 1 };
    }
  }
  for (let ch of Object.keys(map)) {
    if (map[ch]["counter"] === 1 && map[ch]["index"] < first) {
      first = map[ch]["index"];
    }
  }
  return first === s.length ? -1 : first;
};
```

### 字符串转换整数 (atoi)

[LeetCode](https://leetcode.com/problems/string-to-integer-atoi/)

```js
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
  if (str.length === 0) return 0;
  let index = 0,
    sign = 1,
    number = 0;
  let MAX = Math.pow(2, 31) - 1,
    MIN = -Math.pow(2, 31);
  while (str[index] === " " && index < str.length) {
    index++;
  }
  if (str[index] === "-" || str[index] === "+") {
    sign = str[index] === "-" ? -1 : 1;
    index++;
  }
  while (index < str.length) {
    let digit = str[index] - "0";
    if (digit >= 0 && digit <= 9 && str[index] !== " ") {
      number = 10 * number + digit;
      index++;
    } else {
      break;
    }
  }
  let res = number * sign;
  if (res < MIN) return MIN;
  if (res > MAX) return MAX;
  return res;
};
```

### 大数相加

[LeetCode](https://leetcode.com/problems/add-strings/)

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let p = num1.length - 1,
    q = num2.length - 1;
  let carry = 0,
    res = "";
  while (p >= 0 || q >= 0) {
    let n1 = p >= 0 ? parseInt(num1[p--]) : 0;
    let n2 = q >= 0 ? parseInt(num2[q--]) : 0;
    let tmp = n1 + n2 + carry;
    carry = Math.floor(tmp / 10);
    res = String(tmp % 10) + res;
  }
  return carry === 1 ? "1" + res : res;
};
```

### 最后一块石头的重量

[LeetCode](https://leetcode.com/problems/last-stone-weight/)

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  while (stones.length > 1) {
    stones.sort((a, b) => b - a);
    stones.push(stones[0] - stones[1]);
    stones.splice(0, 2);
  }
  return stones[0];
};
```

## 字符串操作问题

### 最长公共前缀

[LeetCode](https://leetcode.com/problems/longest-common-prefix/description/)

```js
/**
 * 水平扫描
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
    }
  }
  return prefix;
};
```

### 反转字符串

[LeetCode](https://leetcode.com/problems/reverse-string/)

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let end = s.length - 1;
  let mid = s.length >> 1;
  for (let i = 0; i < mid; i++) {
    [s[i], s[end - i]] = [s[end - i], s[i]];
  }
};
```

### 反转字符串 II

[LeetCode](https://leetcode.com/problems/reverse-string-ii/)

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  let i = 0,
    n = s.length,
    arr = Array.from(s);
  while (n > 0) {
    let end = n >= k ? i + k - 1 : i + n - 1;
    reverse(arr, i, end);
    i += 2 * k;
    n -= 2 * k;
  }
  return arr.join("");
};

var reverse = function (arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
};
```

### 翻转字符串里的单词

[LeetCode](https://leetcode.com/problems/reverse-words-in-a-string/)

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let start = 0,
    end = s.length - 1;
  //   trim start
  while (s[start] === " ") {
    start++;
  }
  //   trim end
  while (s[end] === " ") {
    end--;
  }
  //   split
  let arr = [];
  let word = "";
  for (let i = start; i <= end; i++) {
    if (s[i] !== " ") {
      word += s[i];
    } else if (word !== "") {
      arr.unshift(word);
      word = "";
    }
  }
  arr.unshift(word);
  return arr.join(" ");
};
```

### 反转字符串中的单词 III

[LeetCode](https://leetcode.com/problems/reverse-words-in-a-string-iii/)

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let start = 0,
    end = s.length - 1;
  while (s[start] === " ") {
    start++;
  }
  while (s[end] === " ") {
    end--;
  }
  let arr = [],
    word = "";
  for (let i = start; i <= end; i++) {
    if (s[i] !== " ") {
      word = s[i].concat(word);
    } else if (word !== "") {
      arr.push(word);
      word = "";
    }
  }
  arr.push(word);
  return arr.join(" ");
};
```

### 仅仅反转字母

[LeetCode](https://leetcode.com/problems/reverse-only-letters/)

```js
/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function (S) {
  let left = 0,
    right = S.length - 1;
  let arr = Array.from(S);
  while (left < right) {
    if (isLetter(arr[left]) && isLetter(arr[right])) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    } else {
      left += isLetter(arr[left]) ? 0 : 1;
      right -= isLetter(arr[right]) ? 0 : 1;
    }
  }
  return arr.join("");
};

var isLetter = function (ch) {
  return (ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z");
};
```

## 异位词与滑动窗口

### 有效的字母异位词

[LeetCode](https://leetcode.com/problems/valid-anagram/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  let map = Array(123).fill(0);
  for (let i = 0; i < s.length; i++) {
    map[s.charCodeAt(i)]++;
  }
  for (let i = 0; i < t.length; i++) {
    map[t.charCodeAt(i)]--;
  }
  return map.every((x) => x === 0);
};
```

### 字母异位词分组

[LeetCode](https://leetcode.com/problems/group-anagrams/)

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let map = {},
    res = [];
  for (let str of strs) {
    let sorted = str.split("").sort().join("");
    if (map.hasOwnProperty(sorted)) {
      map[sorted].push(str);
    } else {
      map[sorted] = [str];
    }
  }
  for (let key in map) {
    res.push(map[key]);
  }
  return res;
};
```

```js
/**
 * 用MAP数据结构加速
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let map = new Map();
  for (let str of strs) {
    let sorted = str.split("").sort().join("");
    if (map.has(sorted)) {
      map.get(sorted).push(str);
    } else {
      map.set(sorted, [str]);
    }
  }
  return [...map.values()];
};
```

> 下面是三道滑动窗口的题目，模板为：
>
> ```js
> int left = 0, right = 0;
>
> while (right < s.size()) {
>    window.add(s[right]);
>    right++;
>
>    while (valid) {
>        window.remove(s[left]);
>        left++;
>    }
> }
> ```

### 最小覆盖子串

[LeetCode](https://leetcode.com/problems/minimum-window-substring/)

```js
/**
 * 滑动窗口
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let start = 0,
    end = s.length - 1,
    minLen = Number.MAX_VALUE;
  let left = 0,
    right = 0;
  let window = {},
    needs = {};
  for (let ch of t) {
    if (ch in needs) needs[ch]++;
    else needs[ch] = 1;
  }
  for (let ch of s) {
    window[ch] = 0;
  }

  let match = 0;
  while (right < s.length) {
    let c1 = s[right];
    if (c1 in needs) {
      window[c1]++;
      if (window[c1] === needs[c1]) {
        match++;
      }
    }
    right++;
    while (match === Object.keys(needs).length) {
      if (right - left < minLen) {
        start = left;
        end = right;
        minLen = right - left;
      }
      let c2 = s[left];
      if (c2 in needs) {
        window[c2]--;
        if (window[c2] < needs[c2]) {
          match--;
        }
      }
      left++;
    }
  }
  return minLen === Number.MAX_VALUE ? "" : s.slice(start, end);
};
```

### 找到字符串中所有字母异位词

[LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

```js
/**
 * 滑动窗口
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let left = 0,
    right = 0;
  let window = {},
    needs = {};
  let res = [];
  for (let ch of p) {
    if (ch in needs) needs[ch]++;
    else needs[ch] = 1;
  }
  for (let ch of s) {
    window[ch] = 0;
  }

  let match = 0;
  while (right < s.length) {
    let c1 = s[right];
    if (c1 in needs) {
      window[c1]++;
      if (window[c1] === needs[c1]) {
        match++;
      }
    }
    right++;
    while (match === Object.keys(needs).length) {
      if (right - left === p.length) {
        res.push(left);
      }
      let c2 = s[left];
      if (c2 in needs) {
        window[c2]--;
        if (window[c2] < needs[c2]) {
          match--;
        }
      }
      left++;
    }
  }
  return res;
};
```

### 无重复字符的最长子串

[LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

```js
/**
 * 滑动窗口
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0,
    right = 0;
  let window = {};
  let res = 0;
  for (let ch of s) {
    window[ch] = 0;
  }
  while (right < s.length) {
    let c1 = s[right];
    window[c1]++;
    right++;
    while (window[c1] > 1) {
      let c2 = s[left];
      left++;
      window[c2]--;
    }
    res = Math.max(res, right - left);
  }
  return res;
};
```

## 回文问题

### 验证回文串

[LeetCode](https://leetcode.com/problems/valid-palindrome/)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    if (isLegal(s[left]) && isLegal(s[right])) {
      let c1 = s[left].toLowerCase();
      let c2 = s[right].toLowerCase();
      if (c1 !== c2) {
        return false;
      }
      left++;
      right--;
    } else {
      left += isLegal(s[left]) ? 0 : 1;
      right -= isLegal(s[right]) ? 0 : 1;
    }
  }
  return true;
};

var isLegal = function (c) {
  return (
    (c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || (c >= "0" && c <= "9")
  );
};
```

### 验证回文字符串 II

[LeetCode](https://leetcode.com/problems/valid-palindrome-ii/)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) {
      return isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1);
    }
  }
  return true;
};

var isPalindrome = function (s, i, j) {
  while (i < j) {
    if (s[i++] !== s[j--]) {
      return false;
    }
  }
  return true;
};
```

## 最长串、子序列

### 编辑距离

[LeetCode](https://leetcode.com/problems/edit-distance/)

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let m = word1.length,
    n = word2.length;
  let dp = Array.from(Array(m + 1), () => Array(n + 1));
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  return dp[m][n];
};
```

### 最长公共子序列

[LeetCode](https://leetcode.com/problems/longest-common-subsequence/)

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
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

### 最长公共子串

```js
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubstring = function (text1, text2) {
  let m = text1.length,
    n = text2.length;
  let dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return Math.max.apply(
    null,
    dp.map((arr) => Math.max(...arr))
  );
};
```

### 最长回文子串

[LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)

```js
/**
 * 中间向两边扩展
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let len = s.length;
  if (len < 2) return s;
  let res = "";
  let maxLen = 0;
  for (let i = 0; i < len - 1; i++) {
    let odd = extendPalindrome(s, i, i); // odd
    let even = extendPalindrome(s, i, i + 1); // even
    let tmp = odd.length > even.length ? odd : even;
    if (tmp.length > maxLen) {
      maxLen = tmp.length;
      res = tmp;
    }
  }
  return res;
};

var extendPalindrome = function (s, i, j) {
  while (i >= 0 && j < s.length && s[i] === s[j]) {
    i--;
    j++;
  }
  return s.slice(i + 1, j);
};
```

```js
/**
 * DP
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 0) return s;
  let n = s.length;
  let dp = Array.from(Array(n), () => Array(n).fill(false));
  let res = s[0];
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i][j] = s[i] === s[j] && (i - j < 3 || dp[i - 1][j + 1]);
      if (dp[i][j] && i - j + 1 > res.length) {
        res = s.slice(j, i + 1);
      }
    }
  }
  return res;
};
```

### 不同的子序列

[LeetCode](https://leetcode.com/problems/distinct-subsequences/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  let dp = Array.from(Array(t.length + 1), () => Array(s.length + 1).fill(0));
  for (let i = 0; i <= s.length; i++) {
    dp[0][i] = 1;
  }
  for (let i = 1; i <= t.length; i++) {
    for (let j = i; j <= s.length; j++) {
      if (t[i - 1] === s[j - 1]) {
        // s和t都可以删掉一位，或者s删掉一位
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
      } else {
        // 不相等时s可以删掉一位
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[t.length][s.length];
};
```

## regex 和通配符匹配

> [视频-KMP 字符串匹配算法](https://www.bilibili.com/video/av11866460?from=search&seid=17425875345653862171)
>
> [阮一峰-字符串匹配的 KMP 算法](http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)

### 正则表达式匹配

[LeetCode](https://leetcode.com/problems/regular-expression-matching/)

```js
/**
 * 普通递归
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!p) return !s;
  let firstMatch = !!s && (p[0] === "." || p[0] === s[0]);
  if (p.length >= 2 && p[1] === "*") {
    return isMatch(s, p.slice(2)) || (firstMatch && isMatch(s.slice(1), p));
  }
  return firstMatch && isMatch(s.slice(1), p.slice(1));
};
```

```js
/**
 * 递归 + DP
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  let memo = Array.from(Array(s.length + 1), () =>
    Array(p.length + 1).fill(null)
  );
  return helper(s, p, 0, 0, memo);
};

var helper = function (s, p, i, j, memo) {
  if (memo[i][j] !== null) {
    return memo[i][j] == true;
  }
  let res = false;
  if (j === p.length) {
    res = i === s.length;
  } else {
    let firstMatch = i < s.length && (p[j] === "." || p[j] === s[i]);
    if (j <= p.length - 2 && p[j + 1] === "*") {
      res =
        helper(s, p, i, j + 2, memo) ||
        (firstMatch && helper(s, p, i + 1, j, memo));
    } else {
      res = firstMatch && helper(s, p, i + 1, j + 1, memo);
    }
  }
  memo[i][j] = res;
  return res;
};
```

```js
/**
 * DP
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  let dp = Array.from(Array(s.length + 1), () =>
    Array(p.length + 1).fill(false)
  );
  dp[s.length][p.length] = true;
  for (let i = s.length; i >= 0; i--) {
    for (let j = p.length - 1; j >= 0; j--) {
      let firstMatch = i < s.length && (p[j] === "." || p[j] === s[i]);
      if (j <= p.length - 2 && p[j + 1] === "*") {
        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};
```

### 通配符匹配

[LeetCode](https://leetcode.com/problems/wildcard-matching/)

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!p) return !s;
  let p1 = "";
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== "*" || p[i + 1] !== "*") {
      p1 = p1.concat(p[i]);
    }
  }
  let memo = Array.from(Array(s.length + 1), () =>
    Array(p.length + 1).fill(null)
  );
  return helper(s, p1, 0, 0, memo);
};

var helper = function (s, p, i, j, memo) {
  if (memo[i][j] !== null) {
    return memo[i][j] === true;
  }
  let res = false;
  if (j === p.length) {
    res = i === s.length;
  } else {
    let firstMatch = i < s.length && (p[j] === s[i] || p[j] === "?");
    if (p[j] === "*") {
      res =
        (i < s.length && helper(s, p, i + 1, j, memo)) ||
        helper(s, p, i, j + 1, memo);
    } else {
      res = firstMatch && helper(s, p, i + 1, j + 1, memo);
    }
  }
  memo[i][j] = res;
  return res;
};
```

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  if (!p) return !s;
  let p1 = "";
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== "*" || p[i + 1] !== "*") {
      p1 = p1.concat(p[i]);
    }
  }
  let dp = Array.from(Array(s.length + 1), () =>
    Array(p.length + 1).fill(false)
  );
  dp[s.length][p.length] = true;
  for (let i = s.length; i >= 0; i--) {
    for (let j = p.length - 1; j >= 0; j--) {
      let firstMatch = i < s.length && (p[j] === "?" || p[j] === s[i]);
      if (p[j] === "*") {
        dp[i][j] = (i < s.length && dp[i + 1][j]) || dp[i][j + 1];
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};
```

### 最长有效括号

[LeetCode](https://leetcode.com/problems/longest-valid-parentheses/)

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s.length === 0) return 0;
  let dp = Array(s.length + 1).fill(0);
  for (let i = 1; i <= s.length; i++) {
    if (s[i - 1] === ")") {
      if (i - 2 >= 0 && s[i - 2] === "(") {
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

### 同构字符串

[LeetCode](https://leetcode.com/problems/isomorphic-strings/)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) return false;
  }
  return true;
};
```
