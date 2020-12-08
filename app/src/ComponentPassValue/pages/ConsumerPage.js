import React, { Component } from "react";
import { ThemeContext, UserContext } from "../context";
export default class ConsumerPage extends Component {
    /**
     * Consumer
     * 这里react组件也可以订阅到context的变更，
     * 能在函数式组件中完成订阅context
     * 这个函数式组件接受当前的context值，返回一个react节点
     * 如果没有对应的provider，value的参数等同于传递给creatContext()
     * 的defaultValue
     */
    render() {
        return (
            <div className="border">
                <ThemeContext.Consumer>
                    {themeContext => (
                        <>
                            <h3 className={themeContext.themeColor}>ConsumerPage</h3>
                            <UserContext.Consumer>
                                {userContext => <HandleUserContext {...userContext} />}
                            </UserContext.Consumer>
                        </>
                    )}
                </ThemeContext.Consumer>
            </div>
        );
    }
}
function HandleUserContext(userCtx) {
    return <div>{userCtx.name}</div>;
}