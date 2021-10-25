import React from "react";
import {
  ButtonGroup,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useHeaderStyles } from "./styles";

const NavNotAuth = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useHeaderStyles();

  return (
    <>
      <ButtonGroup
        style={
          isMobile
            ? { flexWrap: "wrap", flexDirection: "column" }
            : { flexWrap: "nowrap" }
        }
        aria-label="Nav buttons if user is not authenticated"
      >
        <Button>
          <NavLink
            key="3"
            to="/login"
            className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
            activeClassName={classes.active}
          >
            Sign In
          </NavLink>
        </Button>
        <Button>
          <NavLink
            key="4"
            to="/register"
            className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
            activeClassName={classes.active}
          >
            Register
          </NavLink>
        </Button>
      </ButtonGroup>
    </>
  );
};

NavNotAuth.propTypes = {
  menuButton: PropTypes.string,
  active: PropTypes.string,
};

export default NavNotAuth;
