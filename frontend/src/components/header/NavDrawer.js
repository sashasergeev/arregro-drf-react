import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  IconButton,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import NavIsAuth from "./NavIsAuth";
import NavNotAuth from "./NavNotAuth";

import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
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
}));

const NavDrawer = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
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
                to="/coins"
                className={classes.link}
                activeClassName={classes.active}
              >
                Coins
              </NavLink>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText className={classes.listItemText}>
              <NavLink
                to="/tags"
                className={classes.link}
                activeClassName={classes.active}
              >
                Tags
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
