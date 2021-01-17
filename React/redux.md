## Redux


### 如何触发状态更新到视图？
reducer是redux的三个核心概念之一，它指定了应用状态的变化如何响应 actions 并发送到 store。

reducer响应action的原理：
reducer 负责接收action，并返回一个新的state，在react组件开发中，手动调用dispatch方法发送action来响应事件。这里的发送action还包括了调用reducer，更新状态为reducer的处理结果，触发订阅事件等一系列的操作，都是在dispatch方法内实现的。

dispatch处理中reducer方法的调用无疑是很关键的一步，经过它的处理之后才生成了新的状态数据。

在redux中，保持reducer是一个纯函数非常重要，保证reducer是纯函数要达到以下几点：
- 不能修改传入的参数
- 不得调用非纯函数，如Date.now()
- 不得执行有副作用的操作，如API请求和路由跳转