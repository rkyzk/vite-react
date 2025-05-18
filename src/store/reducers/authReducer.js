const initialState = {
  user: null,
  addresses: null,
  clientSecret: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: null,
      };
    case "STORE_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
      };
    case "STORE_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
