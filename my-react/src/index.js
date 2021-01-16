// import React from 'react';
// import ReactDOM from 'react-dom';
// import React from './myReact/step1/index';
// import ReactDOM from './myReact/step1/react-dom';
// import React from './myReact/step2/index';
// import ReactDOM from './myReact/step2/react-dom';
import React from './myReact/step3/index';
import ReactDOM,{useState} from './myReact/step3/react-dom';
import './index.css';
class ClassComponent extends React.Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p className={this.props.color}>color</p>
      </div>
    );
  }
}
function FunctionComponent(props) {
  const [count,setCount] = useState(0)
  return (
    <div className="border">
      FunctionComponent
      <p>{props.name}</p>
      <div>{count}</div>
      {/* 需要处理事件 */}
      <button onClick={()=>setCount(count+1)}>add</button>
    </div>
  );
}
const jsx = (
  <div>
    <div>
      <p>手写react</p>
    </div>
    <FunctionComponent />
    <ClassComponent />
    {/* <>
    <p>Fragment</p>
    </> */}
  </div>
)
ReactDOM.render(jsx, document.getElementById("root"));
