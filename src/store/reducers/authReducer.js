const initialState = {
  user: null,
  shippingAddress: null,
  billingAddress: null,
  tempSAddress: null,
  tempBAddress: null,
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
        shippingAddress: null,
        billingAddress: null,
      };
    case "STORE_BILLING_ADDRESS":
      return {
        ...state,
        billingAddress: action.payload,
      };
    case "STORE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "STORE_TEMP_BILLING_ADDRESS":
      return {
        ...state,
        tempBAddress: action.payload,
      };
    case "STORE_TEMP_SHIPPING_ADDRESS":
      return {
        ...state,
        tempSAddress: action.payload,
      };
    case "DELETE_BILLING_ADDRESS":
      return {
        ...state,
        billingAddress: null,
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
