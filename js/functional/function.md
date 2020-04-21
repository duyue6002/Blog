# 函数篇

## 去抖

> 将回调函数的触发，延迟到上次执行 debounced 函数的 X 时间后执行。X 时间内频繁执行 debounced 函数，按照最后一次执行时间计算。

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

## 节流

> 按一定频率触发回调函数

普通节流 - 时间戳法

```js
function throttle(func, interval) {
  let previous = 0,
    result = void 0;
  return function (...args) {
    let now = Date.now();
    let remaining = interval - (now - previous);
    if (remaining <= 0) {
      previous = now;
      result = func.apply(this, args);
    }
    return result;
  };
}
```

普通节流 - 定时器法

```js
function throttle(func, interval) {
  let timerId = null,
    result = void 0;
  return function (...args) {
    if (timerId) return;
    timerId = setTimeout(() => {
      result = func.apply(this, args);
      timerId = null;
    }, interval);
    return result;
  };
}
```

可以看出，时间戳法触发回调是在执行 throttled 函数时，定时器法时在执行 throttled 函数后的 X 时间后再触发，之后都是按频率触发。underscore 将这看作去尾或去头，underscore 的 throttle 函数，可以传入 options 设置去头或去尾，默认是都保留，不支持同时设置为 false。

```js
/**
 * @param {Function} func 需要节流的回调函数
 * @param {number} [wait=0]
 * @param {Object} [options={}]
 * @param {boolean} [options.leading=true] 事件响应时执行/不执行回调
 * @param {boolean} [options.trailing=true] 事件结束后执行/不执行回调
 * @returns {Function} 有节流功能的函数
 */
function throttle(func, wait, options) {
  let timerId = null,
    result = void 0,
    previous = 0;
  if (!options) options = {};
  function later(context, args) {
    previous = options.leading === false ? 0 : Date.now();
    timerId = null;
    result = func.apply(context, args);
  }
  const throttled = function (...args) {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    // 时间戳处理 options.leading = true，留头
    if (remaining <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      previous = now;
      result = func.apply(this, args);
    }
    // 定时器处理 options.trailing = true，留尾
    else if (!timerId && options.trailing !== false) {
      timerId = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function () {
    clearTimeout(timerId);
    timerId = null;
  };
  return throttled;
}
```

> Tips
>
> clearTimeout(timerId) 代表不执行对应的回调
>
> timerId = null 是为了防止内存泄漏，因为 clearTimeout 并没有对 timerId 值做操作
