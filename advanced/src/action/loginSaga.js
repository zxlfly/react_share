//调用异步操作 call 、fork
import {
  call,
  fork,
  put,
  take,
  takeEvery
  // takeEvery
} from "redux-saga/effects";
import {LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST} from "./const";
import LoginService from "../service/login";
// 状态更新 put
// 监听 take
// worker saga
function* loginHandle(action){
  yield put({type:REQUEST})
  try{
    // 登录
    const res1 = yield call(LoginService.login,action.payload)
    // 获取信息
    const res2 = yield call(LoginService.getMoreUserInfo,res1)
    // 更新状态
    yield put({type:LOGIN_SUCCESS,payload:{...res2}})
  }catch(err){
    yield put({type:LOGIN_FAILURE,payload:err})
  }
}
// watcher saga
function* loginSaga (){
  // yield takeEvery(LOGIN_SAGA,loginHandle)
  while (true) {
    const action = yield take(LOGIN_SAGA);
    // call 阻塞型
    // fork 非阻塞
    yield fork(loginHandle, action);
    // 直接答应 不会延迟
    console.log("action", action); 
  }
}
export default loginSaga