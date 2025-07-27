import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchFeaturedProducts, fetchProducts } from "../../store/actions";
import ProductCard from "../ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import Spinner from "../shared/Spinner";
import styles from "../../styles/Products.module.css";

const Home = () => {
  const { featuredProducts } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <HeroBanner />
      <h2 className="mt-2 font-[Amatic_SC] font-extrabold ml-3 sm:ml-8 md:ml-14">
        Featured Products
      </h2>
      <div className="flex w-full px-2 sm:px-8 lg:px-14">
        {isLoading ? (
          <Spinner className="mx-auto" />
        ) : errorMessage ? (
          <>
            <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
            <p className="text-lg text-slate-600">{errorMessage}</p>
          </>
        ) : (
          <div
            className={`${styles.imgGap} mx-auto grid gap-y-10 xs:grid-col-1 sm:gap-x-4  sm:grid-cols-2 lg:grid-cols-3
                      2xl:grid-cols-4`}
          >
            {featuredProducts?.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
