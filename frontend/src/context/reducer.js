export const initialState = {
  token: null,
  isAuth: false,
  username: null,
  isLoaded: false,
};

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  LOGOUT: "LOGOUT",
  SET_LOADED: "SET_LOADED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
        isAuth: true,
        username: action.username,
        isLoaded: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        ...initialState,
        isLoaded: true,
      };
    case actionTypes.SET_LOADED:
      return { ...state, isLoaded: true };
    default:
      return state;
  }
};

export default reducer;
