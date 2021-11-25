import { loginUser, registerUser } from "../../api/auth";
import { actionTypes, useStateValue } from "../../contextAuth";
import useSnackbarAlert from "../other/useSnackbarAlert";
import { useMutation } from "react-query";

export const useLoginUser = () => {
  const snackbar = useSnackbarAlert();
  const [{ isAuth }, dispatch] = useStateValue();

  return useMutation("login", loginUser, {
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
      snackbar.showError("Sorry, login or password is incorrect.");
    },
  });
};

export const useRegisterUser = () => {
  const snackbar = useSnackbarAlert();
  const [{ isAuth }, dispatch] = useStateValue();

  return useMutation("register", registerUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: data.token,
        username: data.user.username,
      });
      snackbar.showSuccess("Account has been created.");
      localStorage.setItem("token", data.token);
    },
    onError: (err) => {
      snackbar.showError("Somthing is wrong.");
    },
  });
};
