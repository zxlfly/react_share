import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class RouterPage extends Component {
    render() {
        return (
            <div> 
                <h3>RouterPage</h3> 
                <Router> 
                    <Link to="/">⾸⻚</Link> 
                    <Link to="/user">⽤户中⼼</Link>
                    {/* 根路由要添加exact，实现精确匹配 */} 
                <Route
                    exact
                    path="/"
                    component={HomePage}
                //children={() => <div>children</div>}
                //render={() => <div>render</div>}
                />
                <Route path="/user" component={UserPage} />
            </Router>
            </div>
        );
    }
}
class HomePage extends Component {
    render() {
        return (
            <div> <h3>HomePage</h3>
            </div>
        );
    }
}
class UserPage extends Component {
    render() {
        return (
            <div> <h3>UserPage</h3>
            </div>
        );
    }
}