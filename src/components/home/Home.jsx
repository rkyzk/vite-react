import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import {
  fetchFeaturedProducts,
  clearErrorMessage,
  fetchProducts,
} from "../../store/actions";
import ProductCard from "../ProductCard";
import { FaExclamationTriangle } from "react-icons/fa";
import { PiPlantLight } from "react-icons/pi";
import Spinner from "../shared/Spinner";
import styles from "../../styles/Products.module.css";
import homeStyles from "../../styles/Home.module.css";

const Home = () => {
  const { featuredProducts } = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrorMessage());
    !featuredProducts && dispatch(fetchFeaturedProducts());
    !products && dispatch(fetchProducts(""));
  }, []);

  return (
    <div className="px-2 mt-1 sm:px-8 lg:px-14">
      <HeroBanner />
      <div className="flex mt-1">
        <p className="max-w-[640px] mx-auto">
          無農薬でチューリップ、ヒヤシンスなどの球根を栽培・販売しています。
          <br />
          お庭やベランダでの家庭菜園はもちろん、季節のギフトやプレゼントにもオススメです。
        </p>
      </div>
      <hr />
      <div
        className={`${homeStyles.FeaturedHeading} flex flex-row justify-start mt-2`}
      >
        <PiPlantLight className="text-3xl" />
        <h2 className="text-slate-600 w-[165px] ml-2 mt-1">おすすめ</h2>
      </div>
      <div className="flex">
        {isLoading ? (
          <Spinner className="ml-20" />
        ) : errorMessage ? (
          <>
            <FaExclamationTriangle className="text-slate-600 text-3xl ml-20 mr-2" />
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
