import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductReducer";
import errorReducer from "./reducers/errorReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  carts: { cart: cartItems },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    categories: categoryReducer,
    featuredProducts: productReducer,
    carts: cartReducer,
  },
  preloadedState: initialState,
});

export default store;
