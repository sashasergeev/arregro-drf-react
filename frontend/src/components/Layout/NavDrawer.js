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

import MenuIcon from "@material-ui/icons/Menu";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    fontFamily: "Quicksand, sans-serif",
  },
  icon: {
    color: "white",
  },
  paper: {
    backgroundColor: "#17222b",
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

const NavDrawer = () => {
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
              <NavLink
                to="/"
                className={classes.link}
                activeClassName={classes.active}
              >
                Account
              </NavLink>
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

export default NavDrawer;
