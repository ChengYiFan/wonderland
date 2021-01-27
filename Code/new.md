## 手写new
new的过程发生了什么？
1. 生成了一个新对象。
1. 实例对象的__proto__与构造函数的prototype全等。
1. 执行构造函数，并将构造函数的this绑定为新对象，并设置属性值。
1. 返回新对象。

```js
Function.prototype.myNew = function() {
  // 拿到构造函数
  const fn = [].shift.call(arguments);
  // 生成一个新对象
  const obj = new Object();
  obj.__proto__ = fn.prototype;
  const result = fn.apply(obj, arguments);
  return typeof result === 'object' ? result : obj;
}
```