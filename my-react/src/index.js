// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './myReact/step1/index';
import ReactDOM from './myReact/step1/react-dom';
import './index.css';
class ClassComponent extends React.Component {
  static defaultProps = {
    color: "pink"
  };
  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p className={this.props.color}>{this.props.name}</p>
      </div>
    );
  }
}
function FunctionComponent(props) {
  return (
    <div className="border">
      FunctionComponent
      <p>{props.name}</p>
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
  </div>
)
ReactDOM.render(jsx, document.getElementById("root"));
