# 比较 undefined 和 null

## 相同点

在 if 中都会转换成 false，不严格相等

## 不同点

> null 是个关键字
>
> undefined 是变量，不是关键字，在 ES5 中已经不能被修改，但仍可以在局部作用域中修改。所以常会用 `void 0` 来代替，避免被无意修改。
>
> 为什么用`void 0`呢？因为`void`运算符能给指定表达式求值返回`undefined`，最短的表达式当然是`void 0`啦。

### 转数字

- Number(undefined) === NaN
- Number(null) === 0

### 用法

undefined

- 变量声明了没有赋值，会返回 undefined
- 调用有参数的函数没有传参，则函数内部该参数值为 undefined
- 访问对象未赋值的属性返回 undefined
- 函数没有返回值会返回 undefined

null

- 作为函数参数，表示该参数不是对象
- 对象原型链的终点，Object.prototype
