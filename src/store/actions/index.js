import axiosReq from "../../api/axiosDefaults";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "IS_FETCHING",
    });
    const { data } = await axiosReq.get(`/2public/products`);
    await delay(2000);
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
      type: "ERROR",
      errors: "failed to load data.",
    });
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
