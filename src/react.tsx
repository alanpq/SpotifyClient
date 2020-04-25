// tslint:disable: max-classes-per-file
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

interface IProfileProps {
  user?: object;
}

class Profile extends React.Component<IProfileProps> {
  public render() {
    if(this.props.user) {
      return (
        <a>
          <img src="https://via.placeholder.com/32"></img>
          <span>Anonymous</span>
        </a>
      );
    } else {
      return (
        <a>
          <img src="https://via.placeholder.com/32"></img>
          <span>Anonymous</span>
        </a>
      );
    }
  }
}

class Nav extends React.Component {
  public render() {
    return (
      <nav>
        <Profile />
      </nav>
    );
  }
}

class Header extends React.Component {
  public render() {
    return (
      <header>
        <Nav/>
      </header>
    );
  }
}

class Index extends React.Component {
    public render() {
      return (
        <main>
          <Header/>
          <Router/>
        </main>
      );
    }
}

ReactDOM.render(<Index />, document.getElementById("app"));
