# 单例模式

保证一个类只有一个实例，提供全局访问。比如全局缓存、浏览器中的 window 对象只能有一个实例。

```js
let CreatePerson = function(name) {
  this.name = name;
};
let SingletonCreatePerson = (function() {
  let instance;
  return function(name) {
    if (!instance) {
      instance = new CreatePerson(name);
    }
    return instance;
  };
})();
let a = new SingletonCreatePerson("A");
let b = new SingletonCreatePerson("B");
a === b; // true
```
