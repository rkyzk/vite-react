import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductReducer";
import errorReducer from "./reducers/errorReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import authReducer from "./reducers/authReducer";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const auth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  carts: { cart: cartItems },
  auth: auth,
};

const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    categories: categoryReducer,
    featuredProducts: productReducer,
    carts: cartReducer,
    order: orderReducer,
    auth: authReducer,
  },
  preloadedState: initialState,
});

export default store;
