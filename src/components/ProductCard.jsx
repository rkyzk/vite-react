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
      <p className="text-lg/6 mt-1 text-gray-900 h-[12px]">
        {truncateText(productName, 50)}
      </p>
      <div className="flex">
        <p>&yen;{price} (球根12個)</p>
        <Link className="ml-5 text-shadow-amber-400" to={`/product/${id}`}>
          商品詳細を見る
        </Link>
      </div>
      <div className="flex justify-end gap-1">
        {isAvailable && (
          <>
            <label className="mt-1" htmlFor="quantity">
              数個
            </label>
            <select
              name="quantity"
              className="border bg-white rounded-lg"
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
              ? "bg-neutral-100 text-gray-900 hover:bg-neutral-600 hover:text-white"
              : "bg-gray-400 text-gray-700"
          } ${styles.Button} p-1`}
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
    </div>
  );
};

export default ProductCard;
