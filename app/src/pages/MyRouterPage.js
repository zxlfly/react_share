import React, { useRef, useEffect, createRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
  withRouter,
  Prompt,
} from "../MyRouter/index";

import HomePage from "./HomePage";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import _404Page from "./_404Page";
import RouteComponentPage from "./RouteComponentPage";
import WelcomePage from "./WelcomePage";

const homeRef = createRef();

export default function RouterPage(props) {


  return (
    <div className="app">
      <Router>
      <Link to="/" ref={homeRef}>
            首页
        </Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/123">商品</Link>
        <Switch>
          <Route
            exact
            path="/"
            // children={children}
            component={HomePage}
          // render={render}
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/welcome" component={WelcomePage} />
          {/* <Route path="/product/:id" component={Product} /> */}

          <Route path="/product/:id" render={() => <Product />} />

          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

function children(props) {
  return <div>children</div>;
}

function render(props) {
  return <div>render</div>;
}

// function Product(props) {
//   // const {match} = props;
//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const _params = useParams();

//   console.log("Product props", match, history, location, _params);
//   const {url, params} = match;

//   return (
//     <div>
//       <h4>Product</h4>
//       <p>id: {params.id}</p>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

function Detail(props) {
  console.log("Detail props", props);
  return <div>Detail</div>;
}

@withRouter
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirm: true };
  }
  render() {
    console.log('this.props', this.props);
    const { params } = this.props.match;
    const { id } = params;
    return (
      <div>
        Product:{id}
        <Prompt
          when={this.state.confirm}
          message="Are you sure you want to leave?"
          // message={location => {
          //   return "Are you sure you want to leave-fun";
          // }}
        />
      </div>
    );
  }
}
