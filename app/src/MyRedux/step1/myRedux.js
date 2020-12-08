/**
 * 实现createStore，定义一下几个方法，并返回
 * getState-->获取store state
 * dispatch-->修改状态
 * subscribe-->通知更新
 */
export default function createStore(reducer){
    // 状态
    let currentState
    // 更新事件
    let currentListeners = []
    function getState(){
        return currentState
    }
    function dispatch(action){
        // 修改
        currentState = reducer(currentState,action)
        // 通知更新
        currentListeners.forEach(listener=>listener())
        
    }
    function subscribe(listener){
        currentListeners.push(listener)
        // 返回取消订阅的方法
        return ()=>{
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index,1)
        }
    }
    // 初始化
    dispatch({type:'__$$init'})
    return {
        getState,
        dispatch,
        subscribe
    }
}