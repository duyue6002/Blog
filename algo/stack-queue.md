# 栈与队列

## [有效的括号](https://leetcode.com/problems/valid-parentheses/)

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

## [最小栈](https://leetcode.com/problems/min-stack/)

## [柱状图中最大的矩形](https://leetcode.com/problems/largest-rectangle-in-histogram/)

## [滑动窗口最大值](https://leetcode.com/problems/sliding-window-maximum/)

## [设计循环双端队列](https://leetcode.com/problems/design-circular-deque/)

## [接雨水](https://leetcode.com/problems/trapping-rain-water/)