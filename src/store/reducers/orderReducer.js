const initialState = {
  order: {},
  orderList: null,
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
    case "STORE_ORDER_HISTORY":
      return {
        ...state,
        orderList: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
