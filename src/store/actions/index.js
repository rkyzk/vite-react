import api from "../../api/axiosDefaults";

/** 商品情報を取得 */
export const fetchProducts = (queryString) => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_PRODUCTS",
  });
  dispatch({
    type: "IS_FETCHING",
  });
  try {
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
  } catch (error) {
    if (error.status === 404) {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message || "該当する商品がありません。",
          page: "products",
        },
      });
    } else {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message ||
            "商品情報を取得できませんでした。",
          page: "products",
        },
      });
    }
    return;
  }
  dispatch({
    type: "IS_SUCCESS",
  });
  localStorage.setItem("products", JSON.stringify(getState().products));
};

/** カテゴリーを取得 */
export const fetchCategories = () => async (dispatch) => {
  try {
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

/* 未使用 */
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

/** 商品詳細を取得 */
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

/** 「カートに追加」ボタンからカートを更新（qty:追加する個数） */
export const updateCartAddQty = (id, qty, toast) => (dispatch, getState) => {
  const { products } = getState().products;
  const { cart } = getState().carts;
  let productData = products.find((item) => item.id === id);
  let item = cart.find((item) => item.id === id);
  let newQty = item ? item.purchaseQty + qty : qty;
  const isQuantityInStock = newQty <= productData.quantity;
  if (isQuantityInStock) {
    dispatch({
      type: "UPDATE_CART",
      payload: {
        ...productData,
        purchaseQty: newQty,
        quantity: productData.quantity - qty,
      },
    });
    toast.success("商品をカートに追加しました。");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }
};

/** Cartページプルダウンからカートを更新（qty:購入個数） */
export const updateCart = (id, qty, toast) => (dispatch, getState) => {
  const { cart } = getState().carts;
  let cartItemData = cart?.find((item) => item.id === id);
  let isQuantityInStock;
  let oldPurchaseQty = cartItemData.purchaseQty;
  let qtyAdded = qty - oldPurchaseQty;
  // TBD;
  if (cartItemData) {
    isQuantityInStock = qtyAdded <= cartItemData.quantity;
  } else {
    // ありえない
  }
  if (isQuantityInStock) {
    dispatch({
      type: "UPDATE_CART",
      payload: {
        ...cartItemData,
        purchaseQty: qty,
        quantity: cartItemData.quantity - qtyAdded,
      },
    });
    toast.success("商品の購入個数を更新しました。");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }
};

/** カートから商品を削除 */
export const removeItemFromCart = (prodId) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: prodId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

/** 注文をリクエスト（住所登録なし）*/
export const sendOrder = (data) => async (dispatch, getState) => {
  const { cart } = getState().carts;
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
      dispatch({
        type: "REMOVE_CLIENT_SECRET",
      });
    }
    localStorage.setItem("cart", null);
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    if (error.status === 420) {
      dispatch({
        type: "SET_COMMAND_IDX",
        payload: 1,
      });
    }
    return false;
  }
};

/** 注文をリクエスト（住所登録あり）*/
export const sendOrderWithNewAddresses =
  (data) => async (dispatch, getState) => {
    const id = getState().auth.user.id;
    const cart = getState().carts.cart;
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr?.price * curr?.purchaseQty,
      0
    );
    const items = cart.map((item) => {
      return { product: { ...item }, quantity: item.purchaseQty };
    });
    const { tempSAddress, tempBAddress, selectedSAddrId, selectedBAddrId } =
      getState().auth;
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
      let user = tempSAddress.saveAddr ? { userId: id } : null;
      sAddress = { ...tempSAddress, addressId: selectedSAddrId, user: user };
    }
    let bAddress = null;
    if (selectedBAddrId === -1) {
      let user = tempBAddress.saveAddr ? { userId: id } : null;
      bAddress = { ...tempBAddress, addressId: selectedBAddrId, user: user };
    }
    const sendData = {
      shippingAddressDTO:
        selectedSAddrId === 0
          ? sAddress
          : { ...address, addressId: selectedSAddrId },
      billingAddressDTO:
        selectedBAddrId === -1
          ? bAddress
          : { ...address, addressId: selectedBAddrId },
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
          type: "REMOVE_CLIENT_SECRET",
        });
      }
      localStorage.setItem("cart", null);
      localStorage.setItem("auth", JSON.stringify(getState().auth));
      return true;
    } catch (error) {
      if (error.status === 420) {
        dispatch({
          type: "SET_COMMAND_IDX",
          payload: 1,
        });
      }
      return false;
    }
  };

/** 編集した住所のDB更新 */
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

/** ログインリクエスト送信 */
export const sendLoginRequest =
  (sendData, toast, setLoader) => async (dispatch, getState) => {
    setLoader(true);
    try {
      const { data } = await api.post(`/auth/signin`, sendData);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
      dispatch({
        type: "SET_COMMAND_IDX",
        payload: 0,
      });
      dispatch({
        type: "CLEAR_ERROR_MESSAGE",
      });
      dispatch({
        type: "SET_FALSE",
      });
      localStorage.setItem("auth", JSON.stringify(getState().auth));
      toast.success("ログインしました。");
    } catch (error) {
      if (error?.response?.data?.message === "Bad credentials") {
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage: "ユーザ名またはパスワードが間違っています。",
            page: "login",
          },
        });
      } else {
        console.log(error?.response?.data?.message);
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage: "エラー発生。再度ログインしてください。",
            page: "login",
          },
        });
      }
    }
  };

/** ログアウトリクエスト送信 */
export const sendLogoutRequest = (id, navigate, toast) => async (dispatch) => {
  await api.post(`/auth/signout/${id}`);
  dispatch({ type: "LOGOUT_USER" });
  localStorage.setItem("auth", null);
  console.log("LOGGED OUT!!!!");
  if (navigate) {
    toast.success("ログアウトしました。");
    localStorage.setItem("cartItems", []);
    dispatch({
      type: "CLEAR_CART",
    });
    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
    });
    navigate(`/`);
  } else {
    dispatch({
      type: "IS_ERROR",
      payload: "再度ログインしてください。",
    });
  }
};

/** アカウント登録リクエストを送信 */
export const sendRegisterRequest =
  (sendData, toast, setLoader) => async (dispatch) => {
    setLoader(true);
    console.log(sendData.username);
    console.log(sendData.password);
    console.log(sendData.email);
    let correctedSendData = {
      username: sendData.username,
      email: sendData.email,
      password: sendData.password,
    };
    try {
      const { data } = await api.post("/auth/signup", correctedSendData);
      toast.success("アカウント登録しました。");
      return true;
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message ||
            "エラー発生。再度アカウント登録してください。",
          page: "register",
        },
      });
      return false;
    }
  };

/** ログイン中ユーザの住所を取得しReduxに保存 */
export const getUserAddress = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get(`/user/addresses`);
    let sList = [];
    let bList = [];
    let selectedSId = 0;
    let selectedBId = 0;
    data?.map((address) => {
      if (address.shippingAddress) {
        if (selectedSId === 0) selectedSId = address.addressId; // 更新日時が最新の住所を設定
        if (address.defaultAddressFlg) selectedSId = address.addressId;
        sList.push(address);
      } else {
        if (selectedBId === 0) selectedBId = address.addressId;
        if (address.defaultAddressFlg) selectedBId = address.addressId;
        bList.push(address);
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

export const sendUpdateAddressReq = (address) => async (dispatch, getState) => {
  let id = address.addressId;
  try {
    const { data } = await api.put(`/addresses/${id}`, address);
    let oldList = data.shippingAddress
      ? getState().auth.sAddressList
      : getState().auth.bAddressList;
    let newList = [];
    newList = oldList.map((addr) => {
      // 新規登録の住所がデフォルト設定の場合、前のデフォルト住所のフラグをfalseに変更
      if (addr.addressId === id) {
        return data;
      } else {
        return data.defaultAddressFlg && addr.defaultAddressFlg
          ? { ...addr, defaultAddressFlg: false }
          : addr;
      }
    });
    let type = data.shippingAddress
      ? "SET_SELECTED_SADDRESS"
      : "SET_SELECTED_BADDRESS";
    data.defaultAddressFlg && dispatch({ type: type, payload: data.addressId });
    let storeListType = data.shippingAddress
      ? "STORE_SADDRESSLIST"
      : "STORE_BADDRESSLIST";
    dispatch({ type: storeListType, payload: newList });
    let clearType = data.shippingAddress
      ? "CLEAR_TEMP_SHIPPING_ADDRESS"
      : "CLEAR_TEMP_BILLING_ADDRESS";
    dispatch({ type: clearType });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error);
  }
};

/** 注文履歴を取得 */
export const fetchOrderHistory = () => async (dispatch, getState) => {
  dispatch({
    type: "IS_FETCHING",
  });
  try {
    const { data } = await api.get(`/order-history`);
    dispatch({
      type: "STORE_ORDER_HISTORY",
      payload: data,
      lastPage: data.lastPage,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
    });
    localStorage.setItem("order", JSON.stringify(getState().order));
  } catch (error) {
    if (error.status === 404) {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message || "購入履歴はありません。",
          page: "order-history",
        },
      });
    } else {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message ||
            "購入履歴を取得できませんでした。",
          page: "order-history",
        },
      });
    }
    return;
  }
  dispatch({
    type: "IS_SUCCESS",
  });
};

export const storeTempAddress = (address) => async (dispatch, getState) => {
  address.shippingAddress
    ? dispatch({ type: "STORE_TEMP_SHIPPING_ADDRESS", payload: address })
    : dispatch({ type: "STORE_TEMP_BILLING_ADDRESS", payload: address });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const validateAddress = (sAddr) => async (dispatch, getState) => {
  const { tempSAddress, tempBAddress } = getState().auth;
  let address = sAddr ? tempSAddress : tempBAddress;
  let result =
    address.postalCode !== "" &&
    address.fullname.length > 1 &&
    address.streetAddress2.length > 1;
  let newErrors = {
    postalCode: address.postalCode === "",
    fullname: address.fullname.length < 2,
    streetAddress2: address.streetAddress2.length < 2,
  };
  if (sAddr) {
    result
      ? dispatch({ type: "CLEAR_SADDRESS_ERRORS" })
      : dispatch({ type: "STORE_SADDRESS_ERRORS", payload: newErrors });
  } else {
    result
      ? dispatch({ type: "CLEAR_BADDRESS_ERRORS" })
      : dispatch({ type: "STORE_BADDRESS_ERRORS", payload: newErrors });
  }
  return result;
};

export const deleteAddress =
  (sAddr, id, toast) => async (dispatch, getState) => {
    try {
      await api.delete(`/addresses/${Number(id)}`);
    } catch (error) {
      console.log(error);
    }
    const { sAddressList, bAddressList, selectedSAddrId, selectedBAddrId } =
      getState().auth;
    let newList = sAddr ? [...sAddressList] : [...bAddressList];
    newList = newList.filter((address) => {
      return address.addressId !== Number(id);
    });
    // 削除された住所がselectedAddressだったらリストの次の住所をselectedAddressに設定
    if (sAddr && selectedSAddrId === Number(id)) {
      let newSelectedAddrId = newList.length > 0 ? newList[0].addressId : 0;
      dispatch({ type: "SET_SELECTED_SADDRESS", payload: newSelectedAddrId });
    }
    if (!sAddr && selectedBAddrId === Number(id)) {
      let newSelectedAddrId = newList.length > 0 ? newList[0].addressId : 0;
      dispatch({ type: "SET_SELECTED_BADDRESS", payload: newSelectedAddrId });
    }
    let type = sAddr ? "STORE_SADDRESSLIST" : "STORE_BADDRESSLIST";
    dispatch({ type: type, payload: newList });
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
  dispatch({ type: "CLEAR_BADDRESS_ERRORS" });
  dispatch({ type: "CLEAR_SADDRESS_ERRORS" });
  dispatch({ type: "SET_ADDR_CHECKED_FALSE" });
  dispatch({ type: "CLEAR_TEMP_SHIPPING_ADDRESS" });
  dispatch({ type: "CLEAR_TEMP_BILLING_ADDRESS" });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const clearAuthData = () => async (dispatch, getState) => {
  dispatch({ type: "STORE_CLIENT_SECRET", payload: null });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

export const createClientSecret = () => async (dispatch, getState) => {
  const { cart } = getState().carts;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );
  const sendData = {
    amount: Number(totalPrice),
    currency: "jpy",
  };
  console.log("GETTING CLIENT SECRET!!!!");
  try {
    const { data } = await api.post(`/order/stripe-client-secret`, sendData);
    dispatch({ type: "STORE_CLIENT_SECRET", payload: data });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    if (error.status === 420) {
      dispatch({ type: "SET_COMMAND_IDX", payload: 1 });
    } else {
      dispatch({ type: "IS_ERROR", payload: error.message });
    }
  }
};

export const sendRefreshJwtTokenRequest = () => async (dispatch, getState) => {
  console.log("GETTING REFRESH TOKEN!!!!");
  try {
    let { data } = await api.post(`/auth/refreshtoken`);
    if (data.message === "Refresh Token has expired.") {
      console.log("REFRESH TOKEN EXPIRED!!!!");
      dispatch({ type: "SET_COMMAND_IDX", payload: 2 });
    } else {
      dispatch({ type: "SET_COMMAND_IDX", payload: 0 });
    }
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: error.message });
  }
};

export const submitReview =
  (content, stars, orderId, toast) => async (dispatch) => {
    let sendData = {
      reviewContent: content,
      stars: stars,
    };
    try {
      let { data } = await api.post(`/review/${orderId}`, sendData);
      toast.success(`注文番号${orderId}に関するレビューを投稿しました。`);
    } catch (error) {
      toast.error(`エラー発生。`);
    }
  };

export const fetchReviews = () => async (dispatch, getState) => {
  try {
    let { data } = await api.get(`/public/reviews`);
    console.log(data);
    dispatch({
      type: "STORE_REVIEWS",
      payload: data,
    });
    //localStorage.setItem("reviews", JSON.stringify(getState().reviews));
  } catch (error) {
    console.log(error);
  }
};

export const setErrorMessage = (msg) => async (dispatch) => {
  dispatch({ type: "IS_ERROR", payload: msg });
};

export const clearErrorMessage = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

export const setModalOpen = () => async (dispatch, getState) => {
  dispatch({ type: "OPEN_MODAL" });
};

export const setModalLogin = () => async (dispatch, getState) => {
  dispatch({ type: "LOGIN_ONLY" });
};

export const setModalCheckout = () => async (dispatch, getState) => {
  dispatch({ type: "CHECKOUT" });
};

export const closeModal = () => async (dispatch, getState) => {
  dispatch({ type: "SET_FALSE" });
};

export const setCommandIdx = (idx) => async (dispatch, getState) => {
  dispatch({ type: "SET_COMMAND_IDX", payload: idx });
};
