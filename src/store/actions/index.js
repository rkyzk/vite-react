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
    let newProdDetails = productDetails ? { ...productDetails } : {};
    if (
      Object.keys(newProdDetails).length === 0 ||
      !Object.hasOwn(productDetails, id)
    ) {
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

export const sendOrder = (data) => async (dispatch, getState) => {
  const cart = getState().carts.cart;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });
  let { selectedSAddrId, selectedBAddrId } = getState().auth;
  const sendData = {
    shippingAddressId: selectedSAddrId,
    billingAddressId: selectedBAddrId,
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
        type: "CLEAR_TEMP_BILLING_ADDRESS",
      });
      dispatch({
        type: "CLEAR_TEMP_SHIPPING_ADDRESS",
      });
      dispatch({
        type: "SET_ADDR_CHECKED_FALSE",
      });
      dispatch({
        type: "CLEAR_SELECTED_ADDRESS",
      });
    }
    localStorage.setItem("cart", null);
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderWithNewAddresses =
  (data, userId) => async (dispatch, getState) => {
    const cart = getState().carts.cart;
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr?.price * curr?.purchaseQty,
      0
    );
    const items = cart.map((item) => {
      return { product: { ...item }, quantity: item.purchaseQty };
    });
    const {
      tempSAddress,
      tempBAddress,
      selectedSAddrId,
      selectedBAddrId,
      bAddrEqualsSAddr,
    } = getState().auth;
    const address = {
      addressId: 0,
      fullname: "",
      defaultAddressFlg: false,
      shippingAddress: true,
      streetAddress1: "",
      streetAddress2: "",
      streetAddress3: "",
      city: "",
      prefecture: "",
      postalCode: "",
      saveAddr: true,
    };
    let sAddress = null;
    if (selectedSAddrId === 0) {
      let user = tempSAddress.saveAddr ? { userId: userId } : null;
      sAddress = { ...tempSAddress, addressId: selectedSAddrId, user: user };
    }
    let bAddress = null;
    if (selectedBAddrId === 0 && !bAddrEqualsSAddr) {
      let user = tempBAddress.saveAddr ? { userId: userId } : null;
      bAddress = { ...tempBAddress, addressId: selectedBAddrId, user: user };
    }
    const sendData = {
      shippingAddressDTO:
        selectedSAddrId !== 0
          ? { ...address, addressId: selectedSAddrId }
          : sAddress,
      billingAddressDTO:
        selectedBAddrId !== 0
          ? { ...address, addressId: selectedBAddrId }
          : bAddress,
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
          type: "CLEAR_TEMP_BILLING_ADDRESS",
        });
        dispatch({
          type: "CLEAR_TEMP_SHIPPING_ADDRESS",
        });
        dispatch({
          type: "SET_ADDR_CHECKED_FALSE",
        });
        dispatch({
          type: "CLEAR_SELECTED_ADDRESS",
        });
      }
      localStorage.setItem("cart", null);
      localStorage.setItem("auth", JSON.stringify(getState().auth));
      return;
    } catch (error) {
      console.log(error);
    }
  };

export const saveNewAddress =
  (address, sAddr) => async (dispatch, getState) => {
    let responseAddr = null;
    address.defaultAddressFlg = true;
    if (address.saveAddr) {
      try {
        responseAddr = await api.post(`/addresses`, address);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        responseAddr = await api.post(`/addresses/anonym`, address);
      } catch (error) {
        console.log(error);
      }
    }
    // store addressId
    let type = sAddr
      ? "STORE_TEMP_SHIPPING_ADDRESS"
      : "STORE_TEMP_BILLING_ADDRESS";
    dispatch({
      type: type,
      payload: responseAddr.data,
    });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
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
    console.log(data);
    let sList = getState().auth.sAddressList;
    console.log(sList);
    let bList = getState().auth.bAddressList;
    let selectedSId = 0;
    let selectedBId = 0;
    data.map((address) => {
      if (address.shippingAddress) {
        if (selectedSId === 0) selectedSId = address.addressId; // 更新日時が最新の住所を設定
        if (address.defaultAddressFlg) selectedSId = address.addressId;
        sList === null ? (sList = [address]) : sList.push(address);
      } else {
        if (selectedBId === 0) selectedBId = address.addressId;
        if (address.defaultAddressFlg) selectedBId = address.addressId;
        bList === null ? (bList = [address]) : bList.push(address);
      }
    });
    sList && dispatch({ type: "STORE_SADDRESSLIST", payload: sList });
    bList && dispatch({ type: "STORE_BADDRESSLIST", payload: bList });
    dispatch({
      type: "SET_SELECTED_SADDRESS",
      payload: selectedSId,
    });
    dispatch({
      type: "SET_SELECTED_BADDRESS",
      payload: selectedBId,
    });
    dispatch({ type: "INITIALIZE_BADDRESS_EQUALS_SADDRESS" });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error);
  }
};

// default address
export const sendUpdateAddressReq = (address) => async (dispatch, getState) => {
  let id = address.addressId;
  try {
    const { data } = await api.put(`/addresses/${id}`, address);
    let type = address.shippingAddress
      ? "STORE_SHIPPING_ADDRESS"
      : "STORE_BILLING_ADDRESS";
    let clearType = address.shippingAddress
      ? "CLEAR_TEMP_SHIPPING_ADDRESS"
      : "CLEAR_TEMP_BILLING_ADDRESS";
    dispatch({ type: type, payload: data });
    dispatch({ type: clearType });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error);
  }
};

export const storeAddress =
  (address, isSAddr) => async (dispatch, getState) => {
    if (address) {
      console.log("index 339: " + isSAddr);
      isSAddr
        ? dispatch({ type: "STORE_TEMP_SHIPPING_ADDRESS", payload: address })
        : dispatch({ type: "STORE_TEMP_BILLING_ADDRESS", payload: address });
      localStorage.setItem("auth", JSON.stringify(getState().auth));
    }
  };

export const validateAddress = (address, sAddr) => async (dispatch) => {
  console.log(address);
  console.log("443" + sAddr);
  let result =
    address.postalCode !== "" &&
    address.fullname.length >= 3 &&
    address.streetAddress2.length >= 2;
  let newErrors = {
    postalCode: address.postalCode === "",
    fullname: address.fullname.length < 3,
    streetAddress2: address.streetAddress2.length < 2,
  };
  result && sAddr
    ? dispatch({ type: "CLEAR_SADDRESS_ERRORS" })
    : dispatch({ type: "STORE_SADDRESS_ERRORS", payload: newErrors });
  result && !sAddr
    ? dispatch({ type: "CLEAR_BADDRESS_ERRORS" })
    : dispatch({ type: "STORE_BADDRESS_ERRORS", payload: newErrors });
  return result;
};

export const deleteAddress =
  (sAddr, id, toast) => async (dispatch, getState) => {
    try {
      await api.delete(`/addresses/${id}`);
    } catch (error) {
      console.log(error);
    }
    // remove the address with the id from sList or bList
    toast.success("住所が削除されました。");
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const storeSAddressErrors =
  (newErrors) => async (dispatch, getState) => {
    dispatch({ type: "STORE_SADDRESS_ERRORS", payload: newErrors });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const storeBAddressErrors =
  (newErrors) => async (dispatch, getState) => {
    dispatch({ type: "STORE_BADDRESS_ERRORS", payload: newErrors });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const clearAddressErrors = (sAddr) => async (dispatch, getState) => {
  sAddr
    ? dispatch({ type: "CLEAR_SADDRESS_ERRORS" })
    : dispatch({ type: "CLEAR_BADDRESS_ERRORS" });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const changeSelectedAddr =
  (isSAddr, selectedAddrId) => async (dispatch, getState) => {
    isSAddr
      ? dispatch({ type: "SET_SELECTED_SADDRESS", payload: selectedAddrId })
      : dispatch({ type: "SET_SELECTED_BADDRESS", payload: selectedAddrId });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  };

export const clearAddressData = () => async (dispatch, getState) => {
  dispatch({ type: "TOGGLE_BADDRESS_EQUALS_SADDRESS", payload: true });
  dispatch({ type: "CLEAR_BADDRESS_ERRORS" });
  dispatch({ type: "CLEAR_SADDRESS_ERRORS" });
  dispatch({ type: "SET_ADDR_CHECKED_FALSE" });
  dispatch({ type: "CLEAR_SADDRESS_ERRORS" });
  dispatch({ type: "CLEAR_TEMP_SHIPPING_ADDRESS" });
  dispatch({ type: "CLEAR_TEMP_BILLING_ADDRESS" });
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
