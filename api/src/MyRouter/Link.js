import React, { forwardRef } from 'react';
import { useContext } from 'react';
import RouterContext from './Context'
//本质上就是一个a标签，禁用了默认事件
// 通过history api跳转路由
// 所以页面不会刷新
const Link = forwardRef(({to,children,...restProps},ref)=>{
    const context = useContext(RouterContext)
    const handleChick = e=>{
        e.preventDefault()
        context.history.push(to)
    }
    return <a href={to} ref={ref} onClick={handleChick}>{children}</a>
})

export default Link;