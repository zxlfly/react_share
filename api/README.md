# 起步，使用官方脚手架搭建项目
1. 传建项目：``npx create-react-app my-app``
2. 打开项⽬：``cd my-app``
3. 启动项目：``npm start``
4. 暴露配置项：``npm run eject``该操作不可逆
5. ⽂件结构
   1. public为静态资源
   2. src为源码处，所有的业务代码都在这，index.js为入口文件。
      1. 改目录下的文件可以全部删除自己写，入口是必须的
   3. package.json为npm依赖

- react负责逻辑控制，数据转换成vdom
- reactdom渲染实际的dom，vdom转换成dom
- react使用jsx来描述ui
- babel-loader把jsx编译成响应的js对象，React.createElement再把这个js对象构造成react需要的虚拟dom——vdom

# jsx
jsx是一种JavaScript的语法扩展，其格式比较像模板语言，但事实上完全是在JavaScript内部实现的。  
jsx可以很好的描述ui，能够有效提高开发效率  
**基本使用**表达式{}的使用
```
const name = "react study";
const jsx = <div>hello, {name}</div>;
```
**函数** 
```
const user = {
    fistName: "fistName",
    lastName: "lastName"
};
function formatName(name) {
    return name.fistName + " " + name.lastName; 
}
const jsx = <div>{formatName(user)}</div>;
```
**对象**
```
const greet = <div>good</div>;
const jsx = <div>{greet}</div>;
```
**条件语句**条件语句可以基于上面进行控制渲染
```
const show = true;//false;
const greet = <div>good</div>;
const jsx = (
    <div>
        {/* 条件语句 */}
        {show ? greet : "登录"}
        {show && greet}
    </div>
);
```
**数组**可以使用遍历的方式循环渲染一组数据
```
const a = [0, 1, 2];
const jsx = (
    <div>
        {/* 数组 */} 
        <ul>
            {/* diff时候，⾸先⽐较type，然后是key，所以同级同类型元素，
        key值必须得 唯⼀ */}
            {
                a.map(item => (
                    <li key={item}>{item}</li>
                ))
            }
        </ul>
    </div>
);
```
**属性的使用**
```
import logo from "./logo.svg";
const jsx = (
    <div>
        {/* 属性：静态值⽤双引号，动态值⽤花括号；class、for等要特殊处
    理。 */} 
        <img src={logo} style={{ width: 100 }} className="img"/>
    </div>
);
```
**模块化**在处理css的时候可以使用模块化的方式处理，避免重名覆盖问题
```
import style from "./index.module.css"; 
<img className={style.logo} />
```
也可以使用一些第三方的库如：sass等

# 组件
组件有两种形式：class组件和function组件。概念上类似于JavaScript函数，接受props参数，并且返回描述页面展示内容的React元素
**class组件**
class组件拥有状态state和证明周期，继承与Component，实现render方法
例：``ClassComp.jsx``
**function组件**
React16.8开始引⼊了hooks，函数组件也可以拥有状态。返回渲染结果
例：``FunctionComp.jsx``

# setState(class组件更改状态state)
```setState(partialState, callback)```
1. ``partialState : object|function``用于产生与当前state合并的子集
2. ``callback : function``state更新之后被调用
3. **不要直接修改state**
4. 出于性能考虑react可能会把多个setState调用合并成一个，所以state的更新可能是异步的
   1. 如果需要获取最新的值，可以回调中获取
5. 使用定时器或者在原生事件中修改状态是同步的，不会批量处理，只有在react的合成事件中才会批量处理
6. 同步异步指的的是状态的更新是否批量处理
7. 如果多次修改同一个状态，state的更新会被合并成最后一次修改的值
   1. 如果需要链式修改而不是合并
   2. setState可以直接传入修改的函数，state将作为参数在内部可以获取最新状态进行操作

# 组建复合
可以理解成布局，讲通用的页面布局整合在一起，通过传入的props控制渲染结果，可以自定义外观和行为。对于组件之间公用的非逻辑UI，将他们抽离整合可以有效的复用，易于修改调试

# redux
redux是一种状态容器，提供了可预测的状态管理，保证程序行为的一致性。（不是针对react设计，其他的框架也能使用）
**安装**
``npm install redux --save``
1. 需要一个store存储数据
2. store里的reducer初始化state并且定义修改规则
3. 通过dispatch派发action来提交对数据的修改
4. action提交到reducer函数里，根据传入的action的type（可以传参payload），返回新值

# react-redux
在实际的项目我们一般不单独使用redux，而是结合react-redux使用，简化我们的操作
``npm install --save react-redux``
react-redux提供了两个api
- Provider为后代组件提供store
- connect为组件提供数据和变更方法
例：``ReactReduxPage``

# react-router
react-router包含3个库，``react-router``、``react-router-dom``和``react-router-native``。``react-router``提供最基本的路由功能。后面两个都依赖``react-router``，所以安装的时候我们可以直接安装``react-router-dom``或``react-router-native``。前者是web中使用的，后者是react native中使用的。我们这介绍的是``react-router-dom``  
``npm install --save react-router-dom``
**基本使用**
react-router中奉行一切皆组件的思想，路由器Router、链接Link、路由Route、独占路由Switch、重定向Redirect都是以组件的形式存在  
例：``RouterPage``
路由Route渲染内容的三种方式：
- children：func
  - 不管location是否匹配，都会渲染，其他工作方式和render一样
- render：func
  - 一个函数，当location匹配的时候回调用渲染
- component: component
  - 只有当location匹配的时候渲染对应的组件
- 当所有的location都不匹配的时候渲染一个404页面

# 生命周期
⽣命周期⽅法，⽤于在组件不同阶段执⾏⾃定义功能。  
react 16.4开始下面生命周期不再推荐使用，因为引入Fiber任务调度。render之前的所有生命周期都有可能被多次执行。
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate
引入了两个新的生命周期
- static getDerivedStateFromProps
  - ``static getDerivedStateFromProps(props, state)``
  - ``getDerivedStateFromProps``会在调用render之前调用，并且初始挂载以及后续更新时都会被调用。
  - 它可以返回一个对象来更新state
  - 如果返回null则不更新任何内容
- getSnapshotBeforeUpdate
  - ``getSnapshotBeforeUpdate(prevProps, prevState)``
  - ``getSnapshotBeforeUpdate``在最近一次渲染输出到DODM之前调用
  - 能在组件发生DOM更改之前捕获一些信息，例如滚动位置
  - 可以返回任何值，作为参数传递给``componentDidUpdate(prevProps, prevState, snapshot)``

# PropTypes
props类型检查，具体的可以去官网查看[文档](https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper)

# Hook
Hook是一个特殊的函数，他可以让函数组件拥有React的特性。例如``useState``可以让函数组件拥有自己的state。  
``Effect Hook``可以在函数组件中执行副作用操作（数据获取，设置订阅以及⼿动更改 React 组件中的 DOM 都属于副作⽤。）使⽤useEffect完成副作⽤操作。赋值给useEffect的函数会在组件渲染到屏幕之后执⾏。默认情况下，effect 将在每轮渲染结束后执⾏，但你可以选择让它 在只有某些值改变的时候 才执⾏。  
默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，一旦 effect 的依赖发生变化，它就会被重新创建。可以给 useEffect 传递第二个参数，它是 effect 所依赖的值数组，依赖发生改变才会更新。  
通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这⼀点， useEffect
函数需返回⼀个清除函数，以防⽌内存泄漏，清除函数会在组件卸载前执⾏。  
**自定义hook**有时候我们会想要在组件之间重⽤⼀些状态逻辑。⽬前为⽌，有两种主流⽅案来解决这个问题：⾼阶组件和 render props。⾃定义 Hook 可以让你在不增加组件的情况下达到同样的⽬的。  
**⾃定义 Hook 是⼀个函数，其名称以 “use” 开头，函数内部可以调⽤其他的 Hook。**

## useMemo
把创建函数和依赖项数组作为参数传入useMemo，它仅会在某个依赖项改变时才会重新计算，可以类比一下vue里面的计算属性。减少不必要的计算
## useCallback
把内联函数以及依赖项作为参数传入useCallback，它将返回改回调函数的memoized(就是存储了函数调用的结果，再次出现相同的输入的时候返回缓存的结果)，该回调函数仅在某个依赖项改变时才会更新。例如将某个函数传递给了子组件，使用useCallback只有依赖发生改变子组件才会重新渲染。PureComponent这种如果传入的是函数的话是起不到作用的，函数式对象每次比较都会更新。

### Dialog
自定义的弹窗组件