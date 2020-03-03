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

## 二进制与十进制互相转换

```js
a = 7;
s = a.toString(2); // s = '111'
b = parseInt(s, 2); // b = 7
```

## 打印 32 位二进制整数

```js
function num2bin(num) {
  return (num >>> 0).toString(2); // >>> 0 右移强制转换为无符号整数
}
```
