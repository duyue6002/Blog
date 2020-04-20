# 实现简易版的 React-Redux

React-Redux API:

1. Provider：一个组件，props 包含 store（Redux Store）, children 和 context。
2. connect：高阶函数，目的是把 state 和 dispatch 绑定到 UI 组件上。

## 代码实现

```js
import React, { useMemo, useState, useEffect } from "react";

const ReactReduxContext = React.createContext(null);

/**
 * Provider 函数组件
 * 接受参数： props - {store，context，children }
 * 返回：ContextProvider组件，value是store和subscription
 * 作用：监控store的变化，同时更新subscription
 */
export function Provider({ store, context, children }) {
  const Context = context || ReactReduxContext;
  const contextValue = useMemo(() => ({ store }), [store]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

/**
 * connect 高阶函数
 * 接收参数：mapStateToProps, mapDispatchToProps
 * 返回：一个接收组件的高阶函数，此函数返回一个函数式组件
 * 作用：把state和dispatch绑定到wrapped组件的props上
 */
export function connect(mapStateToProps, mapDispatchToProps) {
  return function (WrappedComponent) {
    // 组件挂载后，需要监听变化
    function listen({ store, props, dispatchToUse, setState }) {
      store.subscribe(() => {
        const newStateProps = mapStateToProps
          ? mapStateToProps(store.getState(), props)
          : {};
        const newDispatchProps = mapDispatchToProps
          ? mapDispatchToProps(dispatchToUse, props)
          : {};
        // React-Redux 在这里做了 shallow-Equal 的优化
        const newMergeProps = Object.assign(
          {},
          newStateProps,
          newDispatchProps,
          props
        );
        setState(newMergeProps);
      });
    }
    return function ConnectedComponent(props) {
      const { store } = React.useContext(ReactReduxContext);
      const dispatchToUse = (action) => {
        store.dispatch(action);
      };

      const initialStateProps = mapStateToProps
        ? mapStateToProps(store.getState(), props)
        : {};
      const initialDispatchProps = mapDispatchToProps
        ? mapDispatchToProps(dispatchToUse, props)
        : {};
      const initialMergeProps = Object.assign(
        {},
        initialStateProps,
        initialDispatchProps,
        props
      );
      const [actualProps, setState] = useState(initialMergeProps);
      useEffect(() => {
        listen({ store, props, dispatchToUse, setState });
      });
      return <WrappedComponent {...actualProps} />;
    };
  };
}
```

## 效果
