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

    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.value = reason;
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
  if (this.status === STATUS.FULFILLED) {
    onFullfilled(this.value);
  }
  if (this.status === STATUS.REJECTED) {
    onRejected(this.value);
  }
};
MyPromise.prototype.catch = function (onRejected) {};
MyPromise.prototype.finally = function (onFinally) {};

export default MyPromise;


new MyPromise((res, rej) => {
  res("a");
}).then((val) => {
  console.log(val);
});

// a
