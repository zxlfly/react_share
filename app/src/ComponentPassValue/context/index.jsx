import React from 'react';
/**
 * React.createContext创建一个Context对象
 * 当react渲染一个订阅Context对象的组件，
 * 这个组件会从组件树中离自身最近的那个匹配到的Provider中读取当前的Context的值
 * 言外之意可以嵌套，就进取值（即里层可以覆盖外层的）
 * 
 * Context.Provider
 * 这个就是传递属性的api，接受一个value属性，即传递给消费组件的值，
 * 允许消费组件订阅context的变化
 * Provider可以包含多个消费组件，可以嵌套（有相同属性，里层覆盖外层），
 * value属性发生变化时，内部的所有消费组件都会重新渲染。
 * provider及其内部consumer组件都不受制于shouldComponentUpdate函数
 * 因此当consumer组件在其祖先组件退出更新的情况下也能更新
 * 
 * 更新是通过比较value是否相等，不相等更新，此时如果value对应的值是一个对象，
 * 且没有存在组件的state中，那每次的比较结果都会是false
 * 导致不必要的更新
 * 
 * 
 * 接收方法有三种
 * Class.contextType（只能用在类组件，只能订阅一个context）
 * Context.Consumer（没有明显限制，相对的写起来有点麻烦）
 * useContext（只能用在函数组件或者自定义hook）
 */
export const ThemeContext = React.createContext({themeColor: "pink"});
export const UserContext = React.createContext();

/**
 * 使用步骤
 * 1.创建一个context对象
 * 2.使用这个context对象的provider传递
 * 3.这个provider的子组件接受value：上面提到的三种方法
 */