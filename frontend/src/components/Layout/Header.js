import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  ButtonGroup,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#181b22",
  },
  logo: {
    fontFamily: "Quicksand, sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: "#FFFEFE",
    textAlign: "left",
    border: "1px solid transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  menuButton: {
    fontFamily: "Quicksand, sans-serif",
    fontWeight: 700,
    fontSize: 18,
    margin: 0,
    textDecoration: "none",
    color: "white",
    border: "1px solid transparent",
    paddingBottom: 5,
    paddingTop: 5,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  active: {
    borderWidth: 2,
    boxShadow: "0px 7px 1px -2px #2ecd2d78",
    paddingBottom: 5,
  },
}));

export default function Header(props) {
  const { header, logo, menuButton, toolbar, active } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const notAuthenticated = (
    <ButtonGroup aria-label="Nav buttons if user is not authenticated">
      <Button>
        <NavLink
          key="3"
          to="/login"
          className={menuButton}
          activeClassName={active}
          style={{ fontSize: "15px" }}
        >
          Sign In
        </NavLink>
      </Button>
      <Button>
        <NavLink
          key="4"
          to="/register"
          className={menuButton}
          activeClassName={active}
          style={{ fontSize: "15px" }}
        >
          Register
        </NavLink>
      </Button>
    </ButtonGroup>
  );
  const isAuthenticated = (
    <ButtonGroup aria-label="Nav buttons if user is authenticated">
      <Button
        disabled
        style={{
          boxShadow: "rgb(46 205 45 / 32%) 5px -5px 0px 0px inset",
          fontSize: "15px",
        }}
      >
        <NavLink
          key="3"
          to="/user"
          className={menuButton}
          activeClassName={active}
          style={{ fontSize: "15px" }}
        >
          {props.user}
        </NavLink>
      </Button>
      <Button
        style={{ fontSize: "15px" }}
        className={menuButton}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </ButtonGroup>
  );

  const logout = (e) => {
    props.handleLogout();
  };

  return (
    <div>
      <AppBar className={header}>
        <Toolbar className={toolbar}>
          <Box>
            <NavLink
              exact
              to="/"
              style={{ textDecoration: "none" }}
              className={logo}
              activeClassName={active}
            >
              Arregro
            </NavLink>
            {props.isAuth && (
              <NavLink
                exact
                to="/feed"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                className={menuButton}
                activeClassName={active}
              >
                feed{" "}
              </NavLink>
            )}
          </Box>
          {isMobile ? (
            <NavDrawer />
          ) : (
            <>
              <NavLink
                to="/coins"
                className={menuButton}
                style={{}}
                activeClassName={active}
              >
                coins
              </NavLink>
              <NavLink
                to="/tags"
                className={menuButton}
                style={{}}
                activeClassName={active}
              >
                Tags
              </NavLink>
              {props.isAuth ? isAuthenticated : notAuthenticated}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
