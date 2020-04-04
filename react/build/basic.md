# 项目概述

此项目借助 babel 实现一个简单的 React，参考了这个[系列](https://github.com/hujiulong/blog/issues/4)，使用 parcel 打包，React 版本是 v15，跟目前的 v16 有一定区别，只是为了学习 React 原理而练习的。

1. [JSX 与虚拟 DOM](jsx-reactdom.md)：实现`React.createElement`和`ReactDOM.render`
2. [组件和生命周期方法](component.md)：实现`Component`类, 和`renderComponent`
3. [diff 算法](diff.md)：tree diff, component diff, children diff
4. [setState 异步处理](setState.md)：队列机制

<iframe
     src="https://codesandbox.io/embed/blue-monad-jt13f?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="my-simple-react"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
