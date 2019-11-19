# JS 代码收藏

## 字符串排序

```js
// "some" => "emos"
s = s
  .split("")
  .sort((a, b) => a.localeCompare(b))
  .join("");
```

## 创建并初始化二维数组

```js
// m 行数, n 列数
// () => {} 是 mapFn 所以数组内部是独立的
arr = Array.from(Array(m), () => Array(n).fill(0));
```
