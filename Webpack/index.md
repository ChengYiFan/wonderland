## webpack原理

### webpack的构建流程 
1. 解析配置参数，合并从shell传入和webpack.config.js配置文件配置的参数，生成最后的配置结果。
1. 注册所有配置的插件，通过插件监听webpack生命周期过程中的事件节点，以做出反应。
1. 从entry入口开始构建（AST语法树）抽象语法树，找出每个文件之间的依赖关系，递归下去。
1. 在解析文件的递归过程，根据文件类型和loader配置，找出合适的loader 对文件进行转换。
1. 递归完成后得到每个文件的最终结果，根据配置输出到不同的chunk。
1. 输出chunk到文件系统。

https://blog.csdn.net/sinat_17775997/article/details/89413142