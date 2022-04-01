import React from "react";

import { useLoginUser } from "../api/authMutations";

import Field from "../components/Field";
import AuthContainer from "../components/AuthContainer";

const Login = () => {
  const loginUserMutation = useLoginUser();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;
    await loginUserMutation.mutateAsync({ username, password });
  };

  return (
    <AuthContainer
      authType="Sign In"
      handleSubmit={handleLoginSubmit}
      isLoading={loginUserMutation.isLoading}
    >
      <Field id="username" label="Username" autoFocus />
      <Field id="password" label="Password" type="password" />
    </AuthContainer>
  );
};

export default Login;
