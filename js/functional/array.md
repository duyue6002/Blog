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
