const initialState = {
  products: [],
  featuredProducts: [],
  productDetails: {},
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
    case "STORE_PRODUCT_DETAIL":
      return {
        ...state,
        productDetails: action.payload,
      };
    case "CLEAR_PRODUCTS":
    default:
      return state;
  }
};

export default productReducer;
