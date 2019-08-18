# JS 函数及其他

> 本文试图串烧，闭包、作用域、this（call/apply/bind、箭头函数）、变量提升这些概念

## 作用域

作用域是指程序源代码中定义变量的区域，规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JS 采用词法作用域，函数的作用域基于函数创建的位置。

### 变量声明提升

ES5 没有块作用域，`var`和`function`会被提升到当前作用域的顶部，跳出`if`或`for`。

JS 代码运行前会进行 AST 解析。变量的生命周期分为：声明阶段、初始化阶段、赋值阶段。

`var`声明的变量，会立即完成声明和初始化，此时值为`undefined`。

`let`声明的变量，会完成声明阶段，当读到`let variable`时才进入初始化，所以会存在临时死区。

#### 块作用域

ES5 中用立即执行函数，可以创建块作用域。这是私有作用域，变量提升也仅会在该作用域内提升。减少闭包占用内存的问题，执行完毕就销毁该作用域链。

ES6 中引入了块作用域，存在于

- 函数内部
- 块中

## 执行上下文

### 变量对象

JS 采用词法（静态）作用域，对于可执行的代码，存在**执行上下文**，JS 引擎创建了执行上下文栈管理执行上下文。

最开始会压入全局执行上下文到栈中，之后执行一个函数，就会创建一个执行上下文，并压入栈，执行完毕，再从栈中弹出。

在执行上下文中，存在**变量对象**，用于**存储上下文中定义的变量和函数声明**。不同执行上下文的变量对象不同。

在客户端的 JS 中，顶层代码中使用关键字 this 引用全局对象，其实就是 Window 对象。函数上下文中，变量对象进入函数上下文时被创建，通过 arguments 属性初始化，其属性值就是 Arguments 对象。

变量对象包括：

1. 函数的所有形参
2. 函数声明
3. 变量声明

### 作用域链

**栈中多个执行上下文的变量对象构成的链表就是作用域链。**

当代码进入一个环境中执行时，会创建变量对象的一个作用域链，保证对执行环境有权访问的所有变量和函数的有序访问，作用域链的前端，始终是当前执行的代码所在环境的变量对象，底端是全局对象。

### this

#### 指向

1. 对象方法调用，指向该对象
2. 普通函数调用，非严格模式下指向全局对象，严格模式下为 undefined。原因可看下方拓展阅读。
3. 构造器调用，指向构造器创建的对象
4. call, apply 调用，指向被指定的对象。
5. 箭头函数

#### 拓展阅读：规范中的 this

从 ECMAScript 规范来看，实在觉得真是就是规范，莫得那么多道理：[从 ECMAScript 规范解读 this](https://github.com/mqyqingfeng/Blog/issues/7)

Reference 是规范中的抽象类型，组成部分为：

- base value, 属性所在的对象或 EnvironmentRecord, 它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种
- referenced name, 属性名称
- strict reference, boolean

Reference 由两个方法：

- GetBase(V), 返回 base value
- IsPropertyReference, 如果 base value 是一个对象，就返回 true
- GetValue, 返回**对象属性具体的值**，不再是个 Reference

this 指向判断步骤

1. 计算 MemberExpression（函数()的左边表达式） 的结果赋值给 ref
2. 判断 ref 是不是一个 Reference 类型
   1. 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
   2. 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么 this 的值为 ImplicitThisValue(ref), 该函数始终返回 undefined
   3. 如果 ref 不是 Reference，那么 this 的值为 undefined

```js
var value = 1;

var foo = {
  value: 2,
  bar: function() {
    return this.value;
  }
};

// foo.bar 是 Reference, base 是 foo 对象，this 指向 foo
console.log(foo.bar()); // 2
// 赋值操作符使用 GetValue, this 指向 undefined
console.log((foo.bar = foo.bar)()); // 1
// 逻辑与操作使用 GetValue, this 指向 undefined
console.log((false || foo.bar)()); // 1
// 逗号操作使用 GetValue，this 指向 undefined
console.log((foo.bar, foo.bar)()); // 1
```

```js
function foo() {
  console.log(this);
}

foo();

var fooReference = {
  base: EnvironmentRecord, // foo 的 this 指向 undefined
  name: "foo",
  strict: false
};
```

> 非严格模式下， this 的值如果为 undefined，默认指向全局对象

## 闭包

> 闭包 = 函数 + 函数能访问到的自由变量

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
2. 在代码中引用了自由变量

对应的作用也就变成了：

- 封装变量，模块化
- 延时器，计数器
- 监听器

## 函数参数

> 所有函数的参数都**按值传递**的。访问变量分按值和按引用两种方式。

传递基本类型时，被传递的值被复制给一个局部变量，也就是命名参数。

传递引用类型时，会把这个值内存中的地址复制给局部变量，局部变量的变化会反映在外部。但是，如果在函数中，重写局部变量，改变其引用，那么在函数执行完毕后，该局部变量就会被销毁，不会影响外部引用。

### 默认参数值

ES5 在函数内部赋予默认值，ES6 可以设置初始值。

在有默认参数值时，arguments 对象会有如下情况：

- ES5 非严格模式，命名参数变化，arguments 对象也会变化
- ES5 严格模式下，arguments 对象不会随之变化
- ES6 无论什么模式下，arguments 对象都不会变化

存在临时死区的问题，默认参数值，相当于在函数内部一开始就使用`let`声明。未传值，或传 undefined 值都会走默认参数值。

#### 拓展阅读：Arguments 对象

##### 类数组

```js
var arrayLike = {
  0: "name",
  1: "age",
  2: "sex",
  length: 3
};
```

调用数组方法：`Array.prototype.func.call(arrayLike)`

类数组转数组：

```js
var arrayLike = { 0: "name", 1: "age", 2: "sex", length: 3 };
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"]
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"]
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"]
// 4. apply
Array.prototype.concat.apply([], arrayLike);
```

##### arguments

`callee`属性用于调用函数自身。

应用：

- 参数不定长
- 柯里化
- 递归调用
- 函数重载

### 无命名参数

ES5 之前，需要自己对 arguments 对象处理。

ES6 使用`...`展开运算符定义参数放末尾，代表所有不定参数。

## 箭头函数

- 没有 this, super, arguments, new.target 绑定，由外围非箭头函数决定。
- 不使用 new 调用
- 没有原型，没有 prototype 属性
- 不可以改变 this 绑定，内部 this 不可被改变
- 不支持 arguments 对象，必须通过命名参数和不定参数访问函数的参数
- 不支持重复的命名参数

箭头函数中没有 this 绑定，通过查找作用域链来确定其值，也就是最近一层非箭头函数的 this。

箭头函数没有 arguments 绑定，可以访问外围函数的 arguments 对象。即使它不处于创建函数的作用域中，根据作用域链仍可以访问 arguments 对象。

## call & apply

### 共性与区别

1. 当第一个参数为 null 时，函数的 this 会指向默认的宿主对象。非严格模式下，指向 window，严格模式下，仍为 null。
2. 都是立即执行函数。

apply 接受的第二个参数是带下标的**集合**，可以是数组或类数组，这些元素会被作为参数传递给调用的函数。

call 接受若干的指定参数，明确知道函数接受多少参数。

### 作用

1. 改变 this 指向
2. 构造 bind
3. 借用其他对象方法

### 手撕

#### call

```js
var foo = {
  value: 1
};

function bar(name, age) {
  return {
    name,
    age,
    value: this.value
  };
  // console.log(name);
  // console.log(age);
  // console.log(this.value);
}

Function.prototype.myCall = function(context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    // args.push('arguments[' + i + ']');
    args.push(arguments[i]);
  }
  // eval("context.fn(" + args + ")");
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

bar.myCall(foo, "hxm", 12);
```

#### apply

```js
/**
 * 手撕 apply
 */
var foo = {
  value: 1
};

function bar(name, age) {
  return {
    name,
    age,
    value: this.value
  };
}

Function.prototype.myApply = function(context, arr) {
  var context = context || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = arr;
    result = context.fn(...args);
    // var args = [];
    // for (var i = 1; i < arr.length; i++) {
    //   args.push('arr[' + i + ']');
    // }
    // result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
};

bar.myApply(foo, ["ab", 23]);
```

## bind

bind() 返回一个函数，在新创建的函数被调用时，第一个参数是其运行时的 this，后续参数是传入的实参。

### 手撕

```js
var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "kevin";

Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error();
  }
  var self = this;
  // let args = [...arguments].slice(1);
  var args = Array.prototype.slice(arguments, 1);
  var fBound = function() {
    // args = args.concat([...arguments]);
    // return self.apply(context, args);
    var bindArgs = Array.prototype.slice(arguments);
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };
  var fNOP = function() {};
  fNOP.prototype = this.prototype;
  // 中转一下，避免直接修改 fBound.prototype 会影响到绑定函数的 prototype
  fBound.prototype = new fNOP();
  return fBound;
};

var bindFoo = bar.myBind(foo, "daisy");

var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```
