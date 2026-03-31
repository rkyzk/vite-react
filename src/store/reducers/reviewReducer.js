const initialState = {
  reviews: null,
};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
