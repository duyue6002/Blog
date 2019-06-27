# 学习 Promise

## Promise.all 的前生

Promise.all 的出现是为了处理多个异步调用，在这之前有两种方式实现同样的效果。

### 普通回调

这部分代码嵌套较多，比较晦涩难懂。

```js
function getURL(URL, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", URL, true);
  req.onload = function() {
    // 因为 callback 需要同时处理正常与异常情况，所以应当是个 error-first 函数
    if (req.status === 200) {
      callback(null, req.responseText); // error 传值为 null
    } else {
      callback(new Error(req.status), req.response);
    }
  };
  req.onerror = function() {
    callback(new Error(req.statusText));
  };
}

// getURL 里需要的 callback
function jsonParse(callback, error, value) {
  if (error) {
    callback(error, value);
  } else {
    // 使用 try-catch 捕获 parse 时的错误
    try {
      let result = JSON.parse(value);
      callback(null, result);
    } catch (e) {
      callback(e, value);
    }
  }
}

let request = {
  common: function getCommon(callback) {
    return getURL(
      "http://azu.github.io/promises-book/json/comment.json",
      jsonParse.bind(null, callback)
    );
  },
  people: function getPeople(callback) {
    return getURL(
      "http://azu.github.io/promises-book/json/people.json",
      jsonParse.bind(null, callback)
    );
  }
};

// 显然 jsonParse 还需要往下传递，则它内部也需要一个回调
// 此函数就是 main 函数入口，有个 callback 连接 main 函数和这个函数
function allRequests(requests, callback, results) {
  if (requests.length === 0) {
    callback(null, results);
  }
  let req = requests.shift();
  req(function(error, value) {
    if (error) {
      callback(error, value);
    } else {
      results.push(value);
      allRequests(requests, callback, results);
    }
  });
}

function main(callback) {
  allRequests([request.common, request.people], callback, []);
}

main(function(error, results) {
  if (error) {
    return console.log(error);
  }
  console.log(results);
});
```

> 吐了，回调好恶心，motherfucker

### 使用 Promise#then

```js
function getURL(URL) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

let request = {
  comment: function getComment() {
    return getURL("http://azu.github.io/promises-book/json/comment.json").then(
      JSON.parse
    );
  },
  people: function getPeople() {
    return getURL("http://azu.github.io/promises-book/json/people.json").then(
      JSON.parse
    );
  }
};

function main() {
  function restoreResult(results, value) {
    results.push(value);
    return results;
  }
  let pushValue = restoreResult.bind(null, []);
  return request
    .comment()
    .then(pushValue)
    .then(request.people)
    .then(pushValue);
}

main()
  .then(function(value) {
    console.log(value);
  })
  .catch(function(error) {
    console.error(error);
  });
```

因为统一在最后做了 catch 捕错，所以`JSON.parse`可以直接使用，不用自己再写一套 try-catch。注意 main 函数仍然返回 promise 对象。

## Promise.all

上述功能使用 Promise.all 实现就很简洁。只需要对 main 函数做改写：

```js
function main() {
  return Promise.all([request.comment(), request.people()]);
}
```

## Promise.race 的隐藏点

以前一直以为 Promise.race 处理的一组 promise 对象中有一个变为 Fulfilled 状态，其他 promise 对象就会停止。**这其实是错的！**

在 Promises 规范中，并没有取消（中断）promise 对象执行的概念，所有的 promise 对象最终都会进入 resolve 或 reject。

所以在 Promise.race 中，即使第一个 promise 对象状态已经改变，无论是 Fulfilled 还是 Rejected，剩下的 promise 对象依然会执行，只是不会返回它们的返回值，Promise.race 其实就是只返回最快改变状态的 promise 对象结果。

## 高级用法

### 在 then 中使用 reject

注意，使用 reject 而非 throw。

在 then 中注册回调函数时，返回一个 promise 对象，在这个 promise 对象中使用 reject 即可。这样这个 then 中的异常就会被下一个 then/catch 捕获。也可以使用 Promise.reject 简化代码。

```js
let promise = Promise.resolve();
promise
  .then(() => {
    return Promise.reject(new Error("this promise is rejected"));
  })
  .catch(err => console.error(err));
```

### Promise.race 处理超时

经常有种情况，在超时情况下，抛出异常，不进行请求操作。

```js
function delayPromise(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function timeoutPromise(promise, ms) {
  let timeout = delayPromise(ms).then(() => {
    return Promise.reject(new Error(`Time out for ${ms} ms`));
  });
  return Promise.race([promise, timeout]);
}

let taskPromise = new Promise(resolve => {
  let delay = Math.random() * 2000;
  setTimeout(() => {
    resolve(delay + " ms");
  }, delay);
});

timeoutPromise(taskPromise, 1000)
  .then(value => {
    console.log("good: " + value);
  })
  .catch(err => {
    console.log("time out", err);
  });
```
