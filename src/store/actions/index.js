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

export const updateCart = (id, qty, toast) => (dispatch, getState) => {
  const { products } = getState().products;
  const productData = products.find((item) => item.id === id);
  const isQuantityInStock = qty <= productData.quantity;
  if (isQuantityInStock) {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...productData, purchaseQty: qty },
    });
    toast.success("Item added in cart");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
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

export const sendOrderAsUser = (data) => async (dispatch, getState) => {
  console.log("index 101");
  const cart = getState().carts.cart;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });
  const sendData = {
    cartDTO: {
      cartItems: items,
      totalPrice: totalPrice,
    },
    pgName: data.pgName,
    pgPaymentId: data.pgPaymentId,
    pgStatus: data.pgStatus,
    pgResponseMessage: data.pgResponseMessage,
  };
  try {
    const response = await api.post(`/order`, sendData);
    console.log(response.data);
    if (response.data) {
      dispatch({
        type: "STORE_ORDER_SUMMARY",
        payload: response.data,
      });
      dispatch({
        type: "CLEAR_CART",
      });
      dispatch({
        type: "REMOVE_CLIENT_SECRET",
      });
    }
    localStorage.setItem("cart", getState.carts.cart);
    localStorage.setItem("auth", getState.auth);
    return;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderAsGuest = (data) => async (dispatch, getState) => {
  const cart = getState().carts.cart;
  const tempSAddress = getState().auth.tempSAddress;

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });

  const sendData = {
    addressDTOList: [tempSAddress],
    cartDTO: {
      cartItems: items,
      totalPrice: totalPrice,
    },
    pgName: data.pgName,
    pgPaymentId: data.pgPaymentId,
    pgStatus: data.pgStatus,
    pgResponseMessage: data.pgResponseMessage,
  };
  try {
    const response = await api.post(`/order/guest`, sendData);
    console.log(response.data);
    if (response.data) {
      dispatch({
        type: "STORE_ORDER_SUMMARY",
        payload: response.data,
      });
      dispatch({
        type: "CLEAR_CART",
      });
      dispatch({
        type: "REMOVE_CLIENT_SECRET",
      });
    }
    localStorage.setItem("cart", getState.carts.cart);
    localStorage.setItem("auth", getState.auth);
  } catch (error) {
    console.log(error);
  }
};

export const sendLoginRequest =
  (sendData, reset, toast, setLoader, navigate, state, path) =>
  async (dispatch, getState) => {
    setLoader(true);
    try {
      const { data } = await api.post(`/auth/signin`, sendData);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      localStorage.setItem("auth", JSON.stringify(getState().auth));
      reset();
      toast.success("You're logged in.");
      state ? navigate(`/checkout`) : navigate(path);
    } catch (error) {
      if (error?.response?.data?.message === "Bad credentials") {
        dispatch({
          type: "IS_ERROR",
          payload: "Username and password don't match.",
        });
      } else {
        console.log("other errors");
        toast.error("Error occurred.  Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

export const sendLogoutRequest = (navigate, toast) => async (dispatch) => {
  await api.post("/auth/signout");
  dispatch({ type: "LOGOUT_USER" });
  toast.success("You've been logged out.");
  localStorage.removeItem("auth");
  navigate(`/`);
};

export const sendRegisterRequest =
  (sendData, reset, toast, setLoader, navigate, state) => async (dispatch) => {
    setLoader(true);
    try {
      const { data } = await api.post("/auth/signup", sendData);
      toast.success("Your've been registered.");
      reset();
      !state && navigate(`/login`);
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message ||
          "Something went wrong, please try again.",
      });
    } finally {
      setLoader(false);
    }
  };

export const getUserAddress = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get(`/user/addresses`);
    let type = "";
    data.map((address) => {
      type = address.billingAddress
        ? "STORE_BILLING_ADDRESS"
        : "STORE_SHIPPING_ADDRESS";
      dispatch({ type: type, payload: address });
    });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error);
  }
};

export const sendSaveNewAddressReq =
  (address) => async (dispatch, getState) => {
    await api.post(`/addresses`, address);
    const { data } = await api.get(`/user/addresses`);
    dispatch({ type: "STORE_ADDRESSES", payload: data });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const sendUpdateAddressReq = (address) => async (dispatch, getState) => {
  let id = address.addressId;
  await api.put(`/addresses/${id}`, address);
  const { data } = await api.get(`/user/addresses`);
  console.log(data);
  dispatch({ type: "STORE_ADDRESSES", payload: data });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const storeAddress =
  (address, isShippingAddr) => async (dispatch, getState) => {
    let type = isShippingAddr
      ? "STORE_TEMP_SHIPPING_ADDRESS"
      : "STORE_TEMP_BILLING_ADDRESS";
    dispatch({ type: type, payload: address });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const createClientSecret =
  (totalPrice) => async (dispatch, getState) => {
    const sendData = {
      amount: Number(totalPrice),
      currency: "jpy",
    };
    try {
      const { data } = await api.post(`/order/stripe-client-secret`, sendData);
      dispatch({ type: "STORE_CLIENT_SECRET", payload: data });
      localStorage.setItem("auth", JSON.stringify(getState().auth));
    } catch (error) {
      console.log(error);
    }
  };

export const clearErrorMessage = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
