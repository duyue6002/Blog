# HTTP

## 进化历程

### HTTP/0.9

只有 GET 方法，响应完立即关闭。

### HTTP/1.0

- 增加 POST、HEAD（请求头部信息，判断是否需要下载资源）方法
- 增加响应码
- 引入 Header
  - 引入缓存机制，强缓存，`Expires`，一个绝对时间值，受限于本地时间。协商缓存，响应头`Last-Modified`对应请求头`Last-Modified-Since`，表示本地修改时间，如果浏览器在本地打开了文件，修改了 modified 时间，导致缓存时间不准。
  - `keep-alive`，默认情况不开启，设置`Connection: Keep-Alive Keep-Alive:max=X,timeout=XXX`时开启，希望 TCP 不要立刻断开连接。
- 传输数据不局限于文字

### HTTP/1.1

- 增加 PUT、DELETE 方法
- 增加缓存管理和控制
  - 强缓存，`Cache-Control`，`no-store`不缓存到本地，`no-cache`缓存不提供给客户端。
  - 协商缓存，响应头`ETag`对应请求头`If-None-Match`，文件有变化就会变的哈希值。
- 允许持久连接，默认开启`keep-alive`
- 强制要求 Host 头
- 允许响应数据分块
