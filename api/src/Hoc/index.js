import React, { Component } from 'react';
/**
 * 高阶组件
 * 为了提高组件的复用率，可测试性，就要保证组件功能的单一性；
 * 但是如果要满足复杂需求就要扩展功能单一的组件
 * HOC就是来解决这个问题的
 * 
 * 用法就是一个hoc函数接受一个组件返回一个包装处理过的组件
 */
const foo = Cmp => props => {
    return (
        <div className="border">
            <Cmp {...props} />
        </div>
    );
};
function Child(props) {
    return <div> Child {props.name}</div>;
}
/**
 * 支持链式调用
 * 可以使用装饰器
 * 装饰器器只能⽤用在class上
 * 执⾏行行顺序从下往上
 * @foo2
 * @foo
 * @foo
 */
const Foo = foo(Child);
export default class index extends Component {
    render() {
        return (
            <div>
                <h3>HocPage</h3>
                <Foo name="msg" />
            </div>
        );
    }
}