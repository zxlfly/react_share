/**
 * 实现createStore，定义一下几个方法，并返回
 * getState-->获取store state
 * dispatch-->修改状态
 * subscribe-->通知更新
 */
function createStore(reducer, enhancer) {
    if (enhancer) {
        // 返回中间件处理过之后的
        return enhancer(createStore)(reducer)
    }
    // 状态
    let currentState
    // 更新事件
    let currentListeners = []
    function getState() {
        return currentState
    }
    function dispatch(action) {
        // 修改
        currentState = reducer(currentState, action)
        // 通知更新
        currentListeners.forEach(listener => listener())
    }
    function subscribe(listener) {
        currentListeners.push(listener)
        // 返回取消订阅的方法
        return ()=>{
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index,1)
        }
    }
    dispatch({ type: '__$$init' })
    return {
        getState,
        dispatch,
        subscribe
    }
}

function compose(...funs) {
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
        return funs[0];
    }
    return funs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch =store.dispatch
        const middlewareAPI = {
            getState: store.getState,
            // 写成函数，避免不同中间件之间相互干扰
            // dispatch只和当前作用域相关，使用的是依次增强过的
            dispatch: (action,...args) => dispatch(action,...args)
        }

        const chain = middlewares.map(middleware => middleware(middlewareAPI));
        // 增强dispatch
        dispatch = compose(...chain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export {
    createStore,
    applyMiddleware
}