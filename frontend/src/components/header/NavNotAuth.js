import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const NavNotAuth = (props) => {
  return (
    <>
      <ButtonGroup aria-label="Nav buttons if user is not authenticated">
        <Button>
          <NavLink
            key="3"
            to="/login"
            className={props.menuButton}
            activeClassName={props.active}
            style={{ fontSize: "15px" }}
          >
            Sign In
          </NavLink>
        </Button>
        <Button>
          <NavLink
            key="4"
            to="/register"
            className={props.menuButton}
            activeClassName={props.active}
            style={{ fontSize: "15px" }}
          >
            Register
          </NavLink>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default NavNotAuth;
