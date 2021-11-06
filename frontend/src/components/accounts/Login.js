import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useAuthStyles } from "../accounts/styles";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useStateValue } from "../../contextAuth";
import { useLoginUser } from "./authMutations";

const Login = () => {
  // styles
  const classes = useAuthStyles();

  // auth
  const [{ isAuth }] = useStateValue();
  const loginUserMutation = useLoginUser();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    await loginUserMutation.mutateAsync({ username, password });
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
            className={classes.field}
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
            className={classes.field}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="text"
            color="inherit"
            className={classes.submit}
            loading={loginUserMutation.isLoading}
            style={
              loginUserMutation.isLoading
                ? { backgroundColor: "#9c27b096" }
                : {}
            }
          >
            Sign In
          </LoadingButton>
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
