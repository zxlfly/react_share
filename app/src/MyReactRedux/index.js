import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { useCallback } from 'react'
import { useReducer } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'

function bindActionCreators(creators,dispatch){
    let obj={}
    for(let key in creators){
        obj[key]=bindActionCreator(creators[key],dispatch)
    }
    return obj
}
function bindActionCreator(creator,dispatch){
    // mapDispatchToProps 使用函数的方式时 处理映射的事件
    // 因为写的事件和传入对象的时候一样，只是返回了action，在函数的写法下不会调用dispatch
    // 可以手动加上，但是多了就不方便
    return (...arg)=>dispatch(creator(...arg))
}

// 实现Provider
// 就是使用的react的context
const Context =React.createContext()
function Provider({children,store}){
    return <Context.Provider value={store}>
        {children}
    </Context.Provider>
}
// 实现connect
// 是个hoc，接受组件作为参数，然后返回一个新的组件，新的组件可以选择映射state和dispatch
// function connect(
//     mapStateToProps=state=>state,
//     mapDispatchToProps
// ){
//     const store = useContext(Context)
//     const {getState,dispatch,subscribe}=store
//     const stateProps = mapDispatchToProps(getState())
//     let dispatchProps={}
//     if(typeof mapDispatchToProps ==='function'){
//         dispatchProps = mapDispatchToProps(dispatch)
//     }
//     return WrappedComponent => props =>{
//         return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
//     }
// }
const connect =(
    mapStateToProps=state=>state,
    mapDispatchToProps
)=>WrappedComponent=>props=>{
    const store = useContext(Context)
    const {getState,dispatch,subscribe}=store
    // 获取状态
    const stateProps = mapStateToProps(getState())
    // 处理dispatch
    // 可能是undefined、function、object
    let dispatchProps={}
    if(typeof mapDispatchToProps ==='function'){
        dispatchProps = mapDispatchToProps(dispatch)
    }else if(typeof mapDispatchToProps ==='object'){
        dispatchProps=bindActionCreators(mapDispatchToProps,dispatch)
    }else {
        dispatchProps=dispatch
    }
    
    const forceUpdate = useForceUpdate()
    useLayoutEffect(function(){
        const unsubscribe= subscribe(()=>forceUpdate())
        return ()=>{
            if(unsubscribe){
                // 卸载
                unsubscribe()
            }
        }
    },[store])
    // 返回处理之后的组件
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}
// 复用组件更新
function useForceUpdate(){
    const [state,setState]=useState(0)
    const update=useCallback(()=>{
        setState(prev=>prev+1)
    })
    return update
}

// hooks使用
function useSelector(selector){
    const store = useStore()
    const {getState}=store
    const selectedState = selector(getState())
    return selectedState
}
function useDispatch(){
    const store = useStore()
    return store.dispatch
    
}
function useStore(){
    const store = useContext(Context)
    const forceUpdate = useForceUpdate()
    useLayoutEffect(function(){
        const unsubscribe= store.subscribe(()=>forceUpdate())
        return ()=>{
            if(unsubscribe){
                // 卸载
                unsubscribe()
            }
        }
    },[store])
    return store
}
export {
    Provider,
    connect,
    useSelector,
    useDispatch,
    bindActionCreators
}