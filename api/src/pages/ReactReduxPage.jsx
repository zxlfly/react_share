import React, { Component } from "react";
import { connect } from "react-redux";
class ReactReduxPage extends Component {
    render() {
        const { num, add, minus } = this.props;
        return (
            <div> 
                <h1>ReactReduxPage</h1> 
                <p>{num}</p> 
                <button onClick={add}>add</button> 
                <button onClick={minus}>minus</button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        num: state,
    };
};
const mapDispatchToProps = {
    add: () => {
        return { type: "ADD" };
    },
    minus: () => {
        return { type: "MINUS" };
    }
};
export default connect(
    mapStateToProps, //状态映射 mapStateToProps
    mapDispatchToProps, //派发事件映射
)(ReactReduxPage);