import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
// 路由守卫
// 根据是否登录判断是否可以去user页面
function PrivateRoute({isLogin,component: Component,...rest}) {
    return (
        <Route 
            {...rest} 
            render={props=>
                isLogin?
                (<Component />): 
                (<Redirect 
                    to={{
                        pathname: "/login",
                        state: {from: props.location.pathname}
                    }}
                />)
            }
        />
    );
}

export default connect(
    ({user})=>({
        'isLogin':user.isLogin
    })
)(PrivateRoute) ;