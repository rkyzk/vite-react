const initialState = {
  user: null,
  sAddressList: null,
  bAddressList: null,
  tempSAddress: null,
  tempBAddress: null,
  clientSecret: null,
  sAddrErrs: null,
  bAddrErrs: null,
  addrChecked: false,
  selectedSAddrId: 0,
  selectedBAddrId: 0,
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
        sAddressList: null,
        bAddressList: null,
        clientSecret: null,
      };
    case "STORE_SADDRESSLIST":
      return {
        ...state,
        sAddressList: action.payload,
      };
    case "STORE_BADDRESSLIST":
      return {
        ...state,
        bAddressList: action.payload,
      };
    case "STORE_TEMP_BILLING_ADDRESS":
      return {
        ...state,
        tempBAddress: { ...action.payload, shippingAddress: false },
      };
    case "STORE_TEMP_SHIPPING_ADDRESS":
      return {
        ...state,
        tempSAddress: { ...action.payload, shippingAddress: true },
      };
    case "CLEAR_TEMP_BILLING_ADDRESS":
      return {
        ...state,
        tempBAddress: null,
      };
    case "CLEAR_TEMP_SHIPPING_ADDRESS":
      return {
        ...state,
        tempSAddress: null,
      };
    case "DELETE_S_ADDRESS":
      return {
        ...state,
        sAddressList: action.payload,
      };
    case "DELETE_B_ADDRESS":
      return {
        ...state,
        bAddressList: action.payload,
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
    case "SET_ADDR_CHECKED_FALSE":
      return {
        ...state,
        addrChecked: false,
      };
    case "SET_SELECTED_SADDRESS":
      return {
        ...state,
        selectedSAddrId: action.payload,
      };
    case "SET_SELECTED_BADDRESS":
      return {
        ...state,
        selectedBAddrId: action.payload,
      };
    case "CLEAR_SELECTED_ADDRESS":
      return {
        ...state,
        selectedSAddrId: 0,
        selectedBAddrId: 0,
      };
    default:
      return state;
  }
};

export default authReducer;
