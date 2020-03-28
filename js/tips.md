# 如何提高代码质量

## 健壮性

### 参数判断

类型判断：typeof，对象判断：instanceof

```js
// bad
function add(a, b) {
  return a + b;
}
// good
function add(a, b) {
  a = typeof a === "number" ? a : 0;
  b = typeof b === "number" ? b : 0;
  return a + b;
}
```

### 异常处理 try-catch

常见于 node 读取文件，网络操作。因为 JS 出错后，就会直接停止，不执行后面的方法。

```js
try {
  fs.readFile();
} catch (e) {
  console.log(e.message);
}
```

### 实例化检测

想要确定一个函数是不是被 new 关键字调用，也就是说这个函数是不是被作为构造函数而调用。

```js
// bad
function Person(name) {
  this.name = name;
}
// good
function Person(name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    throw new Error("必须用 new 关键字调用");
  }
}
// better
function Person(name) {
  if (typeof new.target !== "undefined") {
    this.name = name;
  } else {
    throw new Error("必须用 new 关键字调用");
  }
}
let person = new Person("Tim");
let notAPerson = Person.call(person, "Jim"); // 第二个不会抛出错误，第三种可以检测到错误
```

### 单例模式

保证一个类只有一个实例，提供全局访问。比如全局缓存、浏览器中的 window 对象只能有一个实例。

详见：[设计模式之单例模式](/pattern/singleton.md)

## 复用性

### 组合与继承

继承：

```js
function Parent() {}
Parent.prototype.func = function() {};

function Child() {
  Parent.call(this);
}
Child.prototype = new Parent();

let _func = Child.prototype.func;
Child.prototype.func = function() {
  _func.call(this);
  // do something new
};
```

组合：

```js
function ParentFunc() {}
function ChildFunc() {}
function Child() {
  ParentFunc();
  ChildFunc();
}
```

组合的优点在于低耦合，在继承中，如果父类型构造函数有修改，子类型就会跟着改变。所以能用组合就用组合，可扩展性强。

### 享元模式

相同代码逻辑用一个方法，不同的部分当作享元来完成。

```js
// bad
let button1, button2, button3;
button1.onclick = function() {
  console.log("button1");
  button1.style.color = "red";
};
button2.onclick = function() {
  console.log("button2");
  button1.style.color = "blue";
};
button3.onclick = function() {
  console.log("button3");
  button1.style.color = "green";
};
// good
let button1, button2, button3;
let arr = [
  [button1, "button1", "red"],
  [button2, "button2", "blue"],
  [button3, "button3", "green"]
];
function action(word, color) {
  console.log(word);
  this.style.color = color;
}
arr.forEach(data => {
  data[0].onclick = function() {
    action.call(this, data[1], data[2]);
  };
});
```

## 可扩展性

### 装饰者模式

框架里经常会用到这个方法，示例看：[设计模式之装饰者模式](/pattern/decorator.md)

### 职责链模式

封装 axios 时做拦截器、过滤器常用，示例：[设计模式之职责链模式](/pattern/chain.md)

### 观察者模式

有一对多的事件方法要处理，示例：[设计模式之观察者模式](/pattern/observer.md)

## 避免过多的 if-else

### 策略模式

示例：[设计模式之策略模式](/pattern/strategy.md)
