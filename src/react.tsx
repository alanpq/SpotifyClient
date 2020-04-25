// tslint:disable: max-classes-per-file
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { createWindow } from "./login";
import { User } from "./net/user";

import "./style.sass";

interface IProfileProps {
  user?: User;
}

let user: User;

class Profile extends React.Component<IProfileProps> {
  public render() {
    if (user) {
      return (
        <a className="profile">
          <img src={user.images[0].url}></img>
          <span>{user.displayName}</span>
        </a>
      );
    } else {
      return (
        <a onClick={() => {createWindow((usr: User) => {user = usr; draw(); }); } }>
          Log in
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

const draw = () => {
  ReactDOM.render(<Index />, document.getElementById("app"));
};

draw();
