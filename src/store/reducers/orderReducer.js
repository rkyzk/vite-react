const initialState = {
  order: {},
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ORDER_SUMMARY":
      return {
        ...state,
        order: {
          cart: action.payload.cart,
          shippingAddr: action.payload.shippingAddress,
          billingAddr: action.payload.billingAddress,
        },
      };
    default:
      return state;
  }
};

export default orderReducer;
