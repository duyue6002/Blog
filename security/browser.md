# 浏览器安全：同源策略

源：host（域名/IP）、子域名、端口、协议

**不同源限制的是：来自不同源的 document 或脚本，无法获取或设置当前 document 的某些属性。**比如：Cookie、LocalStorage、IndexDB，DOM。

某些 HTML 标签是不受同源策略限制的：`<script>, <img>, <iframe>, <link>`，HTML5 还增加了：`<video>, <audio>`，这些标签可以跨域加载资源，这些带有`src`属性的标签，每次加载时都是由浏览器发起了一次`GET`请求，但是限制了 JavaScript 的权限，无法读、写返回的内容。

XMLHttpRequest 同样受到同源策略的约束，无法跨域访问资源。
