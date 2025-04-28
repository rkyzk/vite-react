import axiosReq from "../../api/axiosDefaults";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axiosReq.get(`/public/products`);
    console.log(data);
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
    console.log(error);
  }
};
