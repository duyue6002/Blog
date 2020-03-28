# 职责链模式

将需求拆分成有顺序的节点，把这些节点放在职责链上组合。常用于，拦截器、过滤器。

例如，现在要求封装 axios 方法，每次发送请求前，向后端发一条记录。

```js
function myAxios(config) {
  axios.get(`log?url=${config.url}`);
  axios.get(config.url).then(config.fn);
}
myAxios({
  url: "xxx",
  fn: function(res) {
    console.log(res);
  }
});
```

现在要求增加需求，在请求时，给页面加个 Loading，在请求收到时，关闭 Loading。

```js
function myAxios(config) {
  axios.get(`log?url=${config.url}`);
  showLoading();
  axios.get(config.url).then(res => {
    closeLoading();
    config.fn(res);
  });
}
myAxios({
  url: "xxx",
  fn: function(res) {
    console.log(res);
  }
});
```

这样耦合程度太高，使用职责链模式重构以上代码：

构建 axios -> 请求前做处理 -> 请求 -> 请求后做处理

```js
function buildAxios(config) {
  const service = axios.create(config);
  return service;
}
// 默认请求前的处理
function beforeRequest(config) {
  axios.get(`log?url=${config.url}`);
  showLoading();
  return config.callback.apply(this, arguments);
}
// 发送请求
function request(config) {
  let args = undefined;
  let state = {
    get: function() {
      let parse = qs(config.data);
      args = [config.url + parse];
    },
    post: function() {
      args = [config.url, config.data];
    }
  };
  state[config.type]();
  return axios[config.type].apply(this, args);
}
// 默认请求后的处理
function afterRequest(config) {
  config.promise.then(res => {
    closeLoading();
    config.callback.apply(this, res.data);
  });
}
// 组装成职责链
function myAxios(config) {
  this.axios = buildAxios(config);
}
myAxios.prototype.request = function(config) {
  beforeRequest.call(this, {
    url: config.url,
    callback: config.beforeCallback // 自定义请求前的处理函数
  });
  let requestPromise = request.call(this, config);
  let afterData = afterRequest.call(this, {
    promise: requestPromise,
    callback: config.afterCallback // 自定义请求后的处理函数
  });
  return afterData;
};
// 调用
let a = new myAxios({
  baseUrl: "root"
});
a.request({
  url: "something",
  data: [1, 2, 3],
  beforeCallback: function() {},
  afterCallback: function() {}
});
```
