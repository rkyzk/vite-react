import api from "../../api/axiosDefaults";
import axios from "axios";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({
      type: "IS_FETCHING",
    });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      lastPage: data.lastPage,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
    });
    dispatch({
      type: "IS_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    // dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/admin/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const fetchFeaturedProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "IS_FETCHING",
    });
    const { data } = await api.get(`/public/products/featured`);
    dispatch({
      type: "FETCH_FEATURED_PRODUCTS",
      payload: data,
    });
    dispatch({
      type: "IS_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch featured products",
    });
  }
};

export const updateCart = (id, qty) => (dispatch, getState) => {
  const { products } = getState().products;
  const productData = products.find((item) => item.id === id);
  const isQuantityInStock = qty <= productData.quantity;
  if (isQuantityInStock) {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...productData, purchaseQty: qty },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    //localStorage.setItem("cartItems", []);
    // localStorage.clear();
  } else {
    dispatch(`/public/order/featured`);
  }
};

export const removeItemFromCart = (prodId) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: prodId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const handleSendOrderToBE = (address) => async (dispatch, getState) => {
  const baseUrl = "http://localhost:8080/api";
  const cart = getState().carts.cart;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });
  try {
    const { data } = await axios({
      method: "post",
      url: baseUrl + "/order/guest",
      headers: {},
      data: {
        addressDTO: address,
        cartDTO: {
          cartItems: items,
          totalPrice: totalPrice,
        },
      },
    });
    dispatch({
      type: "CLEAR_CART",
    });
    localStorage.setItem("cartItems", []);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendLoginRequest =
  (sendData, setLoader, navigate) => async (dispatch) => {
    setLoader(true);
    try {
      const { data } = await api.post(`/auth/signin`, sendData);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      navigate(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
