## react-redux
Component -> Connect -> Store

组件获取store上的数据，组件的操作去更新store的数据，是通过Connect这样的概念去实现的。
接收两个参数mapStateToProps mapDispatchToProps

## connect的工作原理：高阶组件
组件connect之后，会访问store及action，store先传递到高阶组件，再传递到组件。

## 在react中使用redux
在根节点定义Provide，在用高阶组件Connect包裹组件。


