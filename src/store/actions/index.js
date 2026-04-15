import api from "../../api/axiosDefaults";

/** ge products data */
export const fetchProducts = (queryString) => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_PRODUCTS",
  });
  dispatch({
    type: "IS_FETCHING",
  });
  try {
    const { data } = await api.get(`/public/products${queryString}`);
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
            error?.response?.data?.message || "No matching products found.",
          page: "products",
        },
      });
    } else {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message ||
            "There was an error.  Unable to fetch products data.",
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

/** get categories */
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
    console.log(error?.response?.data);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        "There was an error. Failed to fetch category data.",
      page: "Filter",
    });
  }
};

/* currently not in use */
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
        "There was an error. Failed to fetch featured products.",
    });
  }
};

/** get product details */
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
        "There was an error. Failed to fetch products details.",
    });
  }
};

/** update product quantity in cart when "Add to Cart" is clicked. (qty: quantity to add) */
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
    toast.success("Products have been added to your cart.");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }
};

/** Update product quantity in cart from the pull down botton on cart page.
 * qty: total quantity of the product in cart */
export const updateCart = (id, qty, toast) => (dispatch, getState) => {
  const { cart } = getState().carts;
  let cartItemData = cart?.find((item) => item.id === id);
  let isQuantityInStock;
  let oldPurchaseQty = cartItemData.purchaseQty;
  let qtyAdded = qty - oldPurchaseQty;
  if (cartItemData) {
    isQuantityInStock = qtyAdded <= cartItemData.quantity;
  } else {
    // normally impossible
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
    toast.success("Product quantity in the card has been updated.");
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  }
};

/** Delete a product from the cart */
export const removeItemFromCart = (prodId) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: prodId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

/**
 * send request to place order
 * (no new address data is included.
 *  already existimg address will be used.)
 */
export const sendOrder = (data) => async (dispatch, getState) => {
  const { cart } = getState().carts;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0,
  );
  const items = cart.map((item) => {
    return { product: { ...item }, quantity: item.purchaseQty };
  });
  // get shipping and billing addresses
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
    // If JWT has expired, set commandIdx = 1 so a request will be sent
    // to regenerate JWT.
    if (error.status === 420) {
      dispatch({
        type: "SET_COMMAND_IDX",
        payload: 1,
      });
    }
    return false;
  }
};

/** Send request to place order (including new address data) */
export const sendOrderWithNewAddresses =
  (data) => async (dispatch, getState) => {
    const id = getState().auth.user.id;
    const cart = getState().carts.cart;
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr?.price * curr?.purchaseQty,
      0,
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
      // If JWT has expired, set commandIdx = 1 so a request will be sent
      // to regenerate JWT.
      if (error.status === 420) {
        dispatch({
          type: "SET_COMMAND_IDX",
          payload: 1,
        });
      }
      return false;
    }
  };

/** Insert address in DB */
export const saveNewAddress =
  (address, sAddr) => async (dispatch, getState) => {
    let responseAddr = null;
    address.defaultAddressFlg = true;
    if (address.saveAddr) {
      try {
        responseAddr = await api.post(`/addresses`, address);
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    } else {
      try {
        responseAddr = await api.post(`/addresses/anonym`, address);
      } catch (error) {
        console.log(error.response?.data?.message);
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

/** Send Login request */
export const sendLoginRequest =
  (sendData, toast, setLoader) => async (dispatch, getState) => {
    setLoader(true);
    try {
      const { data } = await api.post(`/auth/signin`, sendData);
      setLoader(false);
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
      toast.success("You've been logged in.");
      return true;
    } catch (error) {
      setLoader(false);
      if (error.response?.data?.message === "Bad credentials") {
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage: "Username or password is wrong",
            page: "login",
          },
        });
      } else {
        console.log(error.response?.data?.message);
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage: "There was an error.  Please try again.",
            page: "login",
          },
        });
      }
      return false;
    }
  };

/** Send logout request */
export const sendLogoutRequest = (id, navigate, toast) => async (dispatch) => {
  await api.post(`/auth/signout/${id}`);
  dispatch({ type: "LOGOUT_USER" });
  localStorage.setItem("auth", null);
  if (navigate) {
    toast.success("You've been logged out.");
    localStorage.setItem("cartItems", []);
    dispatch({
      type: "CLEAR_CART",
    });
    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
    });
    navigate(`/`);
  } else {
    // If refresh token has expired, prompt users to log in again.
    dispatch({
      type: "IS_ERROR",
      payload: "Please log in again.",
    });
  }
};

/** Send register request */
export const sendRegisterRequest =
  (sendData, toast, setLoader) => async (dispatch) => {
    setLoader(true);
    dispatch({
      type: "CLEAR_ERROR_MESSAGE",
    });
    let correctedSendData = {
      username: sendData.regUsername,
      email: sendData.regEmail,
      password: sendData.regPassword,
    };
    try {
      const { data } = await api.post("/auth/signup", correctedSendData);
      toast.success("Your account has been created.  Please log in.");
      return true;
    } catch (error) {
      if (error.response?.data?.message === "Username is already in use.") {
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage: "Username is already in use.",
            page: "register",
          },
        });
      } else {
        dispatch({
          type: "IS_ERROR",
          payload: {
            errorMessage:
              error?.response?.data?.message ||
              "There was an error.  Please try again.",
            page: "register",
          },
        });
      }
      return false;
    }
  };

/** Get addresses of logged in user and store them in Redux. */
export const getUserAddress = () => async (dispatch, getState) => {
  try {
    const { data } = await api.get(`/user/addresses`);
    let sList = [];
    let bList = [];
    let selectedSId = 0;
    let selectedBId = 0;
    data?.map((address) => {
      if (address.shippingAddress) {
        // set the last updated address as selected address.
        if (selectedSId === 0) selectedSId = address.addressId;
        // if default address exists, set it as selected address.
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
    console.log(error.response?.data?.message);
  }
};

/** Send request to updated address */
export const sendUpdateAddressReq = (address) => async (dispatch, getState) => {
  let id = address.addressId;
  try {
    const { data } = await api.put(`/addresses/${id}`, address);
    let oldList = data.shippingAddress
      ? getState().auth.sAddressList
      : getState().auth.bAddressList;
    let newList = [];
    newList = oldList.map((addr) => {
      // If new address is set as default address,
      // set the default address flag of the old default address to false.
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
    console.log(error.response?.data?.message);
  }
};

/** Get order history of the user */
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
    if (error.status === 401) {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message || "No order history found.",
          page: "order-history",
        },
      });
    } else if (error.status === 420) {
      dispatch({ type: "SET_COMMAND_IDX", payload: 1 });
    } else {
      dispatch({
        type: "IS_ERROR",
        payload: {
          errorMessage:
            error?.response?.data?.message ||
            "There was an error. Failed to fetch order history.",
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

/** Store addresses in Redux. */
export const storeTempAddress = (address) => async (dispatch, getState) => {
  address.shippingAddress
    ? dispatch({ type: "STORE_TEMP_SHIPPING_ADDRESS", payload: address })
    : dispatch({ type: "STORE_TEMP_BILLING_ADDRESS", payload: address });
  localStorage.setItem("auth", JSON.stringify(getState().auth));
};

/**
 * Validate addresses
 *
 * postal code: error if empty
 * fullname length: error if less than 2
 * streetAddress1 length: error if less than 2
 */
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

/**
 * Delete address
 */
export const deleteAddress =
  (sAddr, id, toast) => async (dispatch, getState) => {
    try {
      await api.delete(`/addresses/${Number(id)}`);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
    const { sAddressList, bAddressList, selectedSAddrId, selectedBAddrId } =
      getState().auth;
    let newList = sAddr ? [...sAddressList] : [...bAddressList];
    newList = newList.filter((address) => {
      return address.addressId !== Number(id);
    });
    // if selected address has been deleted,
    // set the next address in the list as selected address
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
    if (isSAddr) {
      dispatch({ type: "SET_SELECTED_SADDRESS", payload: selectedAddrId });
      dispatch({ type: "CLEAR_SADDRESS_ERRORS" });
    } else {
      dispatch({ type: "SET_SELECTED_BADDRESS", payload: selectedAddrId });
      dispatch({ type: "CLEAR_BADDRESS_ERRORS" });
    }
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

/**
 * Request client secret and store it in Redux.
 */
export const createClientSecret = () => async (dispatch, getState) => {
  const { cart } = getState().carts;
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0,
  );
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
      dispatch({ type: "SET_COMMAND_IDX", payload: 1 });
    } else {
      dispatch({ type: "IS_ERROR", payload: error.message });
    }
  }
};

/**
 * Request to regenerate JWT.
 */
export const sendRefreshJwtTokenRequest = () => async (dispatch) => {
  try {
    let { data } = await api.post(`/auth/refreshtoken`);
    if (data.message === "Refresh Token has expired.") {
      dispatch({ type: "SET_COMMAND_IDX", payload: 2 });
    } else {
      dispatch({ type: "SET_COMMAND_IDX", payload: 0 });
    }
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: error.message });
  }
};

/**
 * Insert reviews in DB
 */
export const submitReview = (content, stars, orderId, toast) => async () => {
  let sendData = {
    reviewContent: content,
    stars: stars,
  };
  try {
    let { data } = await api.post(`/review/${orderId}`, sendData);
    toast.success(`Submitted a review entry regarding your order: ${orderId}`);
    return true;
  } catch (error) {
    toast.error("There was an error. Please try again.");
    return false;
  }
};

/**
 * Get review entries.
 */
export const fetchReviews = () => async (dispatch, getState) => {
  try {
    let { data } = await api.get(`/public/reviews`);
    dispatch({
      type: "STORE_REVIEWS",
      payload: data,
    });
    localStorage.setItem("auth", JSON.stringify(getState().auth));
  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

export const setErrorMessage = (msg) => async (dispatch) => {
  dispatch({ type: "IS_ERROR", payload: msg });
};

export const clearErrorMessage = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

export const setModalOpen = () => async (dispatch) => {
  dispatch({ type: "OPEN_MODAL" });
};

export const setModalLogin = () => async (dispatch) => {
  dispatch({ type: "LOGIN_ONLY" });
};

export const setModalCheckout = () => async (dispatch) => {
  dispatch({ type: "CHECKOUT" });
};

export const closeModal = () => async (dispatch) => {
  dispatch({ type: "SET_FALSE" });
};

export const setCommandIdx = (idx) => async (dispatch) => {
  dispatch({ type: "SET_COMMAND_IDX", payload: idx });
};
