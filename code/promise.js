// 异步的三个状态，pending，fulfill以及rejected
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

// 空函数
function noop() {}

/**
 * @param {[type]} resolver [function]
 */
function myPromise(resolver) {
  this._state = PENDING;
  this._result = undefined;
  if (resolver !== noop) {
    this instanceof myPromise ? initializePromise(this, resolver) : needsNew();
  }
}
myPromise.prototype = {
  constructor: myPromise,
  then: then
};
/**
 * [initializePromise 初始化Promise并执行resolver回调]
 * @param  {[type]} promise  [Promise对象]
 * @param  {[type]} resolver [resolver回调]
 */
function initializePromise(promise, resolver) {
  try {
    resolver(
      function resolvePromise(value) {
        _resolve(promise, value);
      },
      function rejectPromise(reason) {
        _reject(promise, reason);
      }
    );
  } catch (error) {
    _reject(promise, error);
  }
}
/**
 * [_resolve resolve处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _resolve(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._result = value;
  promise._state = FULFILLED;
}
/**
 * [_resolve reject处理]
 * @param  {[type]} promise [Promise对象]
 * @param  {[type]} value   [回调参数]
 */
function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._result = reason;
  promise._state = REJECTED;
}
/**
 * [then 异步回调]
 * @param  {[function]} resolve [resolve回调]
 * @param  {[function]} reject  [reject回调]
 */
function resolve(object) {
  let Constructor = this;
  if (
    object &&
    typeof object === "object" &&
    object.constructor === Constructor
  ) {
    return object;
  }
  let promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

function reject(reason) {
  let Constructor = this;
  let promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function then(resolve, reject) {
  let parent = this;
  let child = new this.constructor(noop);
  let _state = parent._state;
  if (child._state !== PENDING) {
    // noop
  } else if (_state === FULFILLED) {
    _resolve(child, parent._result);
  } else if (_state === REJECTED) {
    _reject(child, parent._result);
  }
  return child;
}

function all(entries) {
  let Constructor = this;
  let promise = new Constructor(noop);
  if (Array.isArray(entries)) {
    let length = entries.length;
    let _result = new Array(length);
    if (length === 0) {
      _resolve(promise, _result);
    } else {
      for (let i = 0; i < length; i++) {
        let currentPromise = entries[i];
        if (
          !(currentPromise instanceof myPromise) ||
          currentPromise._state === PENDING
        ) {
          currentPromise = resolve(currentPromise);
          promise._result[i] = currentPromise._result;
        }
        if (currentPromise._state === REJECTED) {
          promise._result[i] = currentPromise._result;
        }
        promise._state = currentPromise._state;
      }
    }
  } else {
    _reject(promise, new Error("entries must be an Array"));
  }
  return promise;
}

function race(entries) {
  let Constructor = this;
  if (Array.isArray(entries)) {
    return new Constructor(function(resolve, reject) {
      for (let i = 0; i < entries.length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  } else {
    return new Constructor(function(_, reject) {
      return reject(new TypeError("pass an Array"));
    });
  }
}
/**
 * [nextTick 下一进程处理]
 * @param  {Function} callback [回调函数]
 * @param  {[type]}   value    [回调参数值]
 */
function nextTick(callback, value) {}
