# 正则表达式

## 创建正则表达式

### 正则表达式字面量

```js
reg = /\d+/g; // 同样是 RegExp 的实例
```

优点：没有二次转义

缺点：子内容无法重复使用，过长正则可读性差

### RegExp 构造函数

```js
const alphabet = "[a-z]";
const reg = new RegExp(`${alphabet}\\d+${alphabet}`, "g");
```

优点：子内容可以重复使用

缺点：需要手动二次转义

## API

1. RegExp.prototype.test(string), return true or false
2. RegExp.prototype.source, return 字面量内容
3. RegExp.prototype.flags, return (string)flags
4. RegExp.prototype.exec(string), return 匹配结果 or null
5. RegExp.prototype.lastIndex, return 最后一次匹配成功的结束位置，也就是下一次匹配的开始位置
6. String.prototype.match(reg), return 匹配结果(匹配一个值则和 reg.exec 结果相同，匹配多个值会返回匹配结果的数组)，or null。最好使用 reg.exec，结果格式固定.
7. String.prototype.replace(reg, replaceString), return 替换后的结果。不像 reg.exec 需要循环才能匹配完，这个 API 会把所有匹配的值都替换掉。
8. String.prototype.search(reg), return 首个匹配值的 index
9. String.prototype.split(reg), return 数组

```js
const reg = /a/g;
reg.test("aba"); // true
reg.source; // "a"
reg.flags; // "g"
reg.exec("aba"); // ["a", index: 0, input: "aba", groups: undefined]
reg.lastIndex; // 1

"aba".match(reg); // ["a", "a"]
"aba".replace(reg, "c"); // "cbc"
"aba".search(reg); // 0
"aba".split(reg); // ["", "b", ""]
```

## 匹配数值
