import {Provider} from 'react-redux'
import './App.css';
import ClassComp from './components/ClassComp.jsx'
import FunctionComp from './components/FunctionComp.jsx'
import ReduxPage from './pages/ReduxPage.jsx'
import ReactReduxPage from './pages/ReactReduxPage.jsx'
import store from './store/ReduxStore'
import RouterPage from './pages/RouterPage'
import HookPage from './pages/HookPage'
import UseMemoPage from './pages/UseMemoPage'
import UseCallbackPage from './pages/UseCallbackPage'
function App() {
  return (
    <div className="App">
        <ClassComp></ClassComp>
        <hr/>
        <FunctionComp></FunctionComp>
        <hr/>
        <ReduxPage></ReduxPage>
        <hr/>
        {/* 也可以套在最外层使所有的内部组件都可以访问 */}
        <Provider store={store}>
          <ReactReduxPage></ReactReduxPage>
        </Provider>
        <hr/>
        <RouterPage />
        <hr/>
        <HookPage />
        <hr/>
        <UseMemoPage />
        <hr/>
        <UseCallbackPage />
    </div>
  );
}

export default App;
