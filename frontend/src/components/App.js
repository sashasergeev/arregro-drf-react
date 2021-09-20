import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Header from "./Layout/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Coins from "./Coins";
import Tags from "./Tags";
import Posts from "./Posts";
import UserFeed from "./UserFeed";

import axios from "axios";

export class App extends Component {
  state = {
    token: localStorage.getItem("token") || null,
    isAuth: false,
    username: null,
  };

  componentDidMount() {
    if (this.state.token) {
      this.getUser(this.state.token);
    }
  }
  getUser(token) {
    let headers = { Authorization: `Token ${token}` };
    axios.get("api/auth/user", { headers: headers }).then((res) => {
      localStorage.setItem("token", token);
      this.setState({
        isAuth: true,
        username: res.data.username,
        token: token,
      });
    });
  }

  handleRegistration(token, username) {
    this.setState({
      token: token,
      isAuth: true,
      username: username,
    });
  }
  handleLogout() {
    axios
      .post("api/auth/logout", null, {
        headers: { Authorization: `Token ${this.state.token}` },
      })
      .then((res) => {
        localStorage.removeItem("token");
        this.setState({
          token: null,
          isAuth: false,
          username: null,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { username, isAuth, token } = this.state;
    return (
      <Fragment>
        <Router>
          <Header
            user={username}
            isAuth={isAuth}
            handleLogout={this.handleLogout.bind(this)}
          />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route
                path="/coins"
                component={(props) => (
                  <Coins {...props} isAuth={isAuth} token={token} />
                )}
              />
              <Route path="/tags" component={Tags} />

              {/* AUTH AND FEED */}
              <Route
                path="/login"
                component={() => (
                  <Login
                    isAuth={isAuth}
                    token={token}
                    handleLogin={this.getUser.bind(this)}
                  />
                )}
              />
              <Route
                path="/register"
                component={() => (
                  <Register
                    isAuth={isAuth}
                    handleRegistration={this.handleRegistration.bind(this)}
                  />
                )}
              />
              <Route
                path="/feed"
                component={() => <UserFeed isAuth={isAuth} token={token} />}
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById("app"));

// TODO
// +++ make follow unfollow functionality (upload state for detail page and make Coins state change when i follow on detail page)
// search functionality
// +++ modal functionality

// django filter (to filter by tag on main page)
// maybe make some kind of blog
// +++ make background tasks for updating price
//    make it show new prices on front
// +++ go to mysql db
// refactor components
