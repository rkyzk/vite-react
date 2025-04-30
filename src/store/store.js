import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import errorReducer from "./reducers/errorReducer";
import categoryReducer from "./reducers/categoryReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    categories: categoryReducer,
  },
  preloadedState: {},
});

export default store;
