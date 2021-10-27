import React from "react";
import {
  ButtonGroup,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useHeaderStyles } from "./styles";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavIsAuth = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'));
  const classes = useHeaderStyles();
  return (
    <>
      <ButtonGroup
        style={
          isMobile
            ? { flexWrap: "wrap", flexDirection: "column" }
            : { flexWrap: "nowrap" }
        }
        aria-label="Nav buttons if user is authenticated"
      >
        <Button
          disabled
          style={{
            boxShadow: "rgb(46 205 45 / 32%) 5px -5px 0px 0px inset",
          }}
        >
          <NavLink
            key="3"
            to="/user"
            className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}
            activeClassName={classes.active}
          >
            {props.user}
          </NavLink>
        </Button>
        <Button onClick={() => props.logout()}>
          <span className={`${classes.menuButton} ${classes.MenuButtonDrawer}`}>
            Logout
          </span>
        </Button>
      </ButtonGroup>
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
