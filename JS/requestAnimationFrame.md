## setTimeout与requestAnimationFrame的区别

requestAnimationFrame 是和动画相关的一个api。

### FPS
FPS可以理解为我们常说的“刷新率（单位为Hz）
至少要以24FPS的速率才能形成动画，但这样的动画并不是平滑的，流畅的。
常见的电脑，智能手机等大部分现代化设备通常是以60FPS的速率刷新屏幕的，少部分游戏系统则支持120FPS。

### setTimeout/setInterval
setTimeout是以n毫秒后执行回调函数，回调函数中可以递归调用setTimeout来实现动画。
setInterval以n毫秒的间隔时间调用回调函数。
为了实现60FPS，我们要以60次/s的速度移动一个元素，那意味着元素必须以东大约16.7ms（1000ms.60frames）。
上面的数据是我们理论计算出来的。当我们执行setTimeout（function（）{}，1000/60
）
这段代码执行的时候他真的是在1000/60毫秒后执行的么？并不是，那是为什么呢！

### javaScript中的事件队列
[事件队列、事件循环机制](https://github.com/ChengYiFan/wonderland/blob/main/JS/eventLoop.md) 导致了setTimeout/setInterval，设置了16秒后执行，但可能在18秒执行，因为js引擎正在处理其他内容。

setTimeout/setInterval 不单是不准时的问题，还有其他问题总结如下：
1. 动画作者对帧数没有掌控；
1. 当标签是隐藏状态（非当前显示的）时，无谓的消耗系统资源。
1. setInterval对自己调用的代码是否报错漠不关心，即使调用的代码错了，他依然可以持续调用下去。
由于上面的种种问题，有了requestAnimationFrame

### requestAnimationFrame
HTML5新增的api，类似于setTimeout定时器。window对象的一个方法window.requestAnimationFrame 浏览器（所以只能在浏览器中使用）专门为动画提供API，让dom动画，canvas动画。svg动画。webGL动画等有一个统一的刷新机制。

特点：
1. 按帧对网页进行重绘。该方法告诉浏览器希望之星动画并请求浏览器在下一次重绘之前调用就掉函数更新动画。
1. 由系统来决定回调函数的执行机制。在运行时浏览器会自动优化方法的调用。
1. 显示器有固定的刷新频率（60Hz 或 75Hz），也就是说，每秒最多只能重绘60 次或 75 次，requestAnimationFrame 的基本思想让页面重绘的频率与这个刷新频率保持同步比如显示器屏幕刷新率为 60Hz，使用 requestAnimationFrame API，那么回调函数就每 1000ms / 60 ≈ 16.7ms 执行一次；如果显示器屏幕的刷新率为 75Hz，那么回调函数就每 1000ms / 75 ≈ 13.3ms 执行一次。
1. 通过 requestAnimationFrame 调用回调函数引起的页面重绘或回流的时间间隔和显示器的刷新时间间隔相同。所以 requestAnimationFrame 不需要像setTimeout 那样传递时间间隔，而是浏览器通过系统获取并使用显示器刷新频率。

###  优势：
1. requestAnimationFrame 可以提升性能，防止掉帧
1. requestAnimationFrame 可以节省资源，节省电源

### 对比：
1. 引擎层面：setTimeout 属于 JS 引擎，存在事件轮询，存在事件队列。requestAnimationFrame 属于 GUI 引擎，发生在渲染过程的中重绘重排部分，与电脑分辨路保持一致。
1. 性能层面：当页面被隐藏或最小化时，定时器 setTimeout 仍在后台执行动画任务。当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，requestAnimationFrame 也会停止。
1. 应用层面：利用 setTimeout，这种定时机制去做动画，模拟固定时间刷新页面。
requestAnimationFrame 由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了CPU 开销。

