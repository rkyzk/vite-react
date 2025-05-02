const initialState = {
  products: null,
  featuredProducts: null,
  pagination: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
        },
      };
    case "FETCH_FEATURED_PRODUCTS":
      return {
        ...state,
        featuredProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
