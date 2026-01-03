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
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const IMAGES = [
    { 0: 1, 1: "チューリップ", 2: "tulipa-barcelona.jpg" },
    { 0: 2, 1: "ヒヤシンス", 2: "grape-hyacinth.jpg" },
    { 0: 3, 1: "クロッカス", 2: "advance-crocus.jpg" },
    { 0: 4, 1: "ダリア", 2: "dahlia-white-nettie.jpg" },
  ];
  useEffect(() => {
    dispatch(clearErrorMessage());
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
            className="mx-auto grid gap-3 xs:grid-col-1 sm:grid-cols-2 lg:grid-cols-3
                      2xl:grid-cols-4"
          >
            {IMAGES.map((elem) => (
              <div key={elem[0]} className={`${styles.Card} relative`}>
                <Link to={`/products?category=${elem[0]}`}>
                  <img
                    className={`${styles.imgSize} cursor-pointer absolute`}
                    src={`/src/assets/products/${elem[2]}`}
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
