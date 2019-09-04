# 项目支持 sourcemap

## 使用 webpack 插件生成 map 文件

前端的工作在于将代码压缩并生成 sourcemap，使用 UglifyJS 进行压缩。用 webpack 构建项目时，使用 webpack-uglify-parallel 提升压缩速度，它采用多核并行压缩，速度很快。webpack 官方也维护了支持多核压缩的插件，uglifyjs-webpack-plugin。

压缩代码仅仅是第一步，压缩后需要将压缩代码与源码产生映射，方便调试，也就是生成 sourcemap。devtool 选项是控制是否生成以及如何生成 sourcemap，devtool 的详细说明见官网 [devtool](https://webpack.docschina.org/configuration/devtool/).

配置示例如下：

```js
const os = require("os"),
  UglifyJsParallelPlugin = require("webpack-uglify-parallel");

  plugins: [
    new UglifyJsParallelPlugin({
        workers: os.cpus().length,
        mangle: true,
        compress: {
          warnings: false,
        }
    })
  ],

  devtool: source-map // 直接在打包文件目录下生成对应的.map文件
```

## 原生脚本配置

在前端需要使用 Web API 收集 error 事件，并将错误报告传给服务器。

```js
window.onerror = function(msg, url, row, col, error, callback) {
  if (error) {
    console.log(error.stack || msg);
  }
  let reportMsg = {
    msg,
    url,
    row,
    col
  };
  callback(reportMsg);
};
```

> 参考
>
> - [webpack devtool 官网](https://webpack.docschina.org/configuration/devtool/)
> - [深入浅出的 webpack 构建工具---devTool 中 SourceMap 模式详解](https://www.cnblogs.com/tugenhua0707/p/9464984.html)
