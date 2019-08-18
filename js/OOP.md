# JS 面向对象

> 本文试图说明原型、继承、mixin/extends、模块化、TS 做个串烧

## 对象的基本概念

对象基于引用类型创建，具有属性。

属性类型分为**数据类型**和**访问器类型**。使用`Object.defineProperty()`方法创建。使用`Object.getOwnPropertyDescriptor(obj, propertyName)`取得给定属性的描述符。

### 数据类型

- [[Configurable]]
- [[Enumerable]]
- [[Writable]]
- [[Value]]

### 访问器类型

- [[Configurable]]
- [[Enumerable]]
- [[Get]]
- [[Set]]

## 创建对象

### 工厂模式

```js
function createPerson(name, age) {
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sayName = function() {
    alert(this.name);
  };
  return obj;
}
let Timmy = createPerson("Timmy", 23);
let Saoirse = createPerson("Saoirse", 25);
```

#### 解决的问题

用封装函数创建对象，函数接受的参数包含对象的必要信息。多次调用函数，以创建对象。

#### 存在的问题

无法知道对象的类型。所有实例指向一个原型。

### 构造函数模式

```js
function Person(name) {
  this.name = name;
  this.func = function() {
    // do something
  };
}
var person = new Person("kk");
```

#### 解决的问题

创建的实例有`constructor`属性用来标识对象类型，用`instanceof`更好。

`new`操作符创建特定类型的对象。

- 创建新对象
- 构造函数的作用域赋给新对象（this 指向新对象）
- 执行构造函数的代码（给新对象添加属性）
- 返回新对象

##### 手撕 new

```js
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = "Games";
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function() {
  console.log("I am " + this.name);
};

function objectFactory() {
  var obj = new Object();
  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === "object" ? ret : obj;
}

var person = objectFactory(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60

person.sayYourName(); // I am Kevin
```

#### 存在的问题

对象的属性方法，在每个实例上都重新创建了一遍。因为函数也是对象，每定义一个函数，就实例化了一个对象。

这会导致相同的方式创建函数，却是不同的作用域链和标识符解析，不同实例的同名函数是不对等的。

解决方法，就是将函数定义在构造函数外部，在构造函数内部将属性指向对应的全局函数。同时，**函数也缺少了封装性**。

### 原型模式

```js
function Person(name) {}
// Person.prototype.name = 'ts';
// Person.prototype.func = function() {};
Person.prototype = {
  constructor: Person,
  name: "ts",
  func: function() {}
};
var person = new Person();
```

每个函数都有`prototype`属性，该属性指向一个对象，该对象包含特定类型的所有实例共享的属性和方法。简而言之，`prototype`指向这个对象实例的原型对象。

#### 原型对象

函数创建时，会有`prototype`属性，指向函数的原型对象。原型对象有`constructor`属性，指向该函数。

调用构造函数创建实例后，会有`[[Prototype]]`**指针**（而非副本），指向构造函数的原型对象，在浏览器中每个对象以`__proto__`来访问，也可以用`isPropertyOf()`或`Object.getPropertyOf()`方法来确定。**这个连接存在于实例与原型对象之间，而非实例与构造函数之间。**

对象实例中的属性可以屏蔽原型对象中的同名属性。`Object.hasOwnProperty()`会检测属性在实例中，还是在原型中，仅在实例中的属性才返回 true。`in`操作符检测属性能否被对象访问到，无论属性存在于对象中，还是原型对象中。

for-in 循环，返回的是所有对象可访问的、可枚举的属性，`constructor`和`prototype`不可枚举。可枚举属性可以通过`Object.keys()`获取，所有属性可以通过`Object.getOwnPropertyNames()`获取。

在创建实例后，重写原型对象，指向另一个对象，此时，就切断了构造函数与最初原型之间的联系。但此时，实例对象的`__proto__`是指向最初原型的。

#### 存在的问题

- 共享属性是引用类型值时，一个实例修改，会导致该共享属性被修改。
- 不能初始化参数

### 构造函数 + 原型模式

```js
function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  func: function() {}
};
var person = new Person();
```

构造函数内部定义实例属性，原型对象定义方法和共享属性。

### 寄生构造函数模式

工厂模式 + new 操作符调用。

```js
function Person(name) {
  var o = new Object();
  o.name = name;
  o.func = function() {};
  return o;
}
var person = new Person("ts");
```

> 什么场景使用？

### 稳妥构造函数模式

与工厂模式相似，但创建对象的实例方法中不引用 this，切不用 new 调用。

### ES6 类构造

使用 class 语法糖，其实是**原型 + 构造函数**，`constructor`里的内容相当于构造函数，属性方法就是在其原型上添加方法，但这些方法都是**不可枚举的**。

## 继承

JS 支持实现继承，继承实际的方法，依赖原型链实现。

### 原型链继承

```js
Child.prototype = new Parent();
```

问题：

- 父类（引用类型）的属性被所有实例共享。
- 创建实例时，无法向父类传参。

### 借用构造函数继承

```js
function Child() {
  Parent.call(this);
}
```

解决了属性共享和传参问题。

问题：

- 方法在构造函数中定义，每次创建实例会创建一遍方法。

### 原型链 + 构造函数 组合继承

```js
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
```

融合两者优点，是最常用的继承模式。

### 原型式继承

```js
// Object.create 的实现
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

问题：

- 父类的属性被共享，与原型链继承一样。

### 寄生式继承

```js
function createObj(o) {
  var clone = Object.create(o);
  clone.func = function() {
    // do something
  };
  return clone;
}
```

问题：

- 与借用构造函数一样，每次创建对象都会创建一遍方法

### 寄生组合式继承

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

prototype(Child, Parent);
Child.__proto__ = Parent;
```

这种方式最理想，能保持原型链不变，且不会影响`Parent.prototype`的属性。

### 类继承

extends 是**寄生组合继承**的语法糖。
