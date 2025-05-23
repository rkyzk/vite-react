import truncateText from "../utils/truncateText";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/actions";

const ProductCard = ({
  id,
  productName,
  imagePath,
  description,
  price,
  quantity,
}) => {
  const isAvailable = quantity && Number(quantity) > 0;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const addToCart = (quantity) => {
    dispatch(updateCart(id, quantity));
  };

  return (
    <div className="relative">
      <img
        className="w-full cursor-pointer"
        src="https://placehold.co/600x400"
        alt={productName}
      ></img>
      <div className="pt-2 flex justify-between text-gray-900">
        <h2 className="text-xl">{truncateText(productName, 50)}</h2>
        <div>{price}</div>
      </div>
      <div className="h-20 text-gray-700">{truncateText(description, 80)}</div>
      <div className="flex justify-end gap-1">
        {isAvailable && (
          <>
            <label for="quantity" className="mt-2">
              Qty
            </label>
            <select
              name="quantity"
              className="border bg-white rounded-lg py-2 pl-1"
              onChange={(e) => setQty(e.target.value)}
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
              ? "bg-sky-600 opacity-100 hover:bg-sky-800 text-white "
              : "bg-gray-400 text-gray-700"
          }
        rounded py-2 px-3`}
          onClick={() => addToCart(Number(qty))}
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
