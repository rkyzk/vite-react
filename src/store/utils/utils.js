import api from "../../api/axiosDefaults";

/** Send logout request */
const sendLogoutRequest = async (id, toast, dispatch, path) => {
  await api.post(`/auth/signout/${id}`);
  console.log("not deleting auth");
  if (path !== "/order-confirm") {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.setItem("auth", null);
  }
  // localStorage.setItem("cartItems", []);
  // dispatch({ type: "CLEAR_CART" });
};

export const sendRefreshJwt = async (toast, path, dispatch, getState) => {
  console.log("refreshing JWT");
  try {
    let { data } = await api.post(`/auth/refreshtoken`);
    if (data.message === "JWT has been regenerated.") {
      return true;
    } else if (data.message === "Refresh Token has expired.") {
      let userId = getState().auth.user.id;
      // logout the user
      await sendLogoutRequest(userId, toast, dispatch, path);
      // set login dialog & destination path after login
      await dispatch({
        type: "SET_MODAL",
        payload: { loginOnly: true, destPath: path, error: true },
      });
      // open login dialog
      dispatch({ type: "OPEN_MODAL" });
      return false;
    }
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: { errorMessage: error.message } });
    return false;
  }
};
