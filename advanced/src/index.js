import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./routes/index"
import {Provider} from "react-redux"
import store from "./store/index"
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider> 
    ,
  document.getElementById('root')
);