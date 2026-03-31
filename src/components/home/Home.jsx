import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { clearErrorMessage, fetchProducts } from "../../store/actions";
import { FaExclamationTriangle } from "react-icons/fa";
import Spinner from "../shared/Spinner";
import styles from "../../styles/Home.module.css";
import { Link } from "react-router-dom";
import SimpleSlider from "./SimpleSlider";

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const { isLoading, errorMessage, page } = useSelector(
    (state) => state.errors,
  );
  const dispatch = useDispatch();
  const IMAGES = [
    {
      0: 1,
      1: "Tulips",
      2: "https://res.cloudinary.com/ds66fig3o/image/upload/v1774786200/ecommerce/images/products/1/tulipa-barcelona_zi4nhn.jpg",
    },
    {
      0: 2,
      1: "Hyacinths",
      2: "https://res.cloudinary.com/ds66fig3o/image/upload/v1774786242/ecommerce/images/products/2/grape-hyacinth_nfkuoe.jpg",
    },
    {
      0: 3,
      1: "Crocusses",
      2: "https://res.cloudinary.com/ds66fig3o/image/upload/v1774786237/ecommerce/images/products/3/advance-crocus_nymq0l.jpg",
    },
    {
      0: 4,
      1: "Dahlias",
      2: "https://res.cloudinary.com/ds66fig3o/image/upload/v1774786222/ecommerce/images/products/4/dahlia-caf%C3%A9-au-lait_yya5yz.jpg",
    },
  ];
  useEffect(() => {
    dispatch(clearErrorMessage());
    !products && dispatch(fetchProducts(""));
  }, []);

  return (
    <div className="px-2 mt-1 sm:px-8 lg:px-14">
      <HeroBanner />
      <div className={`${styles.Intro} flex mt-2 px-2`}>
        <p className="max-w-[640px] mx-auto">
          Bring your garden to life with Wild Blossom Garden! We specialize in
          high-quality, organic bulbs from early spring crocuses to summer
          dahlias. Pure, sustainable, and ready to plant. Explore our shop and
          get growing!
        </p>
      </div>
      <hr />
      <div className="flex">
        {isLoading ? (
          <Spinner className="ml-20" />
        ) : errorMessage && page === "home" ? (
          <>
            <FaExclamationTriangle className="text-slate-600 text-3xl ml-20 mr-2" />
            <p className="text-lg text-slate-600">{errorMessage}</p>
          </>
        ) : (
          <div
            className="mx-auto grid gap-3 xs:grid-col-1 sm:grid-cols-2 lg:grid-cols-3
                      2xl:grid-cols-4"
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
      </div>
      <SimpleSlider />
    </div>
  );
};

export default Home;
