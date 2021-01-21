import React, { Component } from 'react';
import {connect} from "dva"
class UserPage extends Component {
    render() {
        return (
            <div>
                UserPage
            </div>
        );
    }
}

export default connect(
    (state)=> {
        console.log("state",state);
        return {user:state.user}
    },
)(UserPage);