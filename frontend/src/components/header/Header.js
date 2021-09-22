import React from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import NavIsAuth from "./NavIsAuth";
import NavNotAuth from "./NavNotAuth";

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
            <NavDrawer
              menuButton={menuButton}
              active={active}
              logout={logout}
              isAuth={props.isAuth}
              user={props.user}
            />
          ) : (
            <>
              <NavLink
                to="/coins"
                className={menuButton}
                style={{}}
                activeClassName={active}
              >
                Coins
              </NavLink>
              <NavLink
                to="/tags"
                className={menuButton}
                style={{}}
                activeClassName={active}
              >
                Tags
              </NavLink>
              {props.isAuth ? (
                <NavIsAuth
                  menuButton={menuButton}
                  active={active}
                  logout={logout}
                  user={props.user}
                />
              ) : (
                <NavNotAuth menuButton={menuButton} active={active} />
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
