# my wonderland

**学习方法**
+ 形成知识体系：立足标准，系统整理总结前端知识，梳理知识点，把点串成线，形成知识体系，并在这个体系上不断优化。
  1. 知识体系有优劣之分，最重要的就是它的逻辑性和完备性。
  1. 学习的过程就是知识架构不断优化的过程。
+ 明白底层原理：在学习的过程中建立自己的认知方法论。
  1. 追本溯源，关注技术提出的背景、原始论文、作者所说的话，试着发邮件问问。
+ 放眼团队：从业务和工程的角度思考前端团队的价值好发展需要，才能持续发展。
+ 通用编程能力和架构能力：通过练习获取编程能力，通过工作经验获取架构和工程能力。
+ 保持学习能力，技术快速革新。
  - 零基础入门经典前端教材推荐：
    1. 《JS高级程序设计》
    1. 《精通CSS》
  - 参考性质的网站：
    1. MDN
    1. 技术专栏，学习体系架构和学习方法，理解前端背后的核心思想。

## [JS](https://github.com/ChengYiFan/wonderland/blob/main/JS/index.md)
- this
- 闭包
- 垃圾回收机制
- 箭头函数
- call、apply、bind区别
- 模块模式的理解，ES6模块模式与node.js模块模式的区别？
- 函数式编程
- 如何理解纯函数，自己怎么构建纯函数
- 函数柯里化
- 原型和原型链
- 继承
- 浅拷贝和深拷贝
- setTimeout和requestAnimationFrame
- JS事件循环
- ts解决了哪些问题？
- DOM 事件机制

## CSS
- 盒模型
- BFC
- 三栏布局
- 媒体查询
- 伪类和伪元素的区别
伪类有UI伪类和结构化伪类，UI伪类会在元素处于某个状态时（比如鼠标悬停），为该元素应用css样式。结构化伪类会在标记中存在某种结构上的关系时（如某个元素时一组元素中的第一个或最后一个），为相应元素应用css样式。
**UI伪类：**
链接伪类：:link,:visited,:hover,:active。
focus伪类：e:focus。
target伪类: #more_info:target。
**结构化伪类：**
:first-child,:last-child
:nth-child
伪元素是文档中若有实无的元素。
::first-letter
::first-line
::before,::after
- 浮动与清除
- 纯css实现一个宽度自适应，高度固定为宽度2倍的div

## HTML
- doctype一定要写吗？
- meta标签的作用？
- 语义化
- storage/cookie

## 移动端
- font-size: 10px如何实现
- 移动端1px如何实现
- 媒体查询
- 移动端click 300ms延迟的原因？

## 浏览器
- http1.1 和 http2.0的区别
- 从浏览器输入URL获取页面到浏览器渲染页面，经历了哪些过程？
- 回流和重排（重绘）怎么优化？
- DOM和CSS如何解析，如何渲染出元素？

## 性能优化
- 如何实现一个单点登录？
- 项目里具体做了哪些优化？
- 性能优化的方法
性能优化初步原则
减小代码量
减小请求数
最大化利用浏览器缓存

这三条原则永远是一切优化的前提
编码阶段：组件复用，
更新阶段：PureComponent/memo/immutable
状态管理：reselect/useSelector等redux状态管理性能优化
路由：lazyloading
CDN 的使用
打包阶段：
  webpack打包优化，压缩JS、CSS代码，
  提取 chunk 中使用的公共库（能为chunk代码节约近1/3的代码量），
  生产模式（pro）下第三方库使用已压缩版本，
  优化 babel-ployfill，结合 babel-preset-env 实现兼容按需加载，比使用es2015能节约近半的大小，
  开启dll，优化打包速度，
  去除lodash未引入的模块，需要和babel-plugin-lodash插件配合使用
  性能分析：spead-measure-webpack-plugin (分析loader\plugin)
  分析包工具：webpack-bundle-analyzer



## 手写
- 手写call、apply、bind
- 手写new
- 手写deepClone
- 手写防抖、节流、杨辉三角
- 手写promise
- 手写promise.all

## 算法
- 二分查找
- 数组去重
- 删除重复的字符
- 连字符转成驼峰
- 怎么用最优雅的方法给数字加千分位
- 斐波那契
- 求最大公约数
- 验证一个数是否是素数
- 二叉树自平衡
- 判断链表是否成环
- 判断词库里是否有某个词
- 爬楼梯
- 

## React
- react
- react hooks 的优点？
- redux 原理，如何触发状态更新到视图？
- contextAPI

## 设计模式
- 策略模式
- mvc、mvp、mvvm
- 简述mvvm实现原理，并分react和vue画出流程图

## 工程化
- webpack5的新特性
- 多项目共用node moudles如何做工作区间？
- 如何监听git提交？
- webpack 原理
- webpack proxyTable
- 理解Webpack tree shaking

## 开放性
- 如何减少代码量但是增加代码的功能
- 你觉得前端代码和后端代码哪个更有技术含量

