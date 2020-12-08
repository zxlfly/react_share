import React from 'react';
import RouterContext from './Context'
function Prompt({when=true,message}) {
    // 基于history block函数
    return (
        <RouterContext.Consumer>
            {
                context=>{
                   if(!when){
                        return null
                   } else{
                       let method = context.history.block
                        //当when变成false的时候LifeCycle卸载，取消订阅block
                        //挂在的时候执行订阅返回取消事件，保存到 LifeCycle上
                        return <LifeCycle 
                                    onMount={self=>{
                                        self.release = method(message)
                                    }} 
                                    onumMount={self=>self.release()}
                               />
                   }
                }
            }
        </RouterContext.Consumer>
    );
}
class LifeCycle extends React.Component {
    componentDidMount(){
        if(this.props.onMount){
            this.props.onMount.call(this, this);
        }
    }
    componentWillUnmount(){
        if(this.props.onumMount){
            this.props.onumMount.call(this, this);
        }
    }
    render() {
        return null;
    }
}
export default Prompt;