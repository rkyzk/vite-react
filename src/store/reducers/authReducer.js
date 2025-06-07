const initialState = {
  user: null,
  addresses: [],
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
        addresses: null,
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
    case "REMOVE_CLIENT_SECRET":
      return {
        ...state,
        clientSecret: null,
      };
    default:
      return state;
  }
};

export default authReducer;
