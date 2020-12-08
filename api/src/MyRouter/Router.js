import React, { Component } from 'react';
import RouterContext from './Context'
class Router extends Component {
    // 默认的match，如果Route没有传path就用这个
    static computeRootMatch(pathname) {
        return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
    }
    constructor(props){
        super(props)
        this.state={
            location:props.history.location
        }
        // 监听location的变化刷新组件
        props.history.listen(location=>{
            this.setState({
                location
            })
        })
    }
    render() {
        return (
            <RouterContext.Provider 
                value={{
                    history:this.props.history,
                    location:this.state.location,
                    match:Router.computeRootMatch(this.state.location.pathname)
                }} className="Provider"
            >
                {this.props.children}
            </RouterContext.Provider>
        );
    }
}

export default Router;