import './App.css';
import ClassComp from './components/ClassComp.jsx'
import FunctionComp from './components/FunctionComp.jsx'

function App() {
  return (
    <div className="App">
        <ClassComp></ClassComp>
        <hr/>
        <FunctionComp></FunctionComp>
        <hr/>
    </div>
  );
}

export default App;
