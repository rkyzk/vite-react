const initialState = {
  user: null,
  addresses: null,
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
    default:
      return state;
  }
};

export default authReducer;
