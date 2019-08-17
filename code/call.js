/**
 * 自己写个 call 函数
 */
var foo = {
  value: 1
};

function bar(name, age) {
  return {
    name,
    age,
    value: this.value
  };
  // console.log(name);
  // console.log(age);
  // console.log(this.value);
}

Function.prototype.myCall = function(context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    // args.push('arguments[' + i + ']');
    args.push(arguments[i]);
  }
  // eval("context.fn(" + args + ")");
  var result = context.fn(...args);
  delete context.fn;
  return result;
};

bar.myCall(foo, "hxm", 12);
