import React from "react";

import Field from "../components/Field";

import useSnackbarAlert from "../components/other/useSnackbarAlert";
import { useRegisterUser } from "../api/authMutations";

import AuthContainer from "../components/AuthContainer";

export const Register = () => {
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
    <AuthContainer
      authType="Sign Up"
      handleSubmit={handleSubmit}
      isLoading={registerUserMutation.isLoading}
    >
      <Field id="username" label="Username" autoFocus />
      <Field id="email" label="Email Address" />
      <Field id="password" label="Password" type="password" />
      <Field id="password2" label="Confirm Password" type="password" />
    </AuthContainer>
  );
};

export default Register;
