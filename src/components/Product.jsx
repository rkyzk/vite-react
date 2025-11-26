import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  updateCart,
  fetchProductDetail,
  clearErrorMessage,
  fetchProducts,
} from "../store/actions";
import { FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import Spinner from "./shared/Spinner";
import styles from "../styles/Product.module.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const product = products.filter((prod) => prod.id === Number(id));
  const { productName, quantity, price, imageName, category } = product[0];
  const [qty, setQty] = useState(1);
  const { productDetails } = useSelector((state) => state.products);
  let productDetail = productDetails ? productDetails[Number(id)] : {};

  useEffect((productDetail) => {
    errorMessage && dispatch(clearErrorMessage());
    !products && dispatch(fetchProducts(""));
    if (
      productDetails === undefined ||
      productDetail === undefined ||
      Object.keys(productDetail).length === 0
    ) {
      dispatch(fetchProductDetail(Number(id)));
    }
    productDetail = productDetails ? productDetails[Number(id)] : {};
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
          className={`${styles.Box} xs:grid-col-1 md:mt-5 md:grid-cols-2 grid justify-center xs:px-3 sm:px-5 lg:px-14`}
        >
          <div>
            <img
              className={`${styles.Img}`}
              src={`/src/assets/products/${imageName}`}
              alt={productName}
            />
          </div>
          <div>
            <h2 className="text-2xl">{productName}</h2>
            <div className={`${styles.PrcQty} my-1 gap-1`}>
              <div>
                {category.categoryId === 4 ? (
                  <span>&yen;{price} (球根6個)</span>
                ) : (
                  <span>&yen;{price} (球根12個)</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="mt-[-2px] flex gap-2">
                {isAvailable && (
                  <div>
                    <label className="mt-1 mr-1" htmlFor="quantity">
                      数個
                    </label>
                    <select
                      name="quantity"
                      className="border bg-white rounded-lg pb-1 ml-1"
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
              </div>
              <button
                className={`${
                  isAvailable
                    ? "bg-neutral-100 text-gray-900 hover:bg-neutral-600 hover:text-white"
                    : "bg-gray-400 text-gray-700"
                } ${styles.Button} p-1 ml-2`}
                onClick={() => addToCart(id)}
              >
                {isAvailable ? (
                  <div className="flex">
                    <FaShoppingCart className="mt-1 mr-1" />
                    <span>カートに追加</span>
                  </div>
                ) : (
                  "在庫なし"
                )}
              </button>
            </div>
            <div className="mt-4">
              {productDetail &&
                Object.keys(productDetail).length !== 0 &&
                productDetail.map((item, id) => {
                  return (
                    <p className="font-bold" key={id}>
                      {item["key"] !== "Description" && <>{item["key"]} : </>}
                      <span className="font-normal">{item["value"]}</span>
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
