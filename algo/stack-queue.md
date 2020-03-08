# 栈与队列

## 有效的括号

[LeetCode](https://leetcode.com/problems/valid-parentheses/)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(str) {
  let stack = [];
  let map = {
    "(": ")",
    "{": "}",
    "[": "]"
  };
  for (let s of str) {
    let top = stack[stack.length - 1];
    if (s === map[top]) {
      stack.pop();
    } else {
      stack.push(s);
    }
  }
  return stack.length === 0;
};
```

## 最小栈

[LeetCode](https://leetcode.com/problems/min-stack/)

TODO

## 柱状图中最大的矩形

[LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)

TODO

## 滑动窗口最大值

[LeetCode](https://leetcode.com/problems/sliding-window-maximum/)

TODO

## 设计循环双端队列

[LeetCode](https://leetcode.com/problems/design-circular-deque/)

TODO

## 接雨水

[LeetCode](https://leetcode.com/problems/trapping-rain-water/)

TODO
