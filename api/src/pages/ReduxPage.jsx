import React, { Component } from "react";
import store from "../store/ReduxStore";
export default class ReduxPage extends Component {
    componentDidMount() {
        // 订阅更新，数据修改之后就会触发
        store.subscribe(() => {
            console.log("subscribe");
            this.forceUpdate();
            //this.setState({});
        });
    }
    add = () => {
        // dispatch 提交更新
        store.dispatch({ type: "ADD" });
    };
    minus = () => {
        store.dispatch({ type: "MINUS" });
    };
    render() {
        console.log("store", store);
        return (
            <div> 
                <h3>ReduxPage</h3> 
                {/*  getState 获取状态值*/}
                <p>{store.getState()}</p> 
                <button onClick={this.add}>add</button> 
                <button onClick={this.minus}>minus</button>
            </div>
        );
    }
}