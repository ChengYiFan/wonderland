## 继承
2021-01-28 今天来攻克继承

很多面向对象的语言都支持两种继承方式：接口继承和实现继承。前者只继承方法签名，后者继承实现方法。
比如Java两者都支持。而JS只支持实现继承，因为函数没有签名。JS的继承主要是通过原型链实现的。

### 1. 原型链继承
首先要理解构造函数、原型和实例的关系。
每个构造函数都有一个原型对象。
原型对象又一个属性指向构造函数。
实例有一个指针指向原型。

让原型对象等于另外一个类型实例，那么就意味着这个原型内部有一个指针指向另一个原型，相应的另一个原型有一个指针指向另一个构造函数，这样就在实例和原型之间构造了一条原型链，这是原型链的基本构想。（摘自JS高级程序设计第4版Page 238）。

原型链是继承的主要实现方式，通过这种方式继承多个引用类型的属性和方法。 
主要思路是把子类的构造函数原型赋值为父类构造函数的实例。

```js
function Super() {
    this.name = 'super';
}
function Sub() {
    this.age = 10;
};
// 继承
Sub.prototype = new Super(); 
// 重点在这个赋值操作，充写了Sub的原型，所以Sub.prototype可以去访问Subper的实例可以访问到的属性和方法

const sub = new Sub();
// sub {age: 10}
// 此时Sub原型的构造函数的指针是指向Super的
Sub.prototype.constructor === Super  // true

// sub作为Sub的实例去访问Sub.prototype 上的属性和方法拿到了name属性
console.log(sub.name); // super
```

#### 拓展
原型和实例之间的关系确认： instanceof方法和isPrototypeof方法
```js
sub instanceof Sub  // true
sub instanceof Super  // true
sub instanceof Object  // true

Sub.prototype.isPrototypeOf(sub); //true
Super.prototype.isPrototypeOf(sub); //true
Object.prototype.isPrototypeOf(sub);  //true
```

#### 原型链继承的问题
1. 原型中包含的引用值会在所有实例间共享；
1. 子类型在实例化时不能给父类型的构造函数传参；
1. 以对象字面量方式创建原型方法会破坏之前的原型链；

### 2. 盗用构造函数（经典继承）
为了解决原型链继承导致的引用类型在实例间共享的问题。
主要思路是在子类构造函数中调用父类的构造函数。使用call()或apply()方法以新创建的对象为上下文执行构造函数。

```js
function Super(name) {
  this.colors = ['red', 'yellow', 'green'];
  this.name = name;
}
Super.prototype.getName = function() {
  console.log(this.name);
}
function Sub(name) {
  Super.call(this, name);
}
let instance1 = new Super();
instance1.colors.push('pink');  // (4) ["red", "yellow", "green", "pink"]
console.log(instance1.colors);
let instance2 = new Super('cici');
console.log(instance2.colors); // (3) ["red", "yellow", "green"]

Sub.prototype.constructor === Sub  // true
Sub.prototype.constructor === Super // false
```
#### 构造函数继承的优点
1. 可传递参数
1. 实例间不共享引用值

#### 缺点
1. 只实现了属性值的继承，没有实现方法的继承。
1. 子类也不能访问父类原型上的方法。

### 3.组合继承模式
鉴于原型链继承和构造函数继承存在的问题，基本上不能单独使用。
组合继承综合了原型链继承和构造函数继承的优点。基本思路是使用原型链继承原型上的属性和方法，使用构造函数继承实例属性。
这样方法定义在原型上可以重用，又可以让每个实例有自己的属性。

```js
function Super(name) {
  this.colors = ['red', 'yellow', 'green'];
  this.name = name;
}
Super.prototype.getName = function() {
  console.log(this.name);
}
function Sub(name) {
  // 继承属性
  Super.call(this, name);
}
// 继承方法
Sub.prototype = new Super();
```

组合继承弥补了原型链和盗用构造函数的不足，是JS中使用最多的继承模式，而且组合继承也保留了instanceof 操作符 和 isPrototypeOf()方法识别合成对象的能力。

### 4. 原型式继承
一种不涉及严格意义上的构造函数的继承方法。出发点是不自定义类型也可以通过原型实现对象之间的信息共享。

主要是通过一个函数来实现：
```js
function object(o) {
  function Fn() {}
  Fn.prototype = o;
  return new Fn();
}
```
这个object()会创建一个临时的构造函数，将传入的对象指给这个构造函数的原型，然后返回这个临时对象的实例。本质上是对传入的对象执行了一次浅拷贝。
```js
let person = {    
  name: "Nicholas",   
  friends: ["Shelby", "Court", "Van"] 
};  
let anotherPerson = object(person); 
anotherPerson.name = "Greg"; 
anotherPerson.friends.push("Rob");  
let yetAnotherPerson = object(person); 
yetAnotherPerson.name = "Linda"; 
yetAnotherPerson.friends.push("Barbie");  
console.log(person.friends);  // "Shelby,Court,Van,Rob,Barbie" 
```

ES5 通过增加 Object.create()方法将原型式继承的概念规范化了。 这个方法接收两个参数:作为新对象原型的对象,以及给新对象定义额外属性的对象(第二个可选) 。
Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样:每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。
```js
let person = {    
  name: "Nicholas",   
  friends: ["Shelby", "Court", "Van"] 
};  
let anotherPerson = Object.create(person, {   
  name: {     
    value: "Greg"   
  } 
}); 
console.log(anotherPerson.name);  // "Greg" 
```
原型式继承非常适合不需要单独创建构造函数,但仍然需要在对象间共享信息的场合。但要记住, 属性中包含的引用值始终会在相关对象间共享,跟使用原型模式是一样的。

### 5. 寄生式继承

### 6. 组合寄生式继承
```js
function inheritPrototype(subType, superType) {   
  let prototype = object(superType.prototype);  
  // 创建对象   
  prototype.constructor = subType;              
  // 增强对象    
  subType.prototype = prototype;                
  // 赋值对象 
} 
```

在这个函数内部,第一步是创建父类原型的一个副本。然后,给返回的prototype 对象设置 constructor 属性,解决由于重写原型导致默认 constructor 丢失的问题。最后将新创建的对象赋值给子类型的原型。

只调用了一次 SuperType 构造函数, 避免了 SubType.prototype 上不必要也用不到的属性, 因此可以说这个例子的效率更高。而且,原型链仍然保持不变。