## 移动端click事件300ms延迟问题

### 产生问题的原因是什么？
浏览器厂商做的限制。单击之后等待300ms来判断是否有进一步的双击操作。因为双击放大，再次双击页面恢复。

### 所以解决办法有以下：
- 禁止双击缩放，加入meta标签
```html
<meta name="viewport"  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=1" />
```

- 使用插件 fastclick.js
1. 引入is文件
1. 写入代码
```js
if('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
```