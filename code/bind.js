var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error();
  }
  var self = this;
  // let args = [...arguments].slice(1);
  var args = Array.prototype.slice(arguments, 1);
  var fBound = function() {
    // args = args.concat([...arguments]);
    // return self.apply(context, args);
    var bindArgs = Array.prototype.slice(arguments);
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  };
  var fNOP = function() {};
  fNOP.prototype = this.prototype;
  // 中转一下，避免直接修改 fBound.prototype 会影响到绑定函数的 prototype
  fBound.prototype = new fNOP();
  return fBound;
};

var bindFoo = bar.myBind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
