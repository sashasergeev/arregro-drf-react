import React from "react";
import {
  ButtonGroup,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavIsAuth = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
            fontSize: "15px",
          }}
        >
          <NavLink
            key="3"
            to="/user"
            className={props.menuButton}
            activeClassName={props.active}
            style={{ fontSize: "15px" }}
          >
            {props.user}
          </NavLink>
        </Button>
        <Button
          style={{ fontSize: "15px" }}
          className={props.menuButton}
          onClick={() => props.logout()}
        >
          Logout
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
