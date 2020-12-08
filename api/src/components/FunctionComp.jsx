import React, { useState, useEffect } from "react";
export default function FunctionComp(props) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {//副作⽤
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);//组件卸载的时候执⾏
    }, []);
    return (
        <div> <h3>FunctionComp</h3> <p>{date.toLocaleTimeString()}</p>
        </div>
    );
}