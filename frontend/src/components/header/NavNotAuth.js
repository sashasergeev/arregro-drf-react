import React from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useHeaderStyles } from "./styles";

const NavNotAuth = (props) => {
  const classes = useHeaderStyles();

  return (
    <Box className={classes.authBtns}>
      <Button className={classes.authBtn}>
        <NavLink
          to="/login"
          className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
          activeClassName={classes.active}
        >
          Sign In
        </NavLink>
      </Button>
      <Button className={classes.authBtn}>
        <NavLink
          to="/register"
          className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
          activeClassName={classes.active}
        >
          Register
        </NavLink>
      </Button>
    </Box>
  );
};

NavNotAuth.propTypes = {
  menuButton: PropTypes.string,
  active: PropTypes.string,
};

export default NavNotAuth;
