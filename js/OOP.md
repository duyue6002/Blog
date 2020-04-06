# JS 中的对象

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
  obj.sayName = function () {
    alert(this.name);
  };
  return obj;
}
let Timmy = createPerson("Timmy", 23);
let Saoirse = createPerson("Saoirse", 25);
```

> **解决的问题**
>
> 用封装函数创建对象，函数接受的参数包含对象的必要信息。多次调用函数，以创建对象。
>
> **存在的问题**
>
> 无法知道对象的类型。所有实例指向一个原型。

### 构造函数模式

```js
function Person(name) {
  this.name = name;
  this.func = function () {
    // do something
  };
}
var person = new Person("kk");
```

`new`操作符创建特定类型的对象。

- 创建新对象
- 构造函数的作用域赋给新对象（this 指向新对象）
- 执行构造函数的代码（给新对象添加属性）
- 返回新对象

> **解决的问题**
>
> 创建的实例有`constructor`属性用来标识对象类型，用`instanceof`更好。
>
> **存在的问题**
>
> 对象的属性方法，在每个实例上都重新创建了一遍。因为函数也是对象，每定义一个函数，就实例化了一个对象。这会导致相同的方式创建函数，却是不同的作用域链和标识符解析，不同实例的同名函数是不对等的。解决方法，将函数定义在构造函数外部，在构造函数内部将属性指向对应的全局函数。同时，**函数也缺少了封装性**。

### 原型模式

```js
function Person(name) {}
Person.prototype = {
  constructor: Person,
  name: "ts",
  func: function () {},
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

> **存在的问题**
>
> - 共享属性是引用类型值时，一个实例修改，会导致该共享属性被修改。
> - 不能初始化参数

### 构造函数 + 原型模式

```js
function Person(name) {
  this.name = name;
}
Person.prototype = {
  constructor: Person,
  func: function () {},
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
  o.func = function () {};
  return o;
}
var person = new Person("ts");
```

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

### 原型链 + 构造函数（组合继承）

```js
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
```

融合两者优点，是最常用的继承模式。

问题：

- 调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
- 子类型最终会包含超类型对象的全部实例属性，但不得不在调用子类型构造函数时重写这些属性。

### 原型式继承

先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲，object()对传入其中的对象执行了一次浅复制。

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
  clone.func = function () {
    // do something
  };
  return clone;
}
```

问题：

- 与借用构造函数一样，每次创建对象都会创建一遍方法

### 寄生组合式继承

组合继承的缺点在于，调用了两次父类型的构造函数，寄生组合继承的思路在于：“不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。”

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype); // 创建对象
  prototype.constructor = child; // 增强对象
  child.prototype = prototype; // 指定对象
}

prototype(Child, Parent);
```

这种方式最理想，能保持原型链不变，且不会影响`Parent.prototype`的属性。

### 类继承

extends 是**寄生组合继承**的语法糖。不同的是，由 class 构造的函数既有`__proto__`也有`prototype`。其中`__proto__`是语法糖中设置的，对构造函数的继承，指向父类。`prototype`属性的`__proto__`属性，是方法的继承，指向父类的`prototype`属性。

## 模块化

把程序按规范封装成块，可以组合在一起使用。封装的好处在于，内部数据和实现方式是私有的，只向外部暴露接口。

### 历程

#### 全局 function

不同的功能封装成不同的全局函数，缺点是，容易造成命名冲突，污染全局命名空间。

#### namespace 模式

用对象将变量和方法封装起来，这样解决了命名冲突。缺点是，外部可以直接修改模块内部数据。

#### 立即执行函数表达式 IIFE

把变量和方法封装到函数内部，只向外暴露必要的接口。如果要引入依赖，则将依赖模块当作参数传入函数中。缺点是，需要在`<script>`里引入多个模块，则导致请求过多，而且无法了解具体依赖关系，可能会导致加载先后顺序出错。

### 解决方案

#### CommonJS

每个文件是一个模块，有自己的作用域。服务端是同步加载，浏览器端需要提前编译打包。

**特点：**

- 代码都运行在模块作用域中，不会污染全局作用域。
- 模块在第一次加载后，结果会被缓存在`require.cache`中。
- 按照代码出现顺序加载模块。

在暴露模块时，`module`代表当前模块，是个对象，`module.exports`是对外的接口。在加载该模块时，就是在加载模块的`exports`属性。

然而，在`require`时，输出的是模块`exports`属性值的**拷贝**，也就是说，被引入的模块内部改变，并不会改变这个值，反之亦然。

#### AMD

在浏览器环境中，使用同步加载会使性能变差，应采用异步模式。一般采用 AMD 规范。

RequireJS 是遵守 AMD 规范的模块管理工具。使用`define`方法定义模块，`require`方法加载模块。

#### CMD

结合 CommonJS 和 AMD 的特点，异步加载，使用时才执行加载。Sea.js 是 CMD 的实践。

#### ES6 Module

适应静态作用域，编译时能确定模块的依赖关系，以及输入输出的变量。CommonJS 和 AMD 都是运行时确定这些。

所以在 ES6 中 `import` 时，需要指出变量名或函数名，否则无法加载。使用`export default`默认输出的情况除外，默认输出可以为其指定任意名字。

ES6 模块中输出的是值的**引用**，并且在编译时输出接口。在 CommonJS 中，只有运行完才会生成被加载的对象。而 ES6 模块是静态定义，在静态解析阶段就会生成。所以，ES6 Module 是动态引用，不会缓存值，模块里的变量会绑定其所在的模块，也就是说，外部可以修改被暴露的变量和函数。
