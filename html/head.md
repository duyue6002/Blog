# head 里装了些什么

先扯个题外话，一个 html 文件的头部一般会有`<!DOCTYPE html>`，这段代码告诉浏览器本文件是 html 文件，请采用合适的协议解析，并采用适合的浏览器模式。

这是 HTML5 的写法，以前会需要声明 Strict DTD（document type definition），其实都是希望浏览器使用标准模式解析文件，标准模式对应的是混杂模式，这种模式更宽松，会向后兼容浏览器，例如兼容低版本的 IE，可能会导致盒模型错误。

## `<meta>`

该标签不会显示在页面中，但定义了服务于浏览器布局与重载的元数据（metadata），例如页面的 description, keywords, author, last modified.

### 常规元数据

```html
<meta name="" content="" />
```

name 有以下取值：

- keywords
- description
- viewport 视口 一般需要兼容移动端的时候定义
- robots 定义爬虫索引方式
- author
- generator 网页制作软件
- copyright
- revisit-after 搜索引擎爬虫重访时间
- rerender 双核浏览器渲染方式 content 有 webkit, ie-comp（IE 兼容）, ie-stand

### http-equiv

这时的`<meta>`相当于 html 头文件，定义 http 参数。equiv 的全称是 equivalent。

http-equiv 有以下取值：

- content-Type 设定字符集，现在已被`<meta charset="utf-8" />`代替
- X-UA-Compatible 采取何种版本渲染当前页面，可以指定`content="IE=Edge"`
- cache-control 指定请求/响应的缓存机制，content 可以取 no-cache, no-store 等
- expires 网页到期时间
- refresh 自动刷新后可以指定重定向 url
- Set-Cookies 设置 cookie，网页过期 cookie 也会过期

## `<link>`

该标签用于放引用的外部资源文件，包括 css/img/js/icon。参数是 rel，即引入文件与本文件的关系，css 是 stylesheet，在引入 css 时还能设置 media 媒体查询，后续详细说这一块。
