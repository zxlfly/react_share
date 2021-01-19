import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import _404Page from "../pages/_404Page";
import PrivateRoute from "./PrivateRoute";
export const routes = [
    {
      path: "/",
      exact: true,
      component: HomePage
    },
    {
      path: "/user",
      component: UserPage,
      auth: PrivateRoute
    },
    {
      path: "/login",
      component: LoginPage
    },
    {
      component: _404Page
    }
];
function index(props) {
    return (
        <Router>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to="/login">登录</Link>
            {routes.map(Route_ =>
                Route_.auth ? (
                    <Route_.auth key={Route_.path + "route"} {...Route_} />
                ) : (
                    <Route key={Route_.path + "route"} {...Route_} />
                )
            )}
            {/* <Route exact path="/" component={HomePage} /> */}
            {/* <Route path="/user" component={UserPage} /> */}
            {/* <PrivateRoute path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route component={_404Page} /> */}
        </Router>
    );
}

export default index;