import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";

const CartItem = ({ id, productName, image, price, purchaseQty }) => {
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
        <span className="w-1/12">?</span>
        <div className="w-5/12">
          <span>{productName}</span>
          <img src={image} alt={productName} className="w-full h-35" />
        </div>
        <select
          id={`quantity-${id}`}
          onChange={(e) => handleUpdateCart(id, Number(e.target.value))}
          className="border bg-white rounded-lg py-2 pl-1 h-10 w-2/12"
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
        <span className="w-2/12 text-right inline-block mt-2 pr-5">
          {price}
        </span>
        <button
          onClick={() => handleRemoveItem(id)}
          className="block mt-1 bg-amber-400 text-white p-1 rounded-lg h-10 w-26"
        >
          remove item
        </button>
      </div>
    </>
  );
};

export default CartItem;
