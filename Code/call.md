## 
```js
  // 手写一个call
  Function.prototype.myCall = function(thisArg, ...args) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }
    thisArg = thisArg || window;
    const fn = Symbol('fn');
    // 显式改变函数this指向
    // 当函数作为对象的属性调用时，内部的this指向该对象
    thisArg[fn] = this;
    // 设置参数
    // 执行并返回执行后的值
    const result = thisArg[fn](...args);
    // 删除该方法，不然会对传入的对象造成污染（添加该方法）
    delete thisArg[fn];
    return result;
  }
```

```js
// 手写一个apply, apply的思路与call思路相同，仅对参数部分做不同处理
Function.prototype.myApply = function(thisArg) {
    if (typeof this !== 'function') {
      return new TypeError('error');
    }
    thisArg = thisArg || window;
    const fn = Symbol('fn');
    // 改变函数this指向，this指向调用的call的对象。
    thisArg[fn] = this;
    // 设置参数
    // 执行并返回执行后的值
    const result = arguments[1] ? thisArg[fn](...arguments[1]) : thisArg[fn]();
    delete thisArg[fn];
    return result;
  }
```

```js
// 手写一个bind
Function.prototype.myBind = function(thisArg, ...args) {
  const self = this;
  thisArg = thisArg || window;
  const fnNop = function() {} // 定义一个空函数
  // 返回一个函数
  const fn = function() {
    const func = Symbol('func');
    // 兼容new 的情况, 如果当前函数的this指向的是构造函数中的this则判定为new
    const _this = this instanceof self ? this : thisArg;
    _this[func] = self;
    // 参数的处理，对 bind 函数的实参和返回的绑定函数的实参进行参数合并，调用时传入
    const allArgs = args.concat([].slice.call(arguments));
    const result = _this[func](...allArgs);
    delete _this[func];
    return result;
  };
  // 维护原型关系
  if (this.prototype) {
    fnNop.prototype = this.prototype;
  }
  fn.prototype = new fnNop();
  return fn;
}

```

```js
// 测试数据
function foo(name) {
this.name = name;
}

var obj = {}

//上下文 功能  done
var bar = foo.myBind(obj)
bar('jack')
console.log(obj.name) //'jack'

// 参数 功能   done
var tar = foo.myBind(obj, 'rose');
tar()
console.log(obj.name) //'rose'
// new 功能   error
var alice = new bar('alice')
console.log(obj.name) //jack   obj name should be 'jack'
console.log(alice.name) //alice, alice name should be 'alice'
```