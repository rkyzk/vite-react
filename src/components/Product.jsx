import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateCart, fetchProductDetail } from "../store/actions";
import { FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import Spinner from "./shared/Spinner";
import styles from "../styles/Product.module.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const product = products.filter((prod) => prod.id === Number(id));
  const { productName, quantity, price, imageName } = product[0];
  const [qty, setQty] = useState(1);
  const { productDetails } = useSelector((state) => state.products);
  const productDetail = productDetails ? productDetails[Number(id)] : {};
  useEffect(() => {
    dispatch(fetchProductDetail(Number(id)));
  }, []);

  const isAvailable = quantity && Number(quantity) > 0;
  const addToCart = (id) => {
    dispatch(updateCart(Number(id), qty, toast));
  };

  return (
    <div className="flex">
      {isLoading ? (
        <Spinner className="mx-auto" />
      ) : errorMessage ? (
        <div className="mx-auto">
          <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
          <p className="text-lg text-slate-600">{errorMessage}</p>
        </div>
      ) : (
        <div
          className={`${styles.Box} "xs:grid-col-1 md:grid-cols-2 md:mt-5 grid justify-center xs:px-3 sm:px-5 lg:px-14"`}
        >
          <div>
            <img
              className={`${styles.Img}`}
              src={`/src/assets/products/${imageName}`}
              alt={productName}
            />
          </div>
          <div className="mt-3 md:mt-0">
            <h1 className="text-xl font-semi-bold">{productName}</h1>
            <div className={`${styles.PrcQty} "my-1 justify-between gap-1"`}>
              <div className="mt-1">
                <span className="text-md md:text-xl">
                  &yen;{price} for 12 bulbs
                </span>
              </div>
              <div className="flex">
                {isAvailable && (
                  <div className="mr-1">
                    <label htmlFor="quantity" className="mr-2">
                      Qty
                    </label>
                    <select
                      name="quantity"
                      className="border bg-white rounded-lg py-2 pl-1"
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(30)]
                        .map((_, i) => i + 1)
                        .map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
                <button
                  className={`${
                    isAvailable
                      ? "bg-neutral-100 text-gray-900 hover:bg-neutral-600 hover:text-white"
                      : "bg-gray-400 text-gray-700"
                  } ${styles.Button} p-1 border`}
                  onClick={() => addToCart(id)}
                >
                  {isAvailable ? (
                    <div className="flex">
                      <FaShoppingCart className="mt-1 mr-1" />
                      <span>カートに追加</span>
                    </div>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            </div>
            <div className="mt-2">
              {productDetail &&
                Object.keys(productDetail).map((item, id) => {
                  return (
                    <p className="font-bold" key={id}>
                      {item !== "Description" && <>{item} : </>}
                      <span className="font-normal">{productDetail[item]}</span>
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
