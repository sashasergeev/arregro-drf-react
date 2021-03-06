import React, { useState } from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import NavIsAuth from "./NavIsAuth";
import NavNotAuth from "./NavNotAuth";

import MenuIcon from "@mui/icons-material/Menu";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoneyIcon from "@mui/icons-material/Money";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDrawerStyles } from "./styles";

import PropTypes from "prop-types";

const NavDrawer = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useDrawerStyles();
  return <>
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
                <NavIsAuth logout={props.logout} user={props.user} />
              </>
            ) : (
              <>
                <NavNotAuth />
              </>
            )}
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
    <IconButton onClick={() => setOpenDrawer(!openDrawer)} size="large">
      <MenuIcon className={classes.icon} />
    </IconButton>
  </>;
};

NavDrawer.propTypes = {
  menuButton: PropTypes.string,
  user: PropTypes.string,
  active: PropTypes.string,
  isAuth: PropTypes.bool,
  logout: PropTypes.func,
};

export default NavDrawer;
