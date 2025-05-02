import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchFeaturedProducts } from "../../store/actions";
import ProductCard from "../ProductCard";

const Home = () => {
  // const { featuredProducts } = useSelector((state) => state.featuredProducts);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchFeaturedProducts());
  // }, [dispatch]);

  return (
    <>
      <HeroBanner />
      <div className="w-10/12 max-w-7xl m-auto ">
        <h2 className="font-[Amatic_SC] font-extrabold md: mt-2">
          Featured Products
        </h2>
        <div
          className="m-auto grid xs:grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4
          gap-4"
        >
          {/* {featuredProducts?.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))} */}
        </div>
      </div>
    </>
  );
};

export default Home;
