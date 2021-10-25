import React, { useEffect } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useMutation } from "react-query";

import Header from "./header/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Coins from "./coins/Coins";
import Tags from "./tags/Tags";
import Posts from "./posts/Posts";
import UserFeed from "./posts/UserFeed";
import Movers from "./trending/Movers";

import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { actionTypes, useStateValue } from "../context";
import { getUser } from "./accounts/authAxios";

export const App = () => {
  // auth states
  const [{ token, isAuth, username }, dispatch] = useStateValue();
  const { mutateAsync } = useMutation("getUser", getUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: localStorage.getItem("token"),
        username: data.username,
      });
    },
  });

  // auth related functions
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !isAuth) {
      mutateAsync({ token });
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            {/* PAGES */}
            <Route exact path="/" component={Posts} />
            <Route path="/coins" component={Coins} />
            <Route path="/trending" component={Movers} />
            <Route path="/tags" component={Tags} />

            {/* AUTH AND FEED */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              path="/feed"
              component={() => <UserFeed isAuth={isAuth} token={token} />}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "../context/StateProvider";
import reducer, { initialState } from "../context/reducer";
const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  overrides: {
    MuiSkeleton: {
      root: {
        backgroundColor: "#ffeddb14",
      },
    },
  },
});

render(
  <ThemeProvider theme={theme}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StateProvider>
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
