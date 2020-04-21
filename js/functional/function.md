# 函数篇

## 去抖

> 在设置时间间隔内，频繁触发 foo，结果是在这段时间内只执行最后一次触发事件。

普通去抖

```js
function debounce(func) {
  let timerId = null,
    result = void 0;
  return function (...args) {
    if (timerId) clearTimeout(timer);
    timerId = setTimeout(() => {
      result = func.apply(this, args);
      timerId = null;
    }, 1000);
  };
}
```

underscore 的去抖增加了两个参数 wait 和 immediate，wait 用来设置时间间隔，immediate 用来设置是否立即触发，不是在时间间隔结束后再触发。同时可以取消 debounce 绑定。

```js
function debounce(func, wait, immediate) {
  let timerId = null,
    result = void 0;
  function later(context, args) {
    timerId = null;
    if (!immediate) result = func.apply(context, args);
  }
  const debounced = function (...args) {
    // 只记录在 wait 期间频繁操作的最后一个 timer
    if (timerId) clearTimeout(timerId);
    if (immediate) {
      // 确认是首次触发，首次触发后 timer 会赋值，防止一直执行该函数
      const callNow = !timerId;
      // 设置定时器，later 里有另外判断，不会执行此次 timer
      timerId = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      // 设置定时器，会稍后执行 later
      timerId = setTimeout(later, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timerId);
    timerId = null;
  };
  return debounced;
}
```
