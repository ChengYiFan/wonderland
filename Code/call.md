## 
```js
  // 手写一个call
  Function.prototype.myCall = function(thisArg, ...args) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }
    const thisArg = thisArg || window;
    const fn = Symbol('fn');
    // 改变函数this指向，this指向调用的call的对象。
    thisArg[fn] = this;
    // 设置参数
    // 执行并返回执行后的值
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
  }
```

```js
// 手写一个apply

```