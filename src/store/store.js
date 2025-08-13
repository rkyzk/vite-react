import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import errorReducer from "./reducers/errorReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import authReducer from "./reducers/authReducer";

//const cartItems = [];
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// const auth = [];
const auth = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
// const products = {
//   products: [],
//   featuredProducts: [],
//   productDetails: {},
//   pagination: {},
// };
// localStorage.setItem("products", products);

const initialState = {
  carts: { cart: cartItems },
  auth: auth,
  products: products,
};

const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    categories: categoryReducer,
    carts: cartReducer,
    order: orderReducer,
    auth: authReducer,
  },
  preloadedState: initialState,
});

export default store;
