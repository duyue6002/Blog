# 理解 instanceof

## 常规用法

判断一个实例是否属于某种类型，在继承关系中仍然适用。

```js
function Bar() {}
function Foo() {}
Foo.prototype = new Bar();
let foo = new Foo();
console.log(foo instanceof Foo); // true
console.log(foo instanceof Bar); // true
```

## 实现 instanceof

**显示原型：**不是所有的对象都有该属性，只有函数才有`prototype`属性。创建函数时，JS 给函数添加`prototype`属性，值是一个有`constructor`属性的对象，`constructor`的值会指回函数本身。当使用 new 关键字调用时，会建立该函数的实例，继承其 prototype 的所有属性和属性方法。

**隐式原型：**每个对象都有原型对象，在规范里用`[[Prototype]]`表示，在浏览器（IE 低版本除外）中可以用`__proto__`访问，该属性值就是它对应的原型对象，通过设置`__proto__`实现继承，从而产生了原型链。

instanceof 也就是利用 `obj.__proto__.__proto__... = Constructor.prototype`验证 obj 是不是 Constructor 的示例。

```js
function my_instanceof(L, R) {
  let O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) {
      return false;
    }
    if (L === O) {
      return true;
    }
    L = L.__proto__;
  }
}
```

## 复杂用法

```js
console.log(Object instanceof Object); // true
console.log(Function instanceof Function); // true

console.log(Number instanceof Number); // false
console.log(String instanceof String); // false
console.log(Foo instanceof Foo); // false
```

### 产生原因

这与 JS 的原型继承机制有关，如图：

![JS原型继承机制](http://ww3.sinaimg.cn/large/006tNc79ly1g46hybh87kj30gz0l4my4.jpg)

值得注意的是，Foo(), Object(), Function() 的`__proto__`都是指向`Function.prototype`，因为它们由 function 声明，属于 Function 的实例对象，不是`Foo`或`Object`的实例对象。另外，`Object.prototype.__proto__ = null`, `Function.prototype.__proto__ = Object.prototype`, `Foo.prototype.__proto__ = Object.prototype`。

### 解析 instanceof 过程

以上面的实现代码为基础，进入代码内部分析过程。

`Object instanceof Object`

```js
L = Object, R = Object;
O = R.prototype = Object.prototype;
L = Object.__proto__ = Function.prototype;
// 第一次循环
L !== null && L !== O;
L = L.__proto__ = Function.prototype.__proto__ = Object.prototype;
// 第二次循环
L !== null;
L === O;
// 循环结束
return true;
```

`Function instanceof Function`

```js
L = Function, R = Function;
O = R.prototype = Function.prototype;
L = L.__proto__ = Function.prototype;
// 第一次循环
L !== null;
L === O;
// 循环结束
return true;
```

`Foo instanceof Foo`

```js
L = Foo, R = Foo;
O = R.prototype = Foo.prototype;
L = L.__proto__ = Function.prototype;
// 第一次循环
L !== null && L !== O;
L = L.__proto__ = Function.prototype.__proto__ = Object.prototype;
// 第二次循环
L !== null && L !== O;
L = L.__proto__ = Object.prototype.__proto__ = null;
// 第三次循环
L === null;
// 循环结束
return false;
```

> 参考文章
>
> - [从 \_\_proto\_\_ 和 prototype 来深入理解 JS 对象和原型链](https://github.com/creeperyang/blog/issues/9)
> - [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)
