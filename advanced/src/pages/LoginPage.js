import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {login} from "../action/user"
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      name:''
    }
  }
  
  render() {
    const {isLogin,location,login,loading,err} = this.props
    const {from="/"} = location.state || {}
    if(isLogin){
      return <Redirect to={from} />
    }
    const {name} = this.state
    return (
      <div>
        LoginPage
        <input type="text" value={name} onChange={e=>this.setState({name:e.target.value})} />
        <p style={{color:'red'}}>{err.msg}</p>
        <button onClick={()=>login({name})}>{loading?"loading...":"login"}</button>
      </div>
    );
  }
}

export default connect(
  ({user})=>({
    'isLogin':user.isLogin,
    "loading":user.loading,
    "err":user.err
  }),
  {
    'login':login
  }
)(LoginPage);