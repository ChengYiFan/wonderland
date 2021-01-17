## MVVM

### 什么是MVVM模型？
mvvm是Model-View-ViewModel的缩写。
- model：数据
- view：视图
- ViewModel:视图模型

### 几种实现双向绑定的做法
- 发布者-订阅者模式（backbone.js）
- 脏值检查（angular.js）
- 数据劫持（vue.js）

### MVVM的实现原理
1. 响应式：监听数据的变化
1. 模版解析
1. 渲染：模版如何被渲染为html


### Vue的实现
1. 通过Object.defineProperty将data里的每一个属性的访问与修改都变成了一个函数，在函数get和set中我们即可监听到data的属性发生了改变。
1. 模板本质上是一串字符串，vue通过render函数解析，render函数中最核心的是with函数。with函数将某个对象添加到作用域链的顶部，如果在 statement中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。
1. 模板渲染为html分为两种情况，第一种是初次渲染的时候，第二种是渲染之后数据发生改变的时候，它们都需要调用updateComponent

### 参考
- [前端mvvm模式及其在Vue和React中的体现](https://www.cnblogs.com/lalalagq/p/9900849.html)
- [理解MVVM在react、vue中的使用](https://blog.csdn.net/baidu_36486891/article/details/109098109)
- [mvvm框架](https://zhuanlan.zhihu.com/p/173551040?utm_source=qq)
- [剖析Vue实现原理 - 如何实现双向绑定mvvm](https://github.com/DMQ/mvvm)
- [mvvm实现原理](https://blog.csdn.net/dwfrost/article/details/85777900)