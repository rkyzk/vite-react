import truncateText from "../utils/truncateText";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({
  id,
  productName,
  imagePath,
  description,
  price,
  quantity,
}) => {
  const isAvailable = quantity && Number(quantity) > 0;
  return (
    <div className="relative">
      <img
        className="w-full cursor-pointer"
        src="https://placehold.co/600x400"
        alt={productName}
      ></img>
      <div className="pt-2 flex justify-between text-gray-900">
        <h2 className="text-xl">{productName}</h2>
        <div>{price}</div>
      </div>
      <div className="h-20 text-gray-700">{truncateText(description, 50)}</div>
      <button
        className={`${
          isAvailable
            ? "bg-sky-600 opacity-100 hover:bg-sky-800 text-white "
            : "bg-gray-400 text-gray-700"
        }
        rounded py-1 px-3
        absolute right-0 bottom-0`}
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
  );
};

export default ProductCard;
