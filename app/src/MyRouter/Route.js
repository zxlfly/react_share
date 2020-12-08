import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RouterContext from './Context'
import matchPath from "./matchPath";
class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 通过location的变化判断时候显示组件
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        const { path, children, component, render,computedMatch } = this.props
                        const { location } = context
                        // 判断是否匹配，没传path就用默认的match
                        // 如果computedMatch存在就使用，优先级最高，由switch传入
                        const match = computedMatch?computedMatch : path ? matchPath(location.pathname, this.props) : context.match
                        // 渲染的子组件也希望能监听location，将路由属性传递下去
                        const props = {
                            ...context,
                            location,
                            match
                        };
                        // children, component, render互斥，渲染其中之一
                        return <RouterContext.Provider value={props}>
                            {match
                                ? children
                                    ? typeof children === "function"
                                        ? children(props)
                                        : children
                                    : component
                                        ? React.createElement(component, props)
                                        : render
                                            ? render(props)
                                            : null
                                : typeof children === "function"
                                    ? children(props)
                                    : null}
                        </RouterContext.Provider>
                    }
                }
            </RouterContext.Consumer>
        )
    }
}

Route.propTypes = {};

export default Route;
