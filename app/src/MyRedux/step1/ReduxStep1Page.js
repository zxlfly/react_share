import React, {Component} from "react";
import store from "./store";

export default class ReduxPage extends Component {
  componentDidMount() {
    // 订阅更新，需要组件做重新渲染
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    // 取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    // 修改状态
    store.dispatch({type: "ADD"});
  };



  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        {/* 获取状态值 */}
       
        <p>{store.getState()}</p>

        <button onClick={this.add}>add</button>
       
      </div>
    );
  }
}
