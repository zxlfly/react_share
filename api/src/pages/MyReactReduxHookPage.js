import React, {useCallback} from "react";
import {useSelector, useDispatch} from "../MyReactRedux";

export default function MyReactReduxHookPage(props) {
  // 获取state
  const count = useSelector(({count}) => count);
  // 获取dispatch方法
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({type: "ADD"});
  }, []);

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  );
}
