import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import useSnackbarAlert from "../other/useSnackbarAlert";

import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useAuthStyles } from "../accounts/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser } from "./authAxios";
import { actionTypes, useStateValue } from "../../context";

const Login = () => {
  // styles
  const classes = useAuthStyles();

  // alert
  const snackbar = useSnackbarAlert();

  // auth
  const [{ isAuth }, dispatch] = useStateValue();
  const loginMutate = useMutation("login", loginUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: data.token,
        username: data.user.username,
      });
      localStorage.setItem("token", data.token);
      snackbar.showSuccess("You've logged in successfuly.");
    },
    onError: (data) => {
      console.log(data);
      snackbar.showError("Sorry, login or password is incorrect.");
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    await loginMutate.mutateAsync({ username, password });
  };

  return (
    <Container maxWidth="xs" className={classes.window}>
      {isAuth && <Redirect to="/" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool,
};

export default Login;
