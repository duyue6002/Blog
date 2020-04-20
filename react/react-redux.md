# Simple Redux & React-Redux

## Redux API

1. createStore(reducer)：返回 Store，实现 getState, dispatch, subscribe API
2. combineReducers：返回一个函数，调用该函数时，依次执行 reducer

### 代码

```js
/**
 * @param reducer
 * @returns Store
 * API
 * getState()
 * dispatch(action)
 * subscribe(listener)
 */
export function createStore(reducer) {
  let currentState = void 0,
    currentListeners = [],
    currentReducer = reducer;
  let nextListeners = currentListeners; // 缓存

  function shallowCopy() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  function subscribe(listener) {
    shallowCopy();
    nextListeners.push(listener);
    let isSubscribe = true;
    return function unsubscribe() {
      if (!isSubscribe) {
        return;
      }
      isSubscribe = false;
      shallowCopy();
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }

  // 初始化时需要dispatch一个默认type，从而初始化state
  dispatch({ type: "INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

/**
 *
 * @param {Array} reducers
 * @returns 函数，调用此函数依次执行reducer，实际上产生变化的只有action对应的reducer
 */
export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  return function combination(state = {}, action) {
    let hasChanged = false,
      nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
```

## React-Redux API

1. Provider：一个组件，props 包含 store（Redux Store）, children 和 context。
2. connect：高阶函数，目的是把 state 和 dispatch 绑定到 UI 组件上。

### 代码实现

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

<iframe
     src="https://codesandbox.io/embed/github/duyue6002/simple-react-redux/tree/master/?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="todos"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
