import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import errorReducer from "./reducers/errorReducer";

const initialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
  },
  preloadedState: {
    products: initialState,
  },
});

export default store;
