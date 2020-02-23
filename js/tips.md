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

## 创建 1-n 的数组

```js
arr = [...Array(n).keys()].map(x => x + 1);
```

## 拍平数组

```js
arr = arr.reduce((a, b) => a.concat(b), []);
arr = [].concat.apply([], arr);
```
