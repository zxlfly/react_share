import createStore from './myRedux.js'

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

const store = createStore(countReducer)

export default store