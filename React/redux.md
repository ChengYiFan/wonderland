## Redux
Redux 是 JavaScript 应用程序的状态容器，提供可预测的状态管理。
是基于Flux模式的前端状态管理框架。

## react vs redux
react 是组件的state转化到DOM。

redux 通过store管理所有的状态，把store放到所有的状态之外。

出发点是让组件通信更加容易。react组件通信是非常依赖组件的层次结构的。react平级的节点通信只能通过父节点进行中转的方式通信。redux把store放到所有的组件之外，所有的组件都和store通信，组件之间互相通信就会少一点。

## redux管理状态的场景
redux中的状态不仅为了交互，还为了持久化，如果一个组件销毁后再重建还要保持某些状态，那么也放到redux里。除了这两种外，其他放到组件里。是一个单向数据流的过程。

## redux特性
1. single source of truth: 唯一状态的来源，view内部尽量没有自己的状态，让应用更容易理解和追踪，通过查找状态是否正确就可以确定问题。
1. 可预测性： state + action = new state 不可变数据，也是redux运行的基础。
1. 纯函数更新 store：要去更新一个redux的store的话，必须通过一个action来触发，通过reducer来产生一个新的store。更新store的函数必须是一个纯函数。函数是非常容易预测和追踪的。

### 纯函数的三大构成原则（纯函数的特点）：
1. 给定相同的输入，总是返回相同的输出（输出结果完全取决于输入参数）；
1. 没有额外的状态依赖（函数内部不依赖任何外部参数和外部资源）；
1. 过程没有副作用（side effect）(整个过程不引起任何副作用)；

### 理解Store
全局的store，存储所有的状态.
产生store
const store = createStore(reducer);
三个方法
1. getState();  获取当前的状态
1. dispatch(action);  分发事件（比如点击按钮），dispatch action到store
1. subscribe(listener);  监听store的变化

### 理解 action
描述了一个行为的数据结构
{
  type: ADD_TODO,
  text: 'Build my first Redux app',
}

### 理解reducer
函数，纯函数，接收两个参数，一个initialState，一个action。action触发到store的更新，通过reducer。



### 如何触发状态更新到视图？
reducer是redux的三个核心概念之一，它指定了应用状态的变化如何响应 actions 并发送到 store。

reducer响应action的原理：
reducer 负责接收action，并返回一个新的state，在react组件开发中，手动调用dispatch方法发送action来响应事件。这里的发送action还包括了调用reducer，更新状态为reducer的处理结果，触发订阅事件等一系列的操作，都是在dispatch方法内实现的。

dispatch处理中reducer方法的调用无疑是很关键的一步，经过它的处理之后才生成了新的状态数据。

在redux中，保持reducer是一个纯函数非常重要，保证reducer是纯函数要达到以下几点：
- 不能修改传入的参数
- 不得调用非纯函数，如Date.now()
- 不得执行有副作用的操作，如API请求和路由跳转

### redux的工具函数
1. combineReducers
1. bindActionCreators


## redux异步Action、redux中间件(middleware)
Store -> Actions -> Reducer -> View -> Middlewares
异步Action并不是不同的action，而是若干个同步action的组合

中间件主要用于截获 action， 发出action
典型应用: logger

## 不可变数据（immutable data)
不可以直接修改值，而是要通过复制值，并且产生新对象的方式来得到新的数据，包含了要修改的部分。

### 为何需要不可变数据
1. 性能优化： 只比较对象的引用是否相同就可以知道对象是否变化。
1. 易于调试和跟踪
1. 易于推测：比较前后两个值很容易知道数据发生变化的地方。

### 如何操作不可变数据
1. 一般的用原生Object.assign({}), {...} 性能最高的写法
2. 复杂的用immutable-update这个轻量级库。（更新的节点比较深）
3. immutability-helper, immer(工具类型和操作普通对象的写法来相似的写法来操作，性能上不如原生和immutability-helper)

### 总结
redux 独立与框架的状态管理工具。可以独立使用，也可以在node中，vue中使用，react中使用。