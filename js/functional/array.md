# 数组篇

## flatten

```js
function flatten(input, shallow, output) {
  output = output || [];
  let idx = output.length;
  for (let i = 0; i < input.length; i++) {
    let value = input[i];
    if (Array.isArray(value)) {
      if (shallow) {
        let j = 0,
          length = value.length;
        while (j < length) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, output);
        idx = output.length;
      }
    } else {
      output[idx++] = value;
    }
  }
  return output;
}
// reduce + concat
function flatten(input, shallow, output) {
  output = output || [];
  if (shallow) {
    output = input.reduce((acc, cur) => acc.concat(cur), output);
  } else {
    output = input.reduce(
      (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
      output
    );
  }
  return output;
}
```

## reduce & reduceRight

```js
function createReduce(direction) {
  return function (list, iteratee, memo) {
    let index = direction > 0 ? 0 : list.length - 1;
    for (index; index >= 0 && index < list.length; index += direction) {
      memo = iteratee(memo, list[index], index, list);
    }
    return memo;
  };
}
var reduce = createReduce(1);
var reduceRight = createReduce(-1);
```
