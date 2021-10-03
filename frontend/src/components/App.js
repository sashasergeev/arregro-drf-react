import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./header/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Coins from "./coins/Coins";
import Tags from "./tags/Tags";
import Posts from "./posts/Posts";
import UserFeed from "./posts/UserFeed";

import axios from "axios";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

export class App extends Component {
  state = {
    token: localStorage.getItem("token") || null,
    isAuth: false,
    username: "",
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

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
});

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("app")
);
// TODO
// +++ make follow unfollow functionality (upload state for detail page and make Coins state change when i follow on detail page)
// +++ search functionality
// +++ modal functionality

// +++ django filter (to filter by tag on main page)
// maybe make some kind of blog
// +++ make background tasks for updating price
//    make it show new prices on front
// +++ go to mysql db
// +++ refactor components
// +++ proptypes
