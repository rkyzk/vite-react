const initialState = {
  order: {},
  orderList: null,
  pagination: {},
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
        pagination: {
          ...state.pagination,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
        },
      };
    default:
      return state;
  }
};

export default orderReducer;
