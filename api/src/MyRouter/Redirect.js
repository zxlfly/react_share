import React, {Component} from "react";
import RouterContext from "./Context";
class Redirect extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context=>{
                        const {history} = context
                        const {to,push=false}=this.props
                        /**
                         * 根据push判断是替换还是推入
                         */
                        return <LifeCycle
                                    onMount={()=>{
                                        push?history.push(to):history.replace(to)
                                    }}
                               />
                    }
                }
            </RouterContext.Consumer>
        );
    }
}

export default Redirect;

class LifeCycle extends Component {
    componentDidMount(){
        if(this.props.onMount){
            // 为了将LifeCycle的this传到onMount里
            this.props.onMount.call(this, this);
        }
    }
    render() {
        return null;
    }
}
