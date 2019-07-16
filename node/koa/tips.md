# koa 踩坑记录

## 接收 post 表单数据

按官方文档，接收 post 数据时的写法为：

```js
router.post("/", async (ctx, next) => {
  ctx.body = ctx.request.body;
});
```

在很多情况下是可行的，例如`application/x-www-form-urlencoded`, `application/**json`，但在`multipart/form-data`情况下结果为空对象。这是因为`koa-bodyparser`并不能解析该格式数据。

解决方法：

```js
const koaBody = require("koa-body")({ multipart: true });
router.post("/report", koaBody, sourceMapParser);
```
