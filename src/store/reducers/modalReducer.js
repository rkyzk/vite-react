const initialState = {
  open: false,
  checkout: false,
  loginOnly: false,
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
    default:
      return state;
  }
};

export default modalReducer;
