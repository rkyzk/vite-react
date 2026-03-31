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
        errorMessage: null,
        page: null,
      };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
        page: action.payload.page,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        page: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
