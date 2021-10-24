import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUser } from "./authAxios";
import { actionTypes, useStateValue } from "../../context";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20%",
    padding: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "150%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  // styles
  const classes = useStyles();

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
    },
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    await loginMutate.mutateAsync({ username, password });
  };

  return (
    <Container maxWidth="xs" style={{ backgroundColor: "#a2a2a2" }}>
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
