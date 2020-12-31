import React, { useState, useEffect } from "react";
export default function HookPage(props) {
    // 声明⼀个叫 “count” 的 state 变量，初始化为0
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date());
    const name = useInput('mary')
    const age = useInput(18)
    // 与 componentDidMount 和 componentDidUpdate相似
    useEffect(() => {
        // 更新 title
        document.title = `You clicked ${count} times`;
    }, [count]);
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div> 
            <h3>HookPage</h3> 
            <p>{count}</p> 
            <button onClick={() => setCount(count + 1)}>add</button> 
            <p>{date.toLocaleTimeString()}</p>
            <input type="text" {...name} />
            <input type="text" {...age} />
        </div>
    );
}

// 自定义hook
function useInput(inittiaValue){
    const [value,setValue]=useState(inittiaValue)
    function handleChange(e){
        setValue(e.target.value)
    }
    return {
        value,
        'onChange':handleChange
    }
}