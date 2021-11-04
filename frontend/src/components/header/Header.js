import React from "react";
import { AppBar, Toolbar, Box, useMediaQuery, useTheme } from "@mui/material";
import { useHeaderStyles } from "./styles";
import { NavLink } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import NavIsAuth from "./NavIsAuth";
import NavNotAuth from "./NavNotAuth";
import PropTypes from "prop-types";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoneyIcon from "@mui/icons-material/Money";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { actionTypes, useStateValue } from "../../contextAuth";
import { logoutUser } from "../accounts/authAxios";
import { useMutation } from "react-query";
import useSnackbarAlert from "../other/useSnackbarAlert";
import Notifications from "./Notifications";

const Header = (props) => {
  // styles
  const classes = useHeaderStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // alert
  const snackbar = useSnackbarAlert();
  // auth
  const [{ token, isAuth, username }, dispatch] = useStateValue();
  const { mutateAsync } = useMutation("logout", logoutUser, {
    onSuccess: () => {
      dispatch({
        type: actionTypes.LOGOUT,
      });
      localStorage.removeItem("token", token);
      snackbar.showMessage("You've logged out!");
    },
    onError: () => {
      snackbar.showError("Something went wrong! Reload the page and retry.");
    },
  });
  const logout = async (e) => {
    await mutateAsync({ token });
  };

  return (
    <div>
      <AppBar className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Box>
            <NavLink
              exact
              to="/"
              className={classes.logo}
              activeClassName={classes.active}
            >
              Arregro
            </NavLink>
            {isAuth && (
              <NavLink
                exact
                to="/feed"
                className={`${classes.menuButton} ${classes.menuBtnSecondary}`}
                activeClassName={classes.active}
              >
                feed
              </NavLink>
            )}
          </Box>
          {isMobile ? (
            <>
              <Notifications />
              <NavDrawer logout={logout} isAuth={isAuth} user={username} />
            </>
          ) : (
            <>
              <NavLink
                to="/coins"
                className={classes.menuButton}
                style={{}}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <MoneyIcon className={classes.menuItemIcon} />
                  Coins
                </Box>
              </NavLink>
              <NavLink
                to="/trending"
                className={classes.menuButton}
                style={{}}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <TrendingUpIcon className={classes.menuItemIcon} />
                  Trending
                </Box>
              </NavLink>
              <NavLink
                to="/tags"
                className={classes.menuButton}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <LocalOfferIcon className={classes.menuItemIcon} />
                  Tags
                </Box>
              </NavLink>
              {isAuth ? (
                <>
                  <Notifications />
                  <NavIsAuth
                    isMobile={isMobile}
                    logout={logout}
                    user={username}
                  />
                </>
              ) : (
                <NavNotAuth />
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.string,
  isAuth: PropTypes.bool,
  handleLogout: PropTypes.func,
};

export default Header;
