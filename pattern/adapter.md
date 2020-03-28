# 适配器模式

需解决的问题：两个对象功能相似，但是 API 或参数不同，需要用适配器当中介。

A 是常用函数库，B 是公司在 A 基础上改进的自用函数库，A 和 B 是相似的，但某些 API 不同。当前项目是基于 A 完成的，现在想替换成 B，需要 C 当作适配器，为 API 或参数不同的方法适配。

```js
// API 适配
// A.on 与 B.o 是相同功能的两个方法
// C 已继承 B
C.prototype.on = function() {
  B.o.call(this, arguments);
};
A = C;
```

```js
// 参数适配
// A.on 与 B.on 是相同功能的两个方法，但接受参数不同
// C 已继承 B
C.prototype.on = function(obj) {
  // B 中有三个参数，给予默认值
  let _adapter = {
    a: 1,
    b: 2,
    c: 3
  };
  for (let i in _adapter) {
    _adapter[i] = obj[i] || _adapter[i];
  }
};
A = C;
```
