import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
// import UserPage from './routes/UserPage';
import {UserPageDynamic} from "./dynamic/UserPageDynamic"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products"  component={Products} />
        <Route path="/user"  component={UserPageDynamic} />
        {/* <Route path="/user" exact component={UserPage} /> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
