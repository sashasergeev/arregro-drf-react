import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Redirect } from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser } from "./authAxios";
import { useAuthStyles } from "../accounts/styles";

import {
  Container,
  Typography,
  Grid,
  Link,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { actionTypes, useStateValue } from "../../context";

import PropTypes from "prop-types";

export const Register = () => {
  const classes = useAuthStyles();
  const [{ isAuth }, dispatch] = useStateValue();

  // signing up
  const { mutateAsync } = useMutation("register", registerUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: data.token,
        username: data.user.username,
      });
      localStorage.setItem("token", data.token);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const username = elements.username.value;
    const email = elements.email.value;
    const password = elements.password.value;
    const password2 = elements.password2.value;
    if (password != password2) {
      return null;
    }
    await mutateAsync({ username, email, password });
  };

  return (
    <Container maxWidth="xs" className={classes.window}>
      {isAuth && <Redirect to="/" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* form inside */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="password"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="password"
                required
                fullWidth
                id="password2"
                label="Confirm Password"
                name="password2"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Register.propTypes = {
  isAuth: PropTypes.bool,
};

export default Register;
