## 内置类型
JS中七种内置类型，分为基本类型和对象类型。

基本类型(6种)：null，undefined，boolean，number，string，symbol。

其中数字类型是浮点类型的，没有整型。并且浮点类型是基于IEEE 754（双精度版本 64位）标准实现，在使用中会遇到一些 Bug。

比如 0.1 + 0.2 != 0.3，原因是在这种标准下小数算二进制和整数不同，小数的表示存在精度问题。原生解决办法如下：
```js
parseFloat((0.1 + 0.2).toFixed(10))
```
NaN也是number类型，并且NaN不等于自身。
** 如何判断一个变量是否是NaN呢？**
```js
// 利用 ES6 中提供的 Object.is() 方法
var a = "string";
var b = 2;
var c = a/b;  // NaN
Object.is(c, NaN); // true

// 使用isNaN()函数判断
function _isNaN(val) {
  if (typeof val === 'number' && isNaN(val)) {
    return true;
  }
  return false;
}
```
不推荐直接使用isNaN()函数。isNaN() 的参数如果不是 Number 类型，则会先把参数进行一次 Number 转换，所以如果直接使用，当传入字符串时，也会返回 true，即 isNaN('str'); // true 。

对象（Object)是引用类型，在使用过程中会也遇到浅拷贝和深拷贝的问题。
```js
let a = { name: 'FE'};
let b = a;
b.name = 'EF';
console.log(a.name); // EF
```
## typeof
typeof 对于基本类型，除了 null 都可以显示正确的类型。
```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b没有声明，但是还是会显示 undefined
```
typeof 对于对象，除了函数都会显示 object
```js
typeof [] 'object'
typeof {} 'object'
typeof console.log // 'function'
```
对于null 来说，虽然它是基本类型，但是会显示 object，这是一个存在很久了的bug。
```js
typeof null // 'object'
```
出现这个问题的原因，是JS最初版本使用的32位系统，为了性能考虑使用低位存储了变量的类型信息，000开头代表的是对象，然而null表示为全零，所以将它错误的判断为object。虽然现在内部类型判断代码已经改变了，但是对于这个bug却一直流传下来了。
### 如何精确的判断对象类型
typeof 判断数组、对象、函数、null 是准确的。可以使用 Object.prototype.toString.call()。因为JS中的对象都继承自Object，对任一值类型应用 Object.prototype.toString.call() 方法，可以拿到内置类型。
```js
function type(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]' : 'boolean', 
    '[object Number]'  : 'number', 
    '[object String]'  : 'string', 
    '[object Function]' : 'function', 
    '[object Array]'  : 'array', 
    '[object Date]'   : 'date', 
    '[object RegExp]'  : 'regExp', 
    '[object Undefined]': 'undefined',
    '[object Null]'   : 'null', 
    '[object Object]'  : 'object'
  };
  return map[toString.call(obj)];
}
```

### 判断数组的方法
```js
// frist method
const arr = [];
Object.prototype.toString.call(arr) === '[object Array]';  // true
// second method: ES2015 Array.isArray()
Array.isArray(arr);  // true
```

## 类型转换
### 转Boolean
在条件判断时，除了undefined、null、false、NaN、'', 0, -0, 其他所有值都转为true。包括所有对象。

### 对象转基本类型
对象在转换基本类型时，首先会调用valueOf然后再调用toString。并且这两个方法是可以重写的。

也可以重写Symbol.toPrimitive，该方法在转换基本类型时，调用优先级是最高的。
```js
let a = {
  valueOf() {
    return 0;
  },
  toString() {
    return '1';
  },
  [Symbol.toPrimitive]() {
    return 2;
  },
};
1 + a // => 3
'1' + a // => '12'
```

### 四则运算符

### == 操作符

### === 操作符

### == 操作符和 === 操作符的区别

### 比较运算符

## new

## this

## 执行上下文

## 闭包

## 继承

## 深浅拷贝
给变量赋值一个对象，那么两者的值会是同一个引用，其中一方改变，另一方相应也会改变。
### 浅拷贝
可以使用 Object.assign() 来实现一个浅拷贝。
也可以使用展开运算符（...)来解决。
```js
const a = {
  age: 1,
};
const b = Object.assign({}, a);
const c = {...a};
a.age = 2;
console.log(b.age);  // 1
console.log(c.age);  // 1
```
通常浅拷贝就能解决大部分问题了，但是当遇到对象的深层引用时，就需要使用深拷贝了。
```js
const a = {
  age: 1,
  jobs: {
    first: 'FE',
  }
};
let b = {...a};
a.jobs.first =  'native';
console.log(b.jobs.first); // native
```
### 深拷贝
使用JSON.parse(JSON.stringify(object))来实现深拷贝。
该方法的局限性在于：
1. 会忽略undefined
1. 不能序列化函数
1. 不能解决循环引用的对象

但在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题，并且该函数是内置 函数中处理深拷贝性能最快的。如果包含以上三种情况的化，可以使用lodash的深拷贝函数。
### 手动实现一个深拷贝，实现对数组和对象的深拷贝
```js
function type(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]' : 'boolean',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Symbol]': 'symbol',
    '[object Function]': 'function',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
  };
  return map[toString.call(obj)];
}
function deepClone(data) {
  const t = type(data);
  let o;
  if (t === 'object') {
    o = {};
  } else if (t === 'array') {
    o = [];
  } else {
    return data;
  }
  if (t === 'object') {
    for(let i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  } else if (t === 'array') {
    for(let j = 0; j < data.length; j++) {
      o.push(deepClone(data[j]));
    }
    return o;
  }
}
```

## call、apply、bind的区别
call、apply都是为了改变this的指向，作用都是相同的，只是传参的方式不同。除了第一个参数外，call可以接收多个参数，而apply只接收一个参数数组。这两个方法都会在改变this和传参后执行函数。
### 模拟实现call
```js
Function.prototype.myCall(obj) {
  const context = obj || window;
  // const args = Array.prototype.slice.call(arguments, 1);
  const args = [...arguments].slice(1);
  context.fn = this;
  const result = context.fn(args);
  // 删除fn
  delete context.fn;
  return result;
}
```
### 模拟实现apply
apply 的实现思路与call类似，不同的是增加了参数的判断
```js
Function.prototype.myCall(obj) {
  const context = obj || window;
  // const args = Array.prototype.slice.call(arguments, 1);
  context.fn = this;
  const result = arguments[1] ? context.fn(arguments[1]) : context.fn();
  // 删除fn
  delete context.fn;
  return result;
}
```
### 模拟实现bind
该方法和其他两个方法作用一致，只是该方法返回一个函数。并且可以通过bind实现柯里化。
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

## 柯里化

## 模块化
在有 Babel的情况化，可以直接使用 ES6的模块化

### CommonJS

### AMD

## 箭头函数
一种使用箭头定义函数的新语法
1. 没有this、super、arguments 和 new.target绑定。这些值由外围最近一层非箭头函数决定。
1. 不能通过new关键字调用。
1. 没有原型
1. 不可以改变this的绑定
1. 不支持arguments对象
1. 不支持重复的命名参数
## Promise实现
Promise是ES6新增的语法，解决了回调地狱的问题。

### 模拟实现Promise.all

### 模拟实现Promise.race

## Generator实现

## Map、Set、WeakMap、WeakSet、FlatMap、Reduce

## async 和 await

## Proxy

## 正则表达式

## V8下的垃圾回收机制

## JS事件循环
JS是单线程的。在JS引擎执行Node或浏览器发送过来的代码时，会顺序的把执行环境加入到执行栈中。如果遇到异步代码，会挂起并加入到Task（多个Task）队列。执行栈空闲时，从Task队列里拿出需要执行的代码放入执行栈中执行。执行完成后出栈，如此循环，即为事件循环机制。

不同的任务源会被分配到不同的Task队列。
可以分为宏任务和微任务。
- 微任务包括： process.nextTick、promise、Object.observe、MutationObserver
- 宏任务：script、setTimeout、setInterval、setImmediate、I/O、UI rendering

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包含了script。浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。

所以正确的一次 Event loop的顺序是这样的：
1. 执行同步代码，这属于宏任务
1. 执行栈为空，查询是否有微任务需要执行
1. 执行所有微任务
1. 必要的话渲染UI
1. 然后开始下一轮 Event loop。执行宏任务中的异步代码。

通过上述的Event loop顺序可知，如果宏任务中的代码有大量的计算并且需要操作 DOM的话，为了更快的界面响应，可以把操作DOM放入微任务中。


```
setTimeout(function () {

  console.log(1)

}, 0);

new Promise(function executor(resolve) {

  console.log(2);

  for (var i = 0; i < 10000; i++) {

    i == 9999 && resolve();

  }

  console.log(3);

}).then(function () {

  console.log(4);

});

console.log(5);     // 2、3、5、4、1
```

function fn1(num) {
    const arr = String(num).split('').reverse();
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i]);
      console.log(i % 3);
      if ((i+1) % 3 === 0) result.push(',');
    }
    result = result.reverse();
    console.log(result);
    return result[0] === ',' ? result.slice(1).join('') : result.join('');
}