const initialState = {
  isLoading: false,
  errorMessage: null,
  page: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "IS_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        page: action.page,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
