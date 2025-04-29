const initialState = {
  searchTerms: null,
};

const searchTermsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_SEARCH_TERMS":
      return {
        ...state,
        searchTerms: action.searchTerms,
      };
    default:
      return state;
  }
};

export default searchTermsReducer;
