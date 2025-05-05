const initialState = {
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ORDER_SUMMARY":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
