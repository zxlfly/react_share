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
3. **不要直接谢盖state**
4. 出于性能考虑react可能会把多个setState调用合并成一个，所以state的更新可能是异步的
   1. 如果需要获取最新的值，可以回调中获取
5. 使用定时器或者在原生事件中修改状态是同步的，不会批量处理，只有在react的合成事件中才会批量处理
6. 同步异步指的的是状态的更新是否批量处理
7. 如果多次修改同一个状态，state的更新会被合并成最后一次修改的值
   1. 如果需要链式修改而不是合并
   2. setState可以直接传入修改的函数，state将作为参数在内部可以获取最新状态进行操作

# 组建复合
可以理解成布局，讲通用的页面布局整合在一起，通过传入的props控制渲染结果，可以自定义外观和行为。对于组件之间公用的非逻辑UI，将他们抽离整合可以有效的复用，易于修改调试