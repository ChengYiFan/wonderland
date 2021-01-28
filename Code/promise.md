## promise
期约，是一个解决回调地狱的函数，是一个强大的异步回调方案。在ES6中可以直接使用。

### promise的三种状态：
1. pending 过渡态
1. fulfilled 完成态
1. rejected 失败态



### 实现一个简单的promise:
```js
function Promise(exector) {
  const self = this;
  // state表示状态
  this.state = 'pending';
  this.value = undefined;  // 成功结果
  this.reason = undefined;  // 失败原因

  this.onFulfilled = []; //成功的回调
  this.onRejected = [];  //失败的回调

  //成功执行
  function resolve(value) {
    if (self.state === 'pending') {
      self.value = value;
      self.state = 'resolve';
      self.onFulfilled.forEach(fn => fn(value));
    }
  }
  //执行失败
  function reject(reason) {
    if (self.state === 'pending') {
      self.reason = reason;
      self.state = 'reject';
      self.onRejected.forEach(fn => fn(reason));
    }
  }
  //对异常操作
  try {
    exector(resolve, reject);
  } catch (e) {
    reject(e);
  }       
}

//设置promise的then方法
Promise.prototype.then = function(onResolve, onReject) {
  let promise2 = new Promise((resolve, reject)=> {
    if (this.state === 'resolve') {
      let x = onResolve(this.value);
      resolvePromise(promise2, x, resolve, reject);
    }
    if (this.state === 'reject') {
      let x = onReject(this.reason);
      resolvePromise(promise2, x, resolve, reject);
    }
    if(this.state === 'pending'){
      this.onFulfilled.push(() => {
        let x = onResolve(this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      this.onRejected.push(() => {
        let x = onReject(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      });
    }
  });
  return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError('Chaining cycle'));
  }
  // 防止多次调用
  let called;
  // x不是 null 且 x 是对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x); 
  }
}

```

### 参考
https://zhuanlan.zhihu.com/p/144058361
https://www.cnblogs.com/sugar-tomato/p/11353546.html