import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrderHistory } from "../store/actions";
import toast from "react-hot-toast";

const useOrderHistoryPages = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
    const currPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const sortOrder = searchParams.get("sortOrder") || null;
    if (sortOrder) params.set("sortOrder", sortOrder);
    params.set("pageNumber", currPage - 1);
    let queryString = params.toString();
    if (queryString?.length > 0) queryString = "?" + queryString;
    dispatch(fetchOrderHistory(queryString, toast));
    console.log("fetch order history fired");
  }, [dispatch, searchParams]);
};

export default useOrderHistoryPages;
