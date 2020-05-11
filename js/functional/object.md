# 对象篇

## deep clone

```js
function cloneDeep(inObject) {
  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }
  let outObject = Array.isArray(inObject) ? [] : {};
  for (key in inObject) {
    let value = inObject[key];
    outObject[key] = cloneDeep(value);
  }
  return outObject;
}
```