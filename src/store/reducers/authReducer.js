const initialState = {
  user: null,
  shippingAddress: null,
  billingAddress: null,
  tempSAddress: null,
  tempBAddress: null,
  clientSecret: null,
  sAddrErrs: null,
  bAddrErrs: null,
  addrChecked: false,
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
        clientSecret: null,
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
    case "CLEAR_TEMP_BILLING_ADDRESS":
      delete state["tempBAddress"];
      return state;
    case "CLEAR_TEMP_SHIPPING_ADDRESS":
      delete state["tempSAddress"];
      return state;
    case "DELETE_S_ADDRESS":
      return {
        ...state,
        shippingAddress: null,
      };
    case "DELETE_B_ADDRESS":
      return {
        ...state,
        billingAddress: null,
      };
    case "STORE_SADDRESS_ERRORS":
      return {
        ...state,
        sAddrErrs: action.payload,
        addrChecked: true,
      };
    case "STORE_BADDRESS_ERRORS":
      return {
        ...state,
        bAddrErrs: action.payload,
        addrChecked: true,
      };
    case "CLEAR_SADDRESS_ERRORS":
      return {
        ...state,
        sAddrErrs: null,
      };
    case "CLEAR_BADDRESS_ERRORS":
      return {
        ...state,
        bAddrErrs: null,
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
