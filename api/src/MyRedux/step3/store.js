import {createStore,applyMiddleware,combineReducers} from './myRedux.js'

// 定义修改规则reducer函数
function countReducer(count = 0 ,action){
    switch(action.type){
        case "ADD":
            return count+1
        case "MINUS":
            return count - action.payload || 1
        default:
            return count
    }
}
function countReducer2(state = {num:0} ,action){
    switch(action.type){
        case "ADD2":
            return {...state,num:state.num+action.payload}
        default:
            return state
    }
}
function isPromise(obj) {
    return !!obj
        && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
        && typeof obj.then === 'function';
  }
function thunk({dispatch,getState}){
    // next是聚合函数，相当于compose中的a
    return next=>action=>{
        if(typeof action ==='function'){
            return action(dispatch,getState)
        }
        return next(action)
    }
}
function promise({dispatch,getState}){
    // next是聚合函数，相当于compose中的a
    return next=>action=>{
        if(isPromise(action)){
            return action.then(dispatch,getState)
        }
        return next(action)
    }
}
function logger({dispatch,getState}){
    return next=>action=>{
        console.log("start:*************************");
        console.log("prev state:"+JSON.stringify(getState()));
        const returnValue = next(action)
        console.log("next state:"+JSON.stringify(getState()));
        console.log("end:*************************");
        return returnValue
    }
}
const store = createStore(
    combineReducers({
        count:countReducer,
        count2:countReducer2
    }),
    applyMiddleware(promise,thunk,logger)
)

export default store