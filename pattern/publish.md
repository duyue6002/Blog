# 发布-订阅模式

1. 需要发布者
2. 发布者有缓存列表，存放回调函数，以告诉订阅者
3. 发布消息时，发布者遍历列表，依次触发回调函数

## 手撕

```js
/**
 * 发布-订阅模式
 */
let Events = (function() {
  let subscribers = [],
    listen,
    trigger,
    remove;
  // 有订阅时，将回调函数存入缓存列表
  listen = function(key, fn) {
    if (!subscribers[key]) {
      subscribers[key] = [];
    }
    subscribers[key].push(fn);
  };
  // 发布时，遍历列表，依次触发回调函数
  trigger = function() {
    let key = [].shift.call(arguments);
    let fns = subscribers[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let fn of fns) {
      fn.apply(this, arguments);
    }
  };
  // 移除订阅者
  remove = function(key, fn) {
    let fns = subscribers[key];
    if (fns) {
      if (!fn) {
        fns = [];
      } else {
        for (let i = fns.length - 1; i >= 0; i--) {
          if (fns[i] === fn) {
            fns.splice(i, 1);
          }
        }
      }
    }
  };
  return {
    listen,
    trigger,
    remove
  };
})();
```
