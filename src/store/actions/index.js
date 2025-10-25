import api from "../../api/axiosDefaults";

export const fetchProducts = (queryString) => async (dispatch, getState) => {
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
    localStorage.setItem("products", JSON.stringify(getState().products));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "商品情報を取得できませんでした。",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    // dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        "カテゴリー情報を取得できませんでした。",
      page: "Filter",
    });
  }
};

export const fetchFeaturedProducts = () => async (dispatch, getState) => {
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
    localStorage.setItem("products", JSON.stringify(getState().products));
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        "お勧め商品情報を取得できませんでした。",
    });
  }
};

export const fetchProductDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "IS_FETCHING",
    });
    let { productDetails } = getState().products;
    let newProdDetails = { ...productDetails };
    if (newProdDetails.length === 0 || !Object.hasOwn(productDetails, id)) {
      const { data } = await api.get(`/public/product/detail/${id}`);
      newProdDetails[id] = data;
      dispatch({
        type: "STORE_PRODUCT_DETAIL",
        payload: newProdDetails,
      });
    }
    dispatch({
      type: "IS_SUCCESS",
    });
    localStorage.setItem("products", JSON.stringify(getState().products));
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        "商品詳細情報を取得できませんでした。",
    });
  }
};

export const updateCart = (id, qty, toast) => (dispatch, getState) => {
  const { products } = getState().products;
  let productData = products.find((item) => item.id === id);
  if (!productData) {
    const { featuredProducts } = getState().products;
    productData = featuredProducts.find((item) => item.id === id);
  }
  const isQuantityInStock = qty <= productData.quantity;
  if (isQuantityInStock) {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...productData, purchaseQty: qty },
    });
    toast.success("商品をカートに追加しました。");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
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
    localStorage.setItem("cart", null);
    localStorage.setItem("auth", JSON.stringify(getState().auth));
    return;
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderWithNewAddresses =
  (data) => async (dispatch, getState) => {
    const cart = getState().carts.cart;
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr?.price * curr?.purchaseQty,
      0
    );
    const items = cart.map((item) => {
      return { product: { ...item }, quantity: item.purchaseQty };
    });
    let { shippingAddress, billingAddress, tempSAddress, tempBAddress } =
      getState().auth;
    let responseSAddr = null;
    let responseBAddr = null;
    let sAddrId;
    if (tempSAddress?.fullname.length > 0) {
      if (tempSAddress.saveAddr) {
        try {
          responseSAddr = await api.post(`/addresses`, tempSAddress);
          dispatch({
            type: "STORE_SHIPPING_ADDRESS",
            payload: responseSAddr.data,
          });
          dispatch({
            type: "CLEAR_TEMP_S_ADDRESS",
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          responseSAddr = await api.post(`/addresses/anonym`, tempSAddress);
        } catch (error) {
          console.log(error);
        }
      }
      sAddrId = responseSAddr && responseSAddr.data.addressId;
    } else {
      sAddrId = shippingAddress.addressId;
    }
    if (tempBAddress?.fullname.length > 0) {
      if (tempBAddress.saveAddr) {
        try {
          responseBAddr = await api.post(`/addresses`, tempBAddress);
          dispatch({
            type: "STORE_BILLING_ADDRESS",
            payload: responseBAddr.data,
          });
          dispatch({
            type: "CLEAR_TEMP_B_ADDRESS",
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          responseBAddr = await api.post(`/addresses/anonym`, tempBAddress);
        } catch (error) {
          console.log(error);
        }
      }
    }
    let bAddrId = 0;
    if (responseBAddr) {
      bAddrId = responseBAddr.data.addressId;
    } else if (billingAddress) {
      bAddrId = billingAddress.addressId;
    }
    const sendData = {
      shippingAddressId: sAddrId,
      billingAddressId: bAddrId,
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
      const response = await api.post(`/order/newaddresses`, sendData);
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
      localStorage.setItem("cart", null);
      localStorage.setItem("auth", JSON.stringify(getState().auth));
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
      dispatch({
        type: "CLEAR_ERROR_MESSAGE",
      });
      localStorage.setItem("auth", JSON.stringify(getState().auth));
      reset();
      return true;
    } catch (error) {
      if (error?.response?.data?.message === "Bad credentials") {
        dispatch({
          type: "IS_ERROR",
          payload: "ユーザ名またはパスワードが間違っています。",
          page: "login",
        });
        return false;
      } else {
        toast.error("エラー発生。再度ログインしてください。");
        return false;
      }
    }
  };

export const sendLogoutRequest = (id, navigate, toast) => async (dispatch) => {
  await api.post(`/auth/signout/${id}`);
  dispatch({ type: "LOGOUT_USER" });
  toast.success("ログアウトしました。");
  localStorage.setItem("auth", null);
  localStorage.setItem("cartItems", []);
  dispatch({
    type: "CLEAR_CART",
  });
  navigate(`/`);
};

export const sendRegisterRequest =
  (sendData, reset, toast, setLoader) => async (dispatch) => {
    setLoader(true);
    try {
      const { data } = await api.post("/auth/signup", sendData);
      toast.success("アカウント登録しました。");
      reset();
      return true;
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload:
          error?.response?.data?.message ||
          "エラー発生。再度アカウント登録してください。",
        page: "register",
      });
      return false;
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

export const sendUpdateAddressReq = (address) => async (dispatch, getState) => {
  let id = address.addressId;
  try {
    const { data } = await api.put(`/addresses/${id}`, address);
    let type = address.billingAddress
      ? "STORE_BILLING_ADDRESS"
      : "STORE_SHIPPING_ADDRESS";
    let clearType = address.billingAddress
      ? "CLEAR_TEMP_BILLING_ADDRESS"
      : "CLEAR_TEMP_SHIPPING_ADDRESS";
    dispatch({ type: type, payload: data });
    dispatch({ type: clearType });
  } catch (error) {
    console.log(error);
  }
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const storeAddress = (address) => async (dispatch, getState) => {
  address.billingAddress
    ? dispatch({ type: "STORE_TEMP_BILLING_ADDRESS", payload: address })
    : dispatch({ type: "STORE_TEMP_SHIPPING_ADDRESS", payload: address });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const deleteAddress = (id, toast) => async (dispatch, getState) => {
  try {
    await api.delete(`/addresses/${id}`);
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "DELETE_BILLING_ADDRESS" });
  toast.success("請求先住所が削除されました。");
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
      if (error.status === 420) {
        console.log("420");
        const { data } = await api.post(`/auth/refreshtoken`);
        if (data.message === "JWT token has been refreshed successfully.") {
          console.log("jwt refreshed");
          getClientSecret(sendData);
        } else if (data.message === "Refresh token has expired.") {
          console.log(data);
          const { user } = getState().auth.user;
          let { data } = await api.get(`/auth/signout/${user.id}`);
          console.log(data);
          dispatch({ type: "LOGOUT_USER" });
          localStorage.setItem("auth", null);
          dispatch({
            type: "IS_ERROR",
            payload: "リフレッシュトークン有効期限切れ",
          });
        }
      } else {
        console.log(error);
      }
    }
  };

export const clearErrorMessage = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};
