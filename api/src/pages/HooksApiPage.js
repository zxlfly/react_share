import React, { useReducer,useEffect,useLayoutEffect } from 'react';
// 定义修改规则reducer函数
function countReducer(count = 0, action) {
    switch (action.type) {
        case "ADD":
            return count + 1
        case "MINUS":
            return count - action.payload || 1
        default:
            return count
    }
}
// 初始化值函数
function init(state){
    return state-0
}
export default function UseReducerPage() {
    //useState 的替代⽅方案
    const [state, dispatch] = useReducer(countReducer, '0',
    init)
    //该 Hook 接收⼀一个包含命令式、且可能有副作⽤用代码的函数
    //使⽤用  useEffect 完成副作⽤用操作
    //默认情况下，effect 将在每轮渲染结束后执⾏，但你可以选择让它 在只有某些值改变的时候 才执⾏。
    useEffect(function(){
        console.log('state--:',state);
    },[state])
    //其函数签名与useEffect相同，区别在于它会在所有的dom变更后同步的调用。可以使用它来读取dom布局并同步触发重新渲染。在浏览器执行绘制之前，将被同步刷新。可能引起阻塞
    useLayoutEffect(function(){
        console.log('state==:',state);
    },[state])
    return (
        <div>
            <h1>HooKsPage-useReducer</h1>
            <p>{state}</p>
            <button onClick={() => dispatch({ type: "ADD" })}>add</button>
        </div>
    );
};