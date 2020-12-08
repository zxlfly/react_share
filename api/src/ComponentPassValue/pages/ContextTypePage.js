import React, { Component } from "react";
import { ThemeContext } from "../context/index";
export default class ContextTypePage extends Component {
    /**
     * 挂载在class上的contxtType属性会被重赋值为一个由
     * React.createContext() 创建的 Context对象。
     * 这样就能使用this.context来消费最近的Context上的值
     * 可以再任何生命周期中访问到它包括render函数中
     * 这只能订阅单一的Context不适用于多个
     * 
     */
    static contextType = ThemeContext;
    render() {
        const { themeColor } = this.context;
        console.log(themeColor);
        return (
            <div className="border">
                <h3 className={themeColor}>ContextTypePage</h3>
            </div>
        );
    }
}