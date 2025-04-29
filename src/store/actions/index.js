import axiosReq from "../../api/axiosDefaults";

export const fetchProducts = (searchTerms) => async (dispatch) => {
  try {
    dispatch({
      type: "IS_FETCHING",
    });
    let searchPhrase = "";
    if (searchTerms != null && searchTerms != "") {
      searchPhrase = "/keywords/" + searchTerms;
    }
    const { data } = await axiosReq.get(`/public/products` + searchPhrase);
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
    const { data } = await axiosReq.get(`/admin/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
