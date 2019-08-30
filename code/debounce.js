/**
 * 防抖，以最后的触发为准
 */
function foo(fn, interval, immediate) {
  let timer, result;

  let debounce = function() {
    let self = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, interval);
      if (callNow) fn.apply(self, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(self, args);
      }, interval);
    }
    return result;
  };

  debounce.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounce;
}

var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  container.innerHTML = count++;
}

let setAction = foo(getUserAction, 1000, true);

container.onmousemove = setAction;
document.getElementById("button").addEventListener("click", function() {
  setAction.cancel();
});
