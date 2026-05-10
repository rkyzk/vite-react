import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import {
  clearErrorMessage,
  fetchProducts,
  fetchReviews,
} from "../../store/actions";
import { FaExclamationTriangle } from "react-icons/fa";
import Spinner from "../shared/Spinner";
import styles from "../../styles/Home.module.css";
import menuStyles from "../../styles/MenuColumn.module.css";
import { Link } from "react-router-dom";
import MenuColumn from "../shared/MenuColumn";
import ReviewEntry from "./ReviewEntry";
import { IMAGES } from "../../constants/constants";

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage, page } = useSelector(
    (state) => state.errors,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrorMessage());
    !products && dispatch(fetchProducts(""));
    dispatch(fetchReviews());
  }, []);

  return (
    <div>
      <div className="lg:flex">
        <div className={`${menuStyles.MenuCol} hidden lg:block`}>
          <MenuColumn />
        </div>
        <div className={`${menuStyles.ContentBox} px-2 pt-1 sm:px-8 lg:px-0`}>
          <HeroBanner />
          <div className={`${styles.Intro} flex px-2 max-w-218`}>
            <p className="mx-auto max-w-160">
              Bring your garden to life with Wild Blossom Garden! We specialize
              in high-quality, organic bulbs from early spring crocuses to
              summer dahlias. Pure, sustainable, and ready to plant. Explore our
              shop and get growing!
            </p>
          </div>
          <hr />
        </div>
      </div>
      <h2
        style={{ fontSize: "1.3rem", fontFamily: "M PLUS Rounded 1c" }}
        className="text-center font-bold mt-2"
      >
        View our Collection
      </h2>
      {isLoading ? (
        <Spinner className="w-9 mx-auto" />
      ) : errorMessage && page === "home" ? (
        <>
          <FaExclamationTriangle className="text-slate-600 text-3xl ml-20 mr-2" />
          <p className="text-lg text-slate-600">{errorMessage}</p>
        </>
      ) : (
        <div
          className={`${styles.FeaturedProd} grid gap-2 sm:grid-cols-2 sm:w-160 xl:grid-cols-3 xl:w-245 mx-auto`}
        >
          {IMAGES.map((elem) => (
            <div key={elem[0]} className={`${styles.Card} relative`}>
              <Link to={`/products?category=${elem[0]}`}>
                <img
                  className={`${styles.imgSize} cursor-pointer absolute`}
                  src={`${elem[2]}`}
                  alt={elem[1]}
                />
                <p className="text-white absolute top-1 left-1 text-xl">
                  {elem[1]}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <ReviewEntry />
    </div>
  );
};

export default Home;
