import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserPage extends Component {
  render() {
    const {userInfo} = this.props;
    return (
      <div>
          <h3>UserPage</h3>
          <p>id: {userInfo.id}</p>
          <p>姓名：{userInfo.name}</p>
          <p>score: {userInfo.score}</p>
      </div>
    );
  }
}

export default connect(
  ({user}) => ({"userInfo":user.userInfo})
)(UserPage);