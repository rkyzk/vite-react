import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  updateCartAddQty,
  fetchProductDetail,
  clearErrorMessage,
  fetchProducts,
} from "../../store/actions";
import { FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import Spinner from "../shared/Spinner";
import styles from "../../styles/Product.module.css";
import ProductImage from "./ProductImage";
import tulipAdditionalNotes from "../../utils/tulipAdditionalNotes";
import { BsDot } from "react-icons/bs";
import dahliaAdditionalNotes from "../../utils/dahliaAdditionalNotes";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products } = useSelector((state) => state.products);
  const product = products.filter((prod) => prod.id === Number(id));
  const { productName, quantity, price, imagePath, category } = product[0];
  const [qty, setQty] = useState(1);
  const { productDetails } = useSelector((state) => state.products);
  let productDetail = productDetails ? productDetails[Number(id)] : {};

  useEffect(
    (productDetail) => {
      errorMessage && dispatch(clearErrorMessage());
      !products && dispatch(fetchProducts(""));
      if (
        productDetails === undefined ||
        productDetail === undefined ||
        Object.keys(productDetail).length === 0
      ) {
        dispatch(fetchProductDetail(Number(id)));
      }
      productDetail = productDetails && productDetails[Number(id)];
    },
    [productDetails],
  );

  const isAvailable = quantity && Number(quantity) > 0;
  const addToCart = (id) => {
    dispatch(updateCartAddQty(Number(id), qty, toast));
  };

  return (
    <div className="flex mt-3 justify-center px-1">
      {isLoading ? (
        <Spinner className="mx-auto" />
      ) : (
        errorMessage && (
          <div className="mx-auto">
            <FaExclamationTriangle className="text-slate-600 text-3xl mr-2" />
            <p className="text-lg text-slate-600">{errorMessage}</p>
          </div>
        )
      )}
      {productDetail &&
        Object.keys(productDetail).length > 0 &&
        !errorMessage && (
          <div className="flex-col">
            <div className="grid grid-col-1 mx-auto md:grid-cols-2 md:w-11/12 max-w-250">
              <ProductImage
                imagePath={imagePath}
                productName={productName}
                productDetail={productDetail}
              />
              <div>
                <div
                  className={`mt-3 w-77.5 px-2 mx-auto ${styles.Description}`}
                >
                  <h2 className="font-[1rem] md:text-2xl">{productName}</h2>
                  <div className="md:ml-4">
                    <div>
                      {category.categoryId === 4 ? (
                        <span className="text-amber-800">
                          &yen;{price} (6 tubers)
                        </span>
                      ) : (
                        <span className="text-amber-800">
                          &yen;{price} (12 bulbs)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 md:ml-4">
                    <div className="flex gap-2">
                      {isAvailable && (
                        <div>
                          <label className="mt-1 mr-1" htmlFor="quantity">
                            Quantity
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
                          <span>Add to cart</span>
                        </div>
                      ) : (
                        "Out of stock"
                      )}
                    </button>
                  </div>
                </div>
                <div className="px-2 mt-4 mx-auto lg:px-0">
                  <hr />
                  {productDetail
                    .filter((elem) => elem.key != "imagePath")
                    .map((item, id) => {
                      return (
                        <div
                          className={
                            item["key"] === "Description" ? "mb-4" : "mb-1"
                          }
                          style={{ display: "flex" }}
                        >
                          {item["key"] === "Description" ? (
                            <>{item["value"]}</>
                          ) : (
                            <>
                              <div className="w-30">
                                <span className="text-md/5 font-bold" key={id}>
                                  {item["key"]}
                                </span>
                              </div>
                              <div style={{ width: "calc(100% - 120px)" }}>
                                <span>{item["value"]}</span>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div
              className={`${styles.Notes} px-2 md:w-11/12 max-w-250 mx-auto`}
            >
              <h3 className={`${styles.NotesHeading}`}>Additional Notes:</h3>
              {category.categoryId === 1 && tulipAdditionalNotes}
              {category.categoryId === 4 && dahliaAdditionalNotes}
            </div>
          </div>
        )}
    </div>
  );
};

export default ProductDetail;
