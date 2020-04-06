# V8 如何实现对象继承

## 原型继承

继承是一个对象可以访问另外一个对象中的属性和方法，JS 不是基于类的设计，是基于原型继承的设计。

![img](assets/44a91019e752ae2e7d6b709562d2554a.jpg)

V8 中每个 JS 对象有个隐藏属性`__proto__`，指向内存中这个对象的原型对象，沿着原型对象一级一级得找属性，就是查找路径就是**原型链**。JS 就是通过原型和原型链来实现继承的。

## 构造函数创建对象

在开发中，不应直接对隐藏属性`__proto__`做修改操作，而是通过构造函数设置其原型对象。

```js
function DogFactory(type, color) {
  this.type = type;
  this.color = color;
}
var dog = new DogFactory("Dog", "Black");
```

在用`new`关键字调用构造函数时，V8 做了下面的事：

```js
var dog = {};
dog.__proto__ = DogFactory.prototype;
DogFactory.apply(dog, arguments);
```

## 构造函数如何继承

函数是特殊的对象，在 V8 中除了有`code`和`name`两个隐藏属性外，还有一个隐藏属性`prototype`。

`new`关键字创建的对象，其`__proto__`指向构造函数的`prototype`属性，那么，构造函数`prototype`属性里的函数方法，新创建的对象都拥有了，这就实现了继承。

![Js 原型链_js原型_Jacoh的专栏-CSDN博客](assets/20190402143627293.png)

> [JS 中的对象](/js/OOP.md)写了创建对象和对象继承的多种方法，及发展过程。

## [补充] V8 如何访问对象属性

对象的属性分为：常规属性（properties）和排序属性（elements）。常规属性是字符串属性，会根据创建顺序排序。排序属性是数字属性，会按照数字大小排序。在`for..in`打印对象属性时，会先打印排序属性，再打印常规属性。这两种属性在 V8 中都是线性结构存储，属于快属性策略存储。

对象属性过多时，V8 会采用慢属性策略存储，常用非线性结构（字典）来存储属性。

> 尽量少用`delete`来删除属性，这样会造成属性`elements`的重排，或者查找`properties`，或者在字典中查找，耗时长，直接把属性值设置成`undefined`是比较好的做法。
