# 栈与队列

## 有效的括号

[LeetCode](https://leetcode.com/problems/valid-parentheses/)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (str) {
  let stack = [];
  let map = {
    "(": ")",
    "{": "}",
    "[": "]",
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

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.data = [];
  this.help = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.data.push(x);
  if (this.help.length === 0 || x < this.help[this.help.length - 1]) {
    this.help.push(x);
  } else {
    this.help.push(this.help[this.help.length - 1]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.data.pop();
  this.help.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.data[this.data.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.help[this.help.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

## 柱状图中最大的矩形

[LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)

```js
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let stack = [];
  stack.push(-1);
  let maxarea = 0;
  for (let i = 0; i < heights.length; i++) {
    console.log(heights[stack[stack.length - 1]]);
    console.log(heights[i]);
    while (
      stack[stack.length - 1] !== -1 &&
      heights[stack[stack.length - 1]] >= heights[i]
    ) {
      console.log(
        heights[stack[stack.length - 1]] * (i - stack[stack.length - 2] - 1)
      );
      maxarea = Math.max(
        maxarea,
        heights[stack.pop()] * (i - stack[stack.length - 1] - 1)
      );
    }
    stack.push(i);
  }

  while (stack[stack.length - 1] !== -1) {
    console.log(
      heights[stack[stack.length - 1]] *
        (heights.length - stack[stack.length - 1] - 1)
    );
    maxarea = Math.max(
      maxarea,
      heights[stack.pop()] * (heights.length - stack[stack.length - 1] - 1)
    );
  }

  return maxarea;
};
```

## 滑动窗口最大值

[LeetCode](https://leetcode.com/problems/sliding-window-maximum/)

TODO

## 设计循环双端队列

[LeetCode](https://leetcode.com/problems/design-circular-deque/)

TODO

## 接雨水

[LeetCode](https://leetcode.com/problems/trapping-rain-water/)

TODO

## 比较含退格的字符串

[LeetCode](https://leetcode.com/problems/backspace-string-compare/)

```js
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  return helper(S) === helper(T);
};
var helper = function (s) {
  let stack = [];
  for (let c of s) {
    if (c !== "#") {
      stack.push(c);
    } else {
      stack.pop();
    }
  }
  return stack.join("");
};
```
