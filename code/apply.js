/**
 * 手撕 apply
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
}

Function.prototype.myApply = function(context, arr) {
  var context = context || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = arr;
    result = context.fn(...args);
    // var args = [];
    // for (var i = 1; i < arr.length; i++) {
    //   args.push('arr[' + i + ']');
    // }
    // result = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return result;
};

bar.myApply(foo, ["ab", 23]);
