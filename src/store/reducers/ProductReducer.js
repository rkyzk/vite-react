const initialState = {
  products: null,
  categories: [{ categoryId: 0, categoryName: "abc" }],
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
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: [{ categoryId: 1, categoryName: "tulips" }],
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          lastPage: action.lastPage,
        },
      };
    default:
      return state;
  }
};

export default productReducer;
