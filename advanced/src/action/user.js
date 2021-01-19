// 业务逻辑代码
import {
    REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGIN_SAGA
} from "./const"
import LoginService from "../service/login"
// 同步
// export const login =userInfo=>({type:LOGIN_SUCCESS,payload:userInfo}) 
// 异步thunk版本 简单粗暴，但是容易出现嵌套的问题
// export const login =userInfo=>dispatch=>{
//     dispatch({type: REQUEST})
//     LoginService.login(userInfo).then(
//         res=>{
//             console.log(res);
//             // dispatch({type:LOGIN_SUCCESS,payload:res})
//             getMoreUserInfo(res, dispatch);
//         },
//         err=>{
//             dispatch({type:LOGIN_FAILURE,payload:err})
//         }
//     )
//     // .catch((err)=>{
//     //     dispatch({type:LOGIN_FAILURE,payload:err})
//     // })
//     // dispatch({type:LOGIN_SUCCESS,payload:userInfo})
// } 
const  getMoreUserInfo = (userInfo, dispatch) => {
    return LoginService.getMoreUserInfo(userInfo).then(
      res => {
        dispatch({type: LOGIN_SUCCESS, payload: res});
      },
      err => {
        dispatch({type: LOGIN_FAILURE, payload: err});
      }
    );
};
const loginPromise = (userInfo, dispatch) => {
    return LoginService.login(userInfo).then(
      res => {
        return res;
      },
      err => {
        dispatch({type: LOGIN_FAILURE, payload: err});
      }
    );
};
// async await 方式
// export const login = userInfo => {
//   return async function(dispatch) {
//     dispatch({type: REQUEST});
//     let res1 = await loginPromise(userInfo, dispatch);
//     console.log("res1", res1);
//     if (res1) {
//       getMoreUserInfo(res1, dispatch);
//     }
//   };
// };

// redux-saga
export const login = userInfo =>({type:LOGIN_SAGA,payload:userInfo})