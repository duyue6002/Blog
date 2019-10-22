# JS 代码收藏

## 字符串排序

```js
// "some" => "emos"
s = s
  .split("")
  .sort((a, b) => a.localeCompare(b))
  .join("");
```
