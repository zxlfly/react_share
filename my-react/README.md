## 源码部分会分步骤实现

### step1 实现React.createElement, ReactDom.render, Component
- webpack+babel编译时，替换JSX为React.createElement(type,props,...children)
- 所有React.createElement()执⾏结束后得到⼀个JS对象即vdom，它能够完整描述dom结构
- ReactDOM.render(vdom, container)可以将vdom转换为dom并追加到container中
- 实际上，转换过程需要经过⼀个diff过程。
