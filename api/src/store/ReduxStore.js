import { createStore } from 'redux'
//  reducer 初始化、修改状态函数
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1
        case 'MINUS':
            return state - 1
        default:
            return state
    }
}
// createStore 创建store
const store = createStore(counterReducer)
export default store