## MVC-MVP-MVVM

### MVC（Model-View-Controller)
最常用的软件架构之一。
- 模型（Model）：数据保存。
- 视图（View）：用户界面。
- 控制器（Controller）：业务逻辑。

特点：实现应用程序中的数据模型与业务模型的解耦。

### MVP
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。

特点：
- 各部分之间的通信都是双向的。
- View 与 Model 不发生联系，都通过 Presenter 传递。
- View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。

### MVVM （Model-View-ViewModal）
- 模型（Modal)： 数据处理
- 视图（View）：用户界面
- 视图模型(ViewModal)： 连接 View 和 Modal的桥梁，主要用来处理业务逻辑。

特点：数据双向绑定（data-binding），View 的变动自动反映在 ViewModal, 反之亦然。

### 区别
MVC框架允许View和Model直接进行通信！View和Model之间随着业务量的不断庞大，会出现蜘蛛网一样难以处理的依赖关系，完全背离了开发所应该遵循的“开放封闭原则”。

MVVM：实现了数据与视图的分离；通过数据来驱动视图，开发者只需关心数据变化，DOM操作被封装了。