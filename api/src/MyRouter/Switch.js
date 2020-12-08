import React from 'react';
import { matchPath } from 'react-router-dom';
import RouterContext from './Context'
class Switch extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context=>{
                        let match//判断是否匹配
                        let element//匹配就赋值
                        // 遍历子节点
                        React.Children.forEach(this.props.children,child=>{
                            if(match==null&&React.isValidElement(child)){
                                element=child
                                match=child.props.path?matchPath(context.location.pathname,child.props):context.match
                            }
                        })
                        // computedMatch计算之后的match，在Route的条件判断中，优先级最高，实现独占路由
                        return match ? React.cloneElement(element,{computedMatch:match}):null
                    }
                }
            </RouterContext.Consumer>
        );
    }
}
export default Switch;
