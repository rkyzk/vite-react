import api from "../api/axiosDefaults.js";
import {
  sendLogoutRequest,
  setModalOpen,
  setModalLogin,
  setErrorMessage,
} from "../store/actions/index.js";

/**
 * Request to regenerate JWT.
 */
export const sendRefreshJwt = (id, toast) => async (dispatch) => {
  console.log("hi");
  try {
    let { data } = await api.post(`/auth/refreshtoken`);
    if (data.message === "Refresh Token has expired.") {
      await sendLogoutRequest(id, null, toast);
      await setErrorMessage("Please login again.");
      await setModalLogin();
      setModalOpen();
    } else {
      return true;
    }
  } catch (error) {
    dispatch({ type: "IS_ERROR", payload: error.message });
  }
};
