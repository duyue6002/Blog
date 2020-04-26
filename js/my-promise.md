# 实现 Promise

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function promise(executor) {
  const self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn());
    }
  }
  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach((fn) => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  const self = this;
  const promise2 = new promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
};
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject(new TypeError("Chain Cycle"));
  }
  if (x && (typeof x === "object" || typeof x === "function")) {
    let used = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
promise.prototype.finally = function (callback) {
  return this.then(
    (v) => {
      return promise.resolve(callback()).then((v) => v);
    },
    (r) => {
      return promise.resolve(callback()).then((r) => {
        throw r;
      });
    }
  );
};
promise.resolve = function (value) {
  if (value instanceof promise) return value;
  return new promise((resolve, reject) => {
    if (value && value.then && typeof value.then === "function") {
      setTimeout(() => {
        value.then(resolve, reject);
      });
    } else {
      resolve(value);
    }
  });
};
promise.reject = function (reason) {
  return new promise((resolve, reject) => {
    reject(reason);
  });
};
promise.all = function (promises) {
  return new promise((resolve, reject) => {
    let result = [];
    let count = 0;
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(index, data) {
        result[index] = data;
        if (++count === result.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        promise.resolve(promises[i]).then(
          (v) => {
            processValue(i, v);
          },
          (r) => {
            reject(r);
            return;
          }
        );
      }
    }
  });
};
promise.race = function (promises) {
  return new promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    } else {
      for (let i = 0; i < promises.length; i++) {
        promise.resolve(promises[i]).then(
          (v) => {
            resolve(v);
            return;
          },
          (r) => {
            reject(v);
            return;
          }
        );
      }
    }
  });
};
```
