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
    const colors = searchParams.get("colors") || null;
    const sort = searchParams.get("sortBy") || null;
    if (category && category != "") params.set("category", category);
    if (keywords) params.set("keywords", keywords);
    if (colors) params.set("colors", colors);
    if (sort) params.set("sortBy", sort);
    params.set("pageNumber", currPage - 1);
    const queryString = params.toString();
    dispatch(fetchProducts(queryString));
  }, [dispatch, searchParams]);
};

export default useProductFilter;
