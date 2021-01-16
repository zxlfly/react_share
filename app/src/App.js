import React from 'react';
// 组件 context demo
// import ComponentPassValue from './ComponentPassValue/index'
// 高阶组件
// import HocPage from './Hoc/index'
//自定义组件
import MyRCFieldForm from './pages/MyRCFieldForm'
// import ReduxPage from './redux/step1/ReduxStep1Page'
// import ReduxPage from './redux/step2/ReduxStep2Page'
// import ReduxPage from './redux/step3/ReduxStep3Page'
// import HooksApiPage from './pages/HooksApiPage'
// import ReactReduxPage from './pages/ReactReduxPage'
// import MyReactReduxHookPage from './pages/MyReactReduxHookPage'
// import MyReactReduxPage from './pages/MyReactReduxPage'
// import RouterPage from './pages/RouterPage'
// import MyRouterPage from './pages/MyRouterPage'

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <ComponentPassValue />
      <HocPage /> */}
      <MyRCFieldForm />
      {/* <ReduxPage /> */}
      {/* <HooksApiPage /> */}
      {/* <ReactReduxPage /> */}
      {/* <MyReactReduxPage /> */}
      {/* <MyReactReduxHookPage /> */}
      {/* <RouterPage /> */}
      {/* <MyRouterPage /> */}
    </div>
  );
}

export default App;
