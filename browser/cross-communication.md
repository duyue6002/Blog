# 跨页面通信实战

## 同源页面

### 广播模式

#### Broadcast Channel

```js
// 创建管道
const bc = new BroadcastChannel(id);
// 监听消息
bc.onmessage = function (e) {
  console.log(e.data); // data
};
bc.onmessageerror = function (e) {};
// 发送消息
bc.postMessage(data);
// 关闭管道
bc.close();
```

#### Local Storage

```js
// 监听 StorageEvent
window.addEventListener("storage", function (e) {
  const data = e.newValue;
});
// 发送消息
localStorage.setItem(id, data);
```

### 轮询模式

#### Shared Worker

```js
(function () {
  const worker = new SharedWorker("./worker.js");
  // 轮询
  setInterval(function () {
    worker.port.postMessage({ get: true });
  }, 1000);
  // 监听
  worker.port.onmessage = function (e) {
    const data = e.data;
  };
  // 启动
  worker.port.start();

  $btn.onclick = function () {
    // 发送消息
    worker.port.postMessage({ msg: val });
  };
})();
// worker.js
// connect
onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (e) => {
    if (e.data.get) {
      data && port.postMessage(data);
    } else {
      data = event.data;
    }
  };
  port.start();
};
```

#### IndexedDB

```js
// Storage: indexed DB
(function () {
  openStore()
    .then((db) => saveData(db, null))
    .then(function (db) {
      setInterval(function () {
        query(db).then(function (res) {
          if (!res || !res.data) {
            return;
          }
          const data = res.data;
          const text = "[receive] " + data.msg;
          $info.textContent = text;
        });
      }, 1000);
      $btn.addEventListener("click", function () {
        const val = $input.value;
        $input.value = "";
        $info.textContent = "[send] " + val;
        saveData(db, {
          msg: val,
        });
      });
    });
})();
```

### window.open & window.opener

```js
// window.open
(function () {
  let childWins = [];
  document.getElementById("link").addEventListener("click", function () {
    // 点击链接，打开新的子页面
    const win = window.open("./?new=1");
    childWins.push(win);

    const $container = document.getElementById("window-opener");
    $container.querySelector("h2").textContent = $container
      .querySelector("h2")
      .textContent.replace(" (no open)", "");
  });

  const $container = document.getElementById("window-opener");
  const $input = $container.querySelector("input");
  const $btn = $container.querySelector("button");
  const $info = $container.querySelector("p");
  window.addEventListener("message", function (e) {
    const data = e.data;
    const text = "[receive] " + data.msg;
    console.log("[Cross-document Messaging] receive message:", text);
    $info.textContent = text;

    // do not send message back
    if (window.opener && !window.opener.closed && data.fromOpener) {
      window.opener.postMessage(data);
    }

    // release reference when window closed
    childWins = childWins.filter((w) => !w.closed);
    // do not send message back
    if (childWins && !data.fromOpener) {
      childWins.forEach((w) => w.postMessage(data));
    }
  });

  if (childWins.length === 0 && !window.opener) {
    $container.querySelector("h2").textContent =
      $container.querySelector("h2").textContent + " (no open)";
  }

  $btn.addEventListener("click", function () {
    const val = $input.value;
    $input.value = "";
    $info.textContent = "[send] " + val;

    // release reference when window closed
    childWins = childWins.filter((w) => !w.closed);

    if (childWins.length > 0) {
      childWins.forEach((w) =>
        w.postMessage({
          msg: val,
          fromOpener: false,
        })
      );
    }

    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        msg: val,
        fromOpener: true,
      });
    }
  });
})();
```

### 服务器推送

#### polling

前端主动轮询请求后端

#### WebSocket

WebSocket 基于 TCP，是一个全双工的协议，适用于需要进行复杂双向数据通讯的场景。

## 非同源页面

使用 iframe 作为桥梁，非同源页面的 iframe 的 src 设置成同源，由 iframe 广播到各个父页面中。

```js
/* parent.html */
// 父页面监听 iframe 返回的信息
window.addEventListener("message", function (e) {});
// 父页面向 iframe 发送信息
window.frames[0].window.postMessage(data, *);
/* iframe.html */
// iframe 使用其他通信手段同步所有 tab 下的 iframe 页面，例如 Broadcast Channel 达到广播的效果
const bc = new BroadcastChannel(id);
// 收到来自父页面的消息后，在 iframe 间进行广播
window.addEventListener('message', function (e) {
    bc.postMessage(e.data);
});
// 对于收到的（iframe）广播消息，通知给所属的业务页面
bc.onmessage = function (e) {
    window.parent.postMessage(e.data, '*');
};
```
