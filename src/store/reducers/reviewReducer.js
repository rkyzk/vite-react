const initialState = {
  entries: null,
};
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_REVIEWS":
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
