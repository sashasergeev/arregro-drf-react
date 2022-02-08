import React, { useEffect, lazy, Suspense } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useMutation } from "react-query";

import Header from "./header/Header";

const Login = lazy(() => import("./accounts/Login"));
const Register = lazy(() => import("./accounts/Register"));
const Coins = lazy(() => import("./coins/Coins"));
const Tags = lazy(() => import("./tags/Tags"));
const Posts = lazy(() => import("./posts/Posts"));
const UserFeed = lazy(() => import("./posts/UserFeed"));
const Movers = lazy(() => import("./trending/Movers"));

import { actionTypes, useStateValue } from "../contextAuth";
import { getUser } from "../api/auth";

export const App = () => {
  // auth states
  const [{ isAuth }, dispatch] = useStateValue();
  const { mutateAsync } = useMutation("getUser", getUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: localStorage.getItem("token"),
        username: data.username,
      });
    },
    onError: () => {
      dispatch({
        type: actionTypes.SET_LOADED,
      });
      localStorage.removeItem("token");
    },
  });

  // auth related functions
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !isAuth) {
      mutateAsync({ token });
    } else {
      dispatch({
        type: actionTypes.SET_LOADED,
      });
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/* PAGES */}
              <Route exact path="/" component={Posts} />
              <Route path="/coins" component={Coins} />
              <Route path="/trending" component={Movers} />
              <Route path="/tags" component={Tags} />
              {/* AUTH AND FEED */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/feed" component={UserFeed} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </>
  );
};

// auth context related import
import { QueryClient, QueryClientProvider } from "react-query";
import { StateProvider } from "../contextAuth/StateProvider";
import reducer, { initialState } from "../contextAuth/reducer";

// alert related imports
import { SnackbarProvider } from "material-ui-snackbar-provider";
import SnackbarAlert from "./other/SnackbarAlert";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// styles
import { createTheme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  components: {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffeddb14",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});

render(
  <StyledEngineProvider injectFirst>
    // overriding global styles
    <ThemeProvider theme={theme}>
      // alerts
      <SnackbarProvider
        SnackbarProps={{ autoHideDuration: 4000 }}
        SnackbarComponent={SnackbarAlert}
      >
        // context data
        <StateProvider initialState={initialState} reducer={reducer}>
          // React query
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </StateProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
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
