# Fetch

fetch 是 JS 语言内部封装的用 Promise 实现 XML 请求的 API，下面是 fetch 的 polyfill。

```js
// 使用方式
myFetch(url).then((result) => console.log(result));
// polyfill
function myFetch(url) {
  return ajax(url).then((xhr) => {
    const response = xhr.response;
    const contentType = xhr.getResponseHeader("Content-Type");
    if (/application\/json/.test(contentType)) {
      return JSON.parse(response);
    }
    return response;
  });
}
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(url);
    xhr.onreadyStateChange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.send();
  });
}
```
