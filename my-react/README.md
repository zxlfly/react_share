## 源码部分会分步骤实现

### step1 实现React.createElement, ReactDom.render, Component
- webpack+babel编译时，替换JSX为React.createElement(type,props,...children)
- 所有React.createElement()执⾏结束后得到⼀个JS对象即vdom，它能够完整描述dom结构
- ReactDOM.render(vdom, container)可以将vdom转换为dom并追加到container中
- 实际上，转换过程需要经过⼀个diff过程。

### step2 在原有的基础上实现简版fiber
render创建的react元素组成的树，在下一次数据状态变化时，render会返回一棵不同的树，两者相互比较来更新UI与最新树保持一致。  
在比较（diff）的过程中为了考虑性能问题，比较的规则是同层比较深度优先，默认两种不同类型的元素产生不同的树，可以设置key来标识相同元素是否可以复用。  
但是这样有个问题，对于大型项目，如果组件数很大，任务执行是按照顺序来的，没有优先级，对于需要即时处理的任务可能会延迟，导致用户体验不好，例如鼠标点击时间、input输入等等。  
所以引入了fiber来解决这个问题。

#### fiber``window.requestIdleCallback(callback[, options])``
我们这使用的是[window.requestIdleCallback()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)⽅法，这个方法会在浏览器的空闲时间内调用任务函数队列，即执行我们的任务。这个api有兼容性问题，源码中是自己实现的。  
这就可以在主事件循环上执行后台和低优先级的工作任务，而不会影响关键事件，如动画和输入响应等用户交互。  
函数一般会按照先进入先调用的执行顺序，如果回调指定了超时时间``timeout``，则有可能为了在超时前执⾏函数⽽打乱执⾏顺序。  

**callback**就是在时间循环空闲时即将被调用的函数引用。函数会接受一个名为[IdleDeadline](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)的参数，它提供了一个方法, 可以让你判断用户代理(浏览器)还剩余多少闲置时间可以用来执行耗时任务.  
**options**可选  
包括可选的配置参数  
``timeout``如果制定了timeout并且有一个正值，而且尚未通过超时毫秒数调用回调，那么回调会在下一次空闲期间被强制执行，尽管可能会对性能造成负面影响。  
react中requestIdleCallback的hack在
react/packages/scheduler/src/forks/SchedulerHostConfig.default.js。

### step3 实现useState（16.8新增特性）
useState在updateFunctionComponent的时候存到fiber中  
即当前进行中的fiber**wipFiber**

### [react核心代码解析](https://www.processon.com/view/link/601fabe67d9c0816c3e3fa62)
以上面的代码为基础深入了解源码