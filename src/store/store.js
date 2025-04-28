import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductReducer";

const initialState = {
  products: null,
  categories: null,
  pagination: {},
};

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  preloadedState: {
    products: initialState,
  },
});

export default store;
