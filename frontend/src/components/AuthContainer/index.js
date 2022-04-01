import React from "react";
import { Redirect } from "react-router-dom";

import { Avatar, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAuthStyles } from "./styles";
import { useStateValue } from "../../contextAuth";

import SubmitBtn from "../SubmitBtn";

const AuthContainer = ({ children, handleSubmit, authType, isLoading }) => {
  // styles
  const classes = useAuthStyles();

  // auth
  const [{ isAuth }] = useStateValue();

  return (
    <Container maxWidth="xs" className={classes.window}>
      {isAuth && <Redirect to="/" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {authType}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {children}
          <SubmitBtn loading={isLoading}>{authType}</SubmitBtn>
        </form>
      </div>
    </Container>
  );
};

export default AuthContainer;
