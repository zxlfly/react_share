import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// connect是React组件与store state的桥梁
@connect(
  // mapStateToProps 把state映射到props上
  // ({count}) => ({count}),
  state => {
    return {count: state.count};
  }
  // mapDispatchToProps object|function 把dispatch映射到props上。不写默认会映射dispatch
  //这种对象的写法只有写进去了的方法，不会有dispatch
  // {
  //   add: () => ({type: "ADD"}),
  //   minus: () => ({type: "MINUS"})
  // }
  // 这样函数的写法会有dispatch
  // dispatch => {
  //   let creators = {
  //     add: () => ({type: "ADD"}),
  //     minus: () => ({type: "MINUS"})
  //   };
  //    bindActionCreators可以自动套上dispatch，如果不用，需要加上dispatch，不能直接返回action
  // 这个方法来自redux
  //   creators = bindActionCreators(creators, dispatch);

  //   return {
  //     dispatch,
  //     ...creators
  //   };
  // }
)
class ReactReduxPage extends Component {
  render() {
    console.log("props", this.props); //sy-log
    const {count, dispatch, add, minus} = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({type: "ADD", payload: 100})}>
          dispatch add
        </button>
        <button onClick={add}> add</button>
        <button onClick={minus}> minus</button>
      </div>
    );
  }
}
export default ReactReduxPage;
