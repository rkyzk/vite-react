import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { FaExclamationTriangle } from "react-icons/fa";
import useProductFilter from "../hooks/useProductFilter";
import { fetchProducts, clearErrorMessage } from "../store/actions";
import { useEffect } from "react";
import Filter from "./Filter";
import PaginationSection from "./shared/PaginationSection";
import styles from "../styles/Products.module.css";
import Spinner from "./shared/Spinner";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, pagination } = useSelector((state) => state.products);

  useProductFilter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrorMessage());
    dispatch(fetchProducts(""));
  }, []);

  return (
    <>
      <Filter />
      <div className="px-2 py-10 flex justify-center sm:px-8 lg:px-14">
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <>
            <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
            <p className="text-lg text-slate-600">{errorMessage}</p>
          </>
        ) : (
          <div
            className={`${styles.imgGap} grid gap-y-10 sm:gap-x-4 xs:grid-col-1 sm:grid-cols-2 lg:grid-cols-3
              2xl:grid-cols-4`}
          >
            {products &&
              products.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
          </div>
        )}
      </div>
      <PaginationSection totalPages={Number(pagination?.totalPages)} />
    </>
  );
};

export default Products;
