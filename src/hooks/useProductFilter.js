import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../store/actions";

const useProductFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
    const currPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const category = searchParams.get("category") || null;
    const keywords = searchParams.get("keywords") || null;
    if (category) params.set("category", Number(category));
    if (keywords) params.set("keywords", keywords);
    params.set("pageNumber", currPage - 1);
    const queryString = params.toString();
    dispatch(fetchProducts(queryString));
  }, [dispatch, searchParams]);
};

export default useProductFilter;
