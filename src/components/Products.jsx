import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { FaExclamationTriangle } from "react-icons/fa";
import useProductFilter from "../hooks/useProductFilter";
import { fetchCategories } from "../store/actions";
import { useEffect } from "react";
import Filter from "./Filter";
import PaginationSection from "./shared/PaginationSection";
import styles from "../styles/Products.module.css";
import Spinner from "./shared/Spinner";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);

  useProductFilter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // const isLoading = false;
  // const errorMessage = null;
  // const products = [
  //   {
  //     productId: 1,
  //     name: "abc",
  //     image: "https//placehold.co/600x400",
  //     description: "blah blah blah",
  //     price: "$200",
  //     quantity: 50,
  //   },
  //   {
  //     productId: 2,
  //     name: "def",
  //     image: "https//placehold.co/600x400",
  //     description: "blah blah blah",
  //     price: "$150",
  //     quantity: 0,
  //   },
  //   {
  //     productId: 3,
  //     name: "def",
  //     image: "https//placehold.co/600x400",
  //     description:
  //       "this is the description of this product." +
  //       "it is an excellent product, so you'd better buy a lot." +
  //       "I don't think this went over 90 chars yet.",
  //     price: "$150",
  //     quantity: 50,
  //   },
  //   {
  //     productId: 4,
  //     name: "def",
  //     image: "https//placehold.co/600x400",
  //     description: "blah blah blah",
  //     price: "$150",
  //     quantity: 30,
  //   },
  // ];
  const categories = [
    { categoryId: 1, categoryName: "tulips" },
    { categoryId: 2, categoryName: "hyacinth" },
    { categoryId: 3, categoryName: "crocus" },
  ];
  return (
    <>
      <Filter />
      <div className="px-2 py-14 flex justify-center sm:px-8 lg:px-14">
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
      {/* <PaginationSection totalPages={Number(pagination.totalPages)} /> */}
    </>
  );
};

export default Products;
