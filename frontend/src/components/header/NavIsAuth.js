import React from "react";
import { useHeaderStyles } from "./styles";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box, Button } from "@mui/material";

const NavIsAuth = (props) => {
  const classes = useHeaderStyles();
  return (
    <>
      <Box className={classes.authBtns}>
        <Button
          disabled
          className={classes.authBtn}
          style={{
            boxShadow: "rgb(46 205 45 / 32%) 5px -5px 0px 0px inset",
          }}
        >
          <NavLink
            to="/user"
            className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
            activeClassName={classes.active}
          >
            {props.user}
          </NavLink>
        </Button>
        <Button className={classes.authBtn} onClick={() => props.logout()}>
          <span className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}>
            <ExitToAppIcon />
          </span>
        </Button>
      </Box>
    </>
  );
};

NavIsAuth.propTypes = {
  menuButton: PropTypes.string,
  active: PropTypes.string,
  user: PropTypes.string,
  logout: PropTypes.func,
};

export default NavIsAuth;
