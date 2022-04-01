import { useEffect } from "react";
import { useMutation } from "react-query";

import { actionTypes, useStateValue } from "../contextAuth";
import { getUser } from "../api/auth";

const useAuthorization = () => {
  /* 
    App init auth logic
  */

  // auth states
  const [{ isAuth }, dispatch] = useStateValue();
  const { mutateAsync } = useMutation("getUser", getUser, {
    onSuccess: (data) => {
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: localStorage.getItem("token"),
        username: data.username,
      });
    },
    onError: () => {
      dispatch({
        type: actionTypes.SET_LOADED,
      });
      localStorage.removeItem("token");
    },
  });

  // auth related functions
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !isAuth) {
      mutateAsync({ token });
    } else {
      dispatch({
        type: actionTypes.SET_LOADED,
      });
    }
  }, []);
  return {};
};

export default useAuthorization;
