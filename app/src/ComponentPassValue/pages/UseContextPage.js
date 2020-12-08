import React, {  useContext } from "react";
import { ThemeContext, UserContext } from "../context";
export default function UseContextPage(props) {
    /**
     * useContext
     * 接受一个context对象并返回改context的当前值。
     * 当前的context的值由上层组件中最近的value提供
     * 只能用在函数组件
     */
    const themeContext = useContext(ThemeContext);
    const { themeColor } = themeContext;
    const userContext = useContext(UserContext);
    return (
        <div className="border">
            <h3 className={themeColor}>UseContextPage</h3>
            <p>{userContext.name}</p>
        </div>
    );
}