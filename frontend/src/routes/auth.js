import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export default [
  <Route key="login" path="/login" component={Login} />,
  <Route key="register" path="/register" component={Register} />,
];
