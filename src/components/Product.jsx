import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateCart } from "../store/actions";
import { FaShoppingCart } from "react-icons/fa";

const Product = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const [product] = products.filter((item) => item.id === Number(id));
  const { productName, quantity, price, description, imageName } = product;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const isAvailable = quantity && Number(quantity) > 0;
  const addToCart = (id) => {
    dispatch(updateCart(Number(id), qty, toast));
  };
  return (
    <div
      className="mt-5 grid xs:px-2 xs:py-14 justify-center xs:grid-col-1 sm:px-8 lg:px-14
      md:grid-cols-2 gap-x-3"
    >
      <div>
        <img src={`/src/assets/products/${imageName}`} alt={productName} />
      </div>
      <div>
        <h1>{productName}</h1>
        <p>{description}</p>
        <div className="flex justify-between gap-1">
          <div className="flex-col align-end">
            <span className="text-xl">&yen;{price} for 12 bulbs</span>
          </div>
          <div>
            {isAvailable && (
              <>
                <label htmlFor="quantity" className="mt-2 mr-2">
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
              </>
            )}
            <button
              className={`${
                isAvailable
                  ? "bg-cyan-700 hover:opacity-50 text-white "
                  : "bg-gray-400 text-gray-700"
              }
                rounded py-2 px-3`}
              onClick={() => addToCart(id)}
            >
              {isAvailable ? (
                <div className="flex">
                  <FaShoppingCart className="mt-1 mr-1" />
                  <span>Add to Cart</span>
                </div>
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
