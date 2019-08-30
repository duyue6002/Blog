function deepClone(origin, target) {
  let properties = Object.getOwnPropertyNames(origin);
  for (let key of properties) {
    if (Object.prototype.toString.call(origin[key]) === '[object Object]') {
      target[key] = deepClone(origin[key], {});
    } else if (Object.prototype.toString.call(origin[key]) === '[object Array]') {
      target[key] = deepClone(origin[key], []);
    } else {
      target[key] = origin[key];
    }
  }
  return target;
}

let obj = {
  number: 1,
  string: "t",
  obj: {
    o: "3"
  },
  arr: [1, 23, 4, 5]
};

let newObj = deepClone(obj, {});

console.log(newObj.obj === obj.obj);