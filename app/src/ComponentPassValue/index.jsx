/**
 * 目标
 *  掌握context跨层级通信
 *  掌握高阶组件
 *  了解组件化概念，能自行设计实现组件
 * 组件化优点
 *  增强代码重用性，提高开发效率
 *  简化调试步骤，提升整个项目的可维护性
 *  便于协同开发
 *  注意降低耦合
 */
import React, { Component } from 'react';
import { ThemeContext, UserContext } from "./context/index"
import ContextTypePage from "./pages/ContextTypePage";
import UseContextPage from "./pages/UseContextPage";
import ConsumerPage from "./pages/ConsumerPage";
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: {
                themeColor: "red"
            },
            user: {
                name: "xiaoming"
            }
        };
    }
    changeColor = () => {
        const { themeColor } = this.state.theme;
        this.setState({
            theme: {
                themeColor: themeColor === "red" ? "green" : "red"
            }
        });
    }
    render() {
        const { theme, user } = this.state;
        return (
            <div>
                <h3>ContextPage</h3>
                <button onClick={this.changeColor}>change color</button>
                <ThemeContext.Provider value={theme}>
                    <ContextTypePage />
                    <UserContext.Provider value={user}>
                        <UseContextPage />
                        <ConsumerPage />
                    </UserContext.Provider>
                </ThemeContext.Provider>
                <ContextTypePage />
            </div>
        );
    }
}

export default index;