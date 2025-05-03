import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";

const CartItem = ({ idx, id, productName, imageName, price, purchaseQty }) => {
  const dispatch = useDispatch();

  const handleUpdateCart = (id, qty) => {
    dispatch(updateCart(id, qty));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <>
      <div className="flex w-full lg:w-10/12">
        <span className="w-1/12 mt-4 text-center">{idx + 1}</span>
        <div className="w-5/12 mr-15">
          <span>{productName}</span>
          <img
            src={`/src/assets/products/${imageName}`}
            alt={productName}
            className="w-30 h-24 md:w-50 md:h-40 overflow-hidden"
          />
        </div>
        <select
          id={`quantity-${id}`}
          onChange={(e) => handleUpdateCart(id, Number(e.target.value))}
          className="mt-4 border bg-white rounded-lg py-2 pl-1 h-10 w-15"
        >
          {[...Array(30)]
            .map((_, i) => i + 1)
            .map((i) => {
              if (purchaseQty === i) {
                return (
                  <option key={i} value={i} selected>
                    {i}
                  </option>
                );
              } else {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              }
            })}
        </select>
        <span className="w-3/12 text-right inline-block mt-4 mr-10">
          {price}
        </span>
        <button
          onClick={() => handleRemoveItem(id)}
          className="block mt-4 bg-amber-400 text-white py-1 px-2
           rounded-lg h-10 w-34"
        >
          remove item
        </button>
      </div>
    </>
  );
};

export default CartItem;
