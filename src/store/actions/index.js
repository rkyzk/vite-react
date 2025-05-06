import api from "../../api/axiosDefaults";

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

export const sendOrderAsGuest = (addressList) => async (dispatch, getState) => {
  const cart = getState().carts.cart;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });
  const sendData = {
    addressDTOList: addressList,
    cartDTO: {
      cartItems: items,
      totalPrice: totalPrice,
    },
  };
  try {
    const { data } = await api.post(`/order/guest`, sendData);
    dispatch({
      type: "CLEAR_CART",
    });
    localStorage.setItem("cartItems", []);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderLoggedInUser =
  (addressList) => async (dispatch, getState) => {
    console.log(addressList);
    const cart = getState().carts.cart;
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr?.price * curr?.purchaseQty,
      0
    );
    const items = cart.map((item) => {
      return { product: { ...item }, quantity: item.purchaseQty };
    });
    const sendData = {
      addressDTOList: addressList,
      cartDTO: {
        cartItems: items,
        totalPrice: totalPrice,
      },
    };
    try {
      const { data } = api.post(`/order/newaddress`, sendData);
      console.log("post req fired");
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

export const sendLogoutRequest = (navigate) => async (dispatch) => {
  await api.post("/auth/signout");
  dispatch({ type: "LOGOUT_USER" });
  localStorage.removeItem("auth");
  navigate(`/`);
};

export const sendRegisterRequest =
  (sendData, setLoader, navigate) => async (dispatch) => {
    setLoader(true);
    try {
      const { data } = await api.post("/auth/signup", sendData);
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

export const getUserAddress = () => async (dispatch) => {
  const { data } = await api.get(`/user/addresses`);
  console.log("get address");
  dispatch({ type: "STORE_ADDRESSES", payload: data });
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
