/**
 * 函数节流
 */

const throttle = function(fn, interval) {
  let self = fn,
    timer,
    firstTime = true;
  return function() {
    let args = arguments,
      me = this;
    if (firstTime) {
      self.apply(me, args);
      return firstTime = false;
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      self.apply(me, args);
    }, interval || 500);
  };
};

window.onresize = throttle(function() {
  console.log(1);
}, 500);
