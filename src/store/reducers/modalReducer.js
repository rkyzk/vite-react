const initialState = {
  open: false,
  checkout: false,
  loginOnly: false,
  destPath: "",
  error: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        open: true,
      };
    case "CHECKOUT":
      return {
        ...state,
        checkout: true,
      };
    case "LOGIN_ONLY":
      return {
        ...state,
        loginOnly: true,
      };
    case "SET_FALSE":
      return {
        open: false,
        checkout: false,
        loginOnly: false,
      };
    case "SET_PATH":
      return {
        ...state,
        destPath: action.payload,
      };
    case "SET_MODAL":
      return {
        ...state,
        loginOnly: action.payload.loginOnly,
        destPath: action.payload.destPath,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default modalReducer;
