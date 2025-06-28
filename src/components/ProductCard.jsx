import truncateText from "../utils/truncateText";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/actions";
import styles from "../styles/ProductCard.module.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ id, productName, price, quantity, imageName }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const isAvailable = quantity && Number(quantity) > 0;
  const addToCart = (id) => {
    dispatch(updateCart(id, qty, toast));
  };

  return (
    <div className={`${styles.Card} "relative"`}>
      <img
        className={`${styles.imgSize} "cursor-pointer"`}
        src={`/src/assets/products/${imageName}`}
        alt={productName}
      />
      <h2 className="text-xl text-gray-900">{truncateText(productName, 50)}</h2>
      <div className="flex jusitfy-between">
        <p>&yen;{price} for 12 bulbs</p>
        <div>
          <Link to={`/product/${id}`}>View product</Link>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        {isAvailable && (
          <>
            <label htmlFor="quantity" className="mt-2">
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
  );
};

export default ProductCard;
