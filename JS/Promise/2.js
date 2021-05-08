/**
* MyPromise的实现
* 构建MyPromise对象
* 内部状态维护
* callback的resolve方法和reject的方法
* then方法的实现链式调用和模拟微任务实现
*/
//基础变量的定义
const STATUS = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
};

class MyPromise {
  constructor(callback) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach(callback => {
          callback(value);
        });
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.value = reason;

        this.onRejectedCallbacks.forEach(callback => {
          callback(reason);
        });
      }
    };
    try {
      if (typeof callback === "function") {
        callback(resolve, reject);
      }
    } catch (error) {
      reject(error);
    }
  }
  all() {}
  allSettled() {}
  any() {}
  race() {}
  resolve(value) {}
  reject(reson) {}
}
MyPromise.prototype.then = function (onFullfilled, onRejected) {
  let onResolve = typeof onFullfilled === 'function' ? onFullfilled : function(v) {};
  let onReject = typeof onRejected === 'function' ? onRejected : function(r) {};
  if (this.status === STATUS.PENDING) {
    return new MyPromise((resolve, reject) => {
      this.onFulfilledCallbacks.push((value) => {
        try {
          let x = onResolve(value)
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      });
      this.onRejectedCallbacks.push((value) => {
        try {
          let x = onReject(value)
          if (x instanceof MyPromise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      });
    });
  }
  if (this.status === STATUS.FULFILLED) {
    // onFullfilled(this.value);
    return new MyPromise((resolve, reject) => {
      try {
        let x = onResolve(this.value)  
        if (x instanceof MyPromise) {  // 如果onResolve的返回值是一个Promise对象
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)  
      }
    });
  }
  if (this.status === STATUS.REJECTED) {
    // onRejected(this.value);
    return new MyPromise((resolve, reject) => {
      try {
        let x = onReject(this.value)
        if (x instanceof MyPromise) {  // 如果onResolve的返回值是一个Promise对象
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
};
MyPromise.prototype.catch = function (onRejected) {};
MyPromise.prototype.finally = function (onFinally) {};


new MyPromise((res, rej) => {
  setTimeout(() => {
    res("a")
  }, 1000)
}).then((val) => {
  console.log(val);
});

// a