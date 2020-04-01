# JSX 和 ReactDOM

## JSX 转为 Virtual DOM

JSX 是 React 的语法糖，结合了 JavaScript 和 XML，在 babel 中，一段 JSX 被转为如下代码：

```js
// JSX
const container = <div className="container">hello, world</div>;
// Babel 转换
var container = /*#__PURE__*/ React.createElement(
  "div",
  {
    className: "container"
  },
  "hello, world"
);
```

所以一段 JSX 会被转换为对象，也就是虚拟 DOM，下面来实现简单的`React.createElement`方法，传入的参数有`tag`, `attributes`, `children`， Babel 将 JSX 转换为这些参数，`React.createElement`是需要将这些参数返回出来即可。

```js
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  };
}
const React = {
  createElement
};
```

## render

`ReactDOM.render`在 Babel 中会做以下转换：

```js
// JSX
ReactDOM.render(
  <div className="container">hello, world</div>,
  document.getElementById("root")
);
// Babel
ReactDOM.render(
  /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "container"
    },
    "hello, world"
  ),
  document.getElementById("root")
);
```

`render`有两个参数，第一个参数是个 JSX，在 Babel 中会被转为虚拟 DOM 对象，第二个参数是要插入的 HTMLElement 对象。

```js
/**
 *
 * @param {String|Object} vnode
 * @param {HTMLElement} container
 */
function render(vnode, container) {
  // 当vnode不再是虚拟DOM对象，而是String类型时，说明已经递归到了最里层，构造TextNode当作前节点的内容
  if (typeof vnode === "string") {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // Notes: 为什么不用for..in而用Object.keys()？
    // 因为前者会有继承链上的属性，后者只有对象本身的属性
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      // 自定义函数，需要特殊处理，像className->class，事件，style
      setAttribute(dom, key, value);
    });
  }
  // 对虚拟DOM对象的children递归render
  vnode.children.forEach(child => render(child, dom));
  return container.appendChild(dom);
}
```

由于 JSX 语法里，DOM 元素属性与规范不同，`class`改为`className`，组件元素的属性是完全自定义的属性，自事件属性名在 React 里有大写，转为 HTML DOM 时也需要转换。。下面是定制的简化`setAttribute`方法。

```js
/**
 *
 * @param {HTMLElement} dom
 * @param {String} key
 * @param {String|Object} value
 */
function setAttribute(dom, key, value) {
  if (key === "className") {
    key = "class";
  }
  // 事件属性处理
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    // 可以接受字符串和对象
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    }
    // 避免是 value 是 null
    else if (value && typeof value === "object") {
      Object.keys(value).forEach(styleAttr => {
        // style={{width: 20}}
        dom.style[styleAttr] =
          typeof value[styleAttr] === "number"
            ? value[styleAttr] + "px"
            : value[styleAttr];
      });
    }
  } else {
    // Notes: 为什么dom[key] = value赋值后还需要 DOM.setAttribute()？
    // HTMLElement元素有attributes和properties两个不同的属性
    // attributes是标签上定义的属性，properties是DOM对象的属性
    // dom[key]指向的是properties，而不是attributes，dom[key] = value的作用：
    // 例如inputEle[checked]只有true和false
    // 如果value是"false"，inputEle.getAttribute("checked") = "false"
    // 但inputEle.checked = true，因为赋值时value是有值的，DOM会将value转为Boolean
    if (key !== "class" && key in dom) {
      dom[key] = value || "";
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}
```

最后，在每次 render 前要把旧元素内容清空。

```js
const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = "";
    return render(vnode, container);
  }
};
```

调用如下：

```js
import React from "./react";
import ReactDOM from "./reactdom";

// Notes: 为什么看上去没用到React还需要调用呢？
// JSX 语法糖会把“DOM标签”转化成虚拟DOM对象，需要React.createElement返回虚拟DOM对象

function tick() {
  const element = (
    <div>
      <input type="checkbox" checked={false}></input>
      <h1>Hello World</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);
```
