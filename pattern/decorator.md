# 装饰者模式

需解决的问题：现有 A 方法，希望不修改 A 方法的前提下，给 A 方法增加功能。

装饰者模式就是，在 B 函数中调用 A 函数，把要加的功能加到 B 中，以后调用 B 即可。

```js
let _getElementById = document.getElementById;
document.getElementById = function() {
  alert(1);
  return _getElementById.apply(document, arguments);
};
let button = document.getElementById("button");
```
