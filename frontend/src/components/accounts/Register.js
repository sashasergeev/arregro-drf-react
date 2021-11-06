import React from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Link,
  TextField,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { useAuthStyles } from "../accounts/styles";

import useSnackbarAlert from "../other/useSnackbarAlert";
import { useStateValue } from "../../contextAuth";
import { useRegisterUser } from "./authMutations";

import PropTypes from "prop-types";

export const Register = () => {
  const classes = useAuthStyles();
  const [{ isAuth }] = useStateValue();
  // alert
  const snackbar = useSnackbarAlert();
  // signing up
  const registerUserMutation = useRegisterUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const username = elements.username.value;
    const email = elements.email.value;
    const password = elements.password.value;
    const password2 = elements.password2.value;
    if (password != password2) {
      snackbar.showWarning("Passwords does not match. Please try again.");
      return null;
    }
    await registerUserMutation.mutateAsync({ username, email, password });
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
                className={classes.field}
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
                className={classes.field}
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
                className={classes.field}
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
                className={classes.field}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="text"
            color="inherit"
            className={classes.submit}
            loading={registerUserMutation.isLoading}
            style={
              registerUserMutation.isLoading
                ? { backgroundColor: "#9c27b096" }
                : {}
            }
          >
            Sign Up
          </LoadingButton>
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
