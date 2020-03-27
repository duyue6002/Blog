# 发布-订阅模式（观察者模式）

1. 需要发布者
2. 发布者有缓存列表，存放回调函数，以告诉订阅者
3. 发布消息时，发布者遍历列表，依次触发回调函数

## 基本实现

```js
/**
 * 发布-订阅模式
 */
let Events = (function() {
  let subscribers = [],
    listen,
    trigger,
    remove;
  // 有订阅时，将回调函数存入缓存列表
  listen = function(key, fn) {
    if (!subscribers[key]) {
      subscribers[key] = [];
    }
    subscribers[key].push(fn);
  };
  // 发布时，遍历列表，依次触发回调函数
  trigger = function() {
    let key = [].shift.call(arguments);
    let fns = subscribers[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let fn of fns) {
      fn.apply(this, arguments);
    }
  };
  // 移除订阅者
  remove = function(key, fn) {
    let fns = subscribers[key];
    if (!fns) return false;
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        let _fn = fns[i];
        if (_fn === fn) {
          fns.splice(i, 1);
        }
      }
    }
  };
  return {
    listen,
    trigger,
    remove
  };
})();
```

## 应用

### DOM 事件

在 DOM 节点上绑定事件，其实就是观察者模式。

```js
document.body.addEventListener("click", function() {
  // do something
});
document.body.click();
```

### 低耦合应对需求变更

#### 网站登录

```js
// 耦合性太高，后期扩展要在回调函数里大量修改
login.succ(function(data) {
  header.setAvatar(data.avatar);
  nav.setAvatar(data.avatar);
  message.refresh();
  cart.refresh();
  // address.refresh(); // 想增加这个需求
});
```

```js
$.ajax("https://xxx.com/login", function(data) {
  login.trigger("loginSucc", data);
});

var header = (function() {
  login.listen("loginSucc", function(data) {
    header.setAvatar(data.avatar);
  });
  return {
    setAvatar: function(data) {
      console.log("设置 header 模块的头像");
    }
  };
})();

var nav = (function() {
  login.listen("loginSucc", function(data) {
    nav.setAvatar(data.avatar);
  });
  return {
    setAvatar: function(data) {
      console.log("设置 nav 模块的头像");
    }
  };
})();

var address = (function() {
  login.listen("loginSucc", function(obj) {
    address.refresh(obj);
  });
  return {
    refresh: function(obj) {
      console.log("刷新收货地址列表");
    }
  };
})();
```

#### 抽奖游戏

当前需求：

- 10 个方块，滚动 4 轮后，随机选出一个中奖方块

如果需要增加以下需求：

- 每轮滚动速度变慢
- 后台获取获奖者号码，在请求期间，保持滚动

如果按下面的代码来扩展，就会变得非常复杂，且再有需求变更，又要修改大量代码，扩展性差。

<iframe height="300" style="width: 100%;" scrolling="no" title="lottery-bad" src="https://codepen.io/duyue6002/embed/OJVrLgR?height=300&theme-id=light&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/duyue6002/pen/OJVrLgR'>lottery</a> by 6002
  (<a href='https://codepen.io/duyue6002'>@duyue6002</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

使用观察者模式，重构代码如下：

<iframe height="300" style="width: 100%;" scrolling="no" title="lottery-good" src="https://codepen.io/duyue6002/embed/ExjGVPY?height=300&theme-id=light&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/duyue6002/pen/ExjGVPY'>lottery-good</a> by 6002
  (<a href='https://codepen.io/duyue6002'>@duyue6002</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
