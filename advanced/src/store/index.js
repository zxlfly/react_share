import {loginReducer} from "./loginReducer"
import {createStore,combineReducers,applyMiddleware} from "redux"
// import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import loginSaga from "../action/loginSaga"
const sagaMiddLeware = createSagaMiddleware()
const store =createStore(combineReducers({
    user:loginReducer
}),applyMiddleware(sagaMiddLeware))
sagaMiddLeware.run(loginSaga)
export default store