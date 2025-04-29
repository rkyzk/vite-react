import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import errorReducer from "./reducers/errorReducer";
import searchTermsReducer from "./reducers/searchTermsReducer";
import categoryReducer from "./reducers/categoryReducer";

const initialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    searchTerms: searchTermsReducer,
  },
  preloadedState: {
    products: initialState,
  },
});

export default store;
