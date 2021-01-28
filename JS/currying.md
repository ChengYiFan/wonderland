## 柯里化

柯里化是高阶函数的一种特殊用法。
复习一下高阶函数的定义，所有以函数作为参数的函数，都可以叫做高阶函数。

### 定义
柯里化是这样一种函数，它接收函数A作为参数，运行后能够返回一个新的函数，并且这个新函数能够处理A的剩余参数。

### 主要特点
函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。

### 柯里化通用式
柯里化函数的封装其实借助了闭包和递归，实现了参数收集，并在收集完毕之后执行所有参数。
```js
// 封装柯里化通用式
function curry(fn) {
    const args = Array.prototype.slice.call(arguments, 1);
    return function () {
        const newArgs = args.concat(Array.prototype.slice.call(arguments));
        return fn.apply(this, newArgs);
    }
}

// 改进版
// 就下面题目而言，是需要执行三次函数调用，那么针对柯里化后的函数，如果传入的参数没有 3 个的话，就继续执行 /// curry 函数接收参数，如果参数达到 3 个，就执行柯里化了的函数。
function curry(fn, args) {
  const len = fn.length;
  const _args = args || [];
  return function() {
    const newArgs = _args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < len) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  }
}

function add(a,b,c) { return a + b + c;}
const ca = curry(add);
ca(1,2)(3);
// 6
ca(1)(2)(3);
// 6
ca(1,2,3);
// 6
```

### 缺点
柯里化后的函数执行后，其实当于执行函数自身，柯里化确实是把简单问题复杂化了。

### 优点
在复杂化的同时，在使用函数时拥有了更多自由度。对函数参数的自由处理，正是柯里化的核心所在。



### 柯里化的一个面试题：实现一个函数add完成3个数相加， add(1, 2, 3), add(1)(2)(3), add(1, 2)(3)  add(1)(2, 3) 都返回6。

```js
// 第一种
  function add (...args) {
    let num = args.reduce((pre, val) => pre + val, 0);
    const item = (...args2) => {
        num = num + args2.reduce((t, c) => t + c, 0);
        return item;
    }
    item.toString = () => num;
    return item;
  };
```

```js
// 第二种
  function add () {
    //定义一个数组专门存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
    //在 内部声明一个函数，利用闭包的特性保存_args并收集所有的参值
    var _adder = function () {
        _args.push(...arguments);
        return _adder;
    }

    //利用toStringy隐式转换的特性，当最后执行隐式转换，并计算最终的值返回
    _adder.toString = function(){
        return _args.reduce(function(a,b){
          return a+b;
        });
    }
    return _adder;
  }
  add(1)(2)(3)                // 6
  add(1, 2, 3)(4)             // 10
  add(1)(2)(3)(4)(5)          // 15
  add(2, 6)(1)                // 9
```

### 参考 
[从一道面试题认识函数柯里化](https://segmentfault.com/a/1190000016160081)