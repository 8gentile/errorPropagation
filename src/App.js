import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./logo.svg";
import "./App.css";

let HOC = InnerComponent =>
  class extends Component {
    render() {
      return (
        <div className="debug">
          <InnerComponent />
        </div>
      );
    }
  };

class GrandchildComponent extends Component {
  onChange = () => {
    // async error test
    // setTimeout(() => {
    //   throw new Error("Simulated Error");
    // }, 2000);

    // sync error test
    throw new Error("Simulated Error");
  };

  render() {
    return <input type="text" onChange={this.onChange} />;
  }
}

class ChildComponent extends Component {
  render() {
    return (
      <div>
        <GrandchildComponent />
        <button
          onClick={() => {
            throw new Error("ChildComponent Button Error");
          }}
        >
          Error
        </button>
      </div>
    );
  }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    debugger;
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return children;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Propagating Error"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <h1>{this.state.name}</h1>
          <p>Bubble up to me! :)</p>
          <ErrorBoundary>
            <ChildComponent />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
