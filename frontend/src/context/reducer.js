export const initialState = { token: null, isAuth: false, username: null };

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
        isAuth: true,
        username: action.username,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
