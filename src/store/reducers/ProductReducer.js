const initialState = {
  products: null,
  pagination: {},
};

export const productReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default productReducer;
