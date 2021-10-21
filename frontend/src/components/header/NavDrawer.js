import React, { useState } from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  IconButton,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import NavIsAuth from "./NavIsAuth";
import NavNotAuth from "./NavNotAuth";

import MenuIcon from "@material-ui/icons/Menu";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import MoneyIcon from "@material-ui/icons/Money";
import MoreIcon from "@material-ui/icons/More";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    display: "block",
  },
  icon: {
    color: "white",
  },
  paper: {
    background:
      "linear-gradient(0deg, rgb(34 114 44) 50%, rgba(23,34,43,1) 50%)",
    width: "40vw",
  },
  listItemText: {
    textAlign: "center",
    padding: "10px 0px",
  },
  active: {
    borderWidth: 2,
    boxShadow: "0px 7px 1px -2px #2ecd2d78",
    paddingBottom: 5,
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "7px",
  },
  menuItemIcon: {
    padding: "4px",
    background: "#8980f5",
    borderRadius: "50%",
  },
}));

const NavDrawer = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText className={classes.listItemText}>
              <NavLink
                exact
                to="/coins"
                className={classes.link}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <MoneyIcon className={classes.menuItemIcon} />
                  Coins
                </Box>
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText className={classes.listItemText}>
              <NavLink
                exact
                to="/trending"
                className={classes.link}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <TrendingUpIcon className={classes.menuItemIcon} />
                  Trending
                </Box>
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText className={classes.listItemText}>
              <NavLink
                exact
                to="/tags"
                className={classes.link}
                activeClassName={classes.active}
              >
                <Box className={classes.menuContainer}>
                  <LocalOfferIcon className={classes.menuItemIcon} />
                  Tags
                </Box>
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText className={classes.listItemText}>
              {props.isAuth ? (
                <>
                  <NavIsAuth
                    menuButton={props.menuButton}
                    active={props.active}
                    logout={props.logout}
                    user={props.user}
                    isMobile={props.isMobile}
                  />
                </>
              ) : (
                <>
                  <NavNotAuth
                    menuButton={props.menuButton}
                    active={props.active}
                  />
                </>
              )}
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

NavDrawer.propTypes = {
  menuButton: PropTypes.string,
  user: PropTypes.string,
  active: PropTypes.string,
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
};

export default NavDrawer;
