import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";
import styles from "../styles/CartItem.module.css";

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
      <div className="flex w-full h-36">
        <span className="w-1/12 mt-14 pl-2 text-center">{idx + 1}</span>
        <div className="w-5/12 pl-2">
          <span>{productName}</span>
          <img
            className={`${styles.imgSize}`}
            src={`/src/assets/products/${imageName}`}
            alt={productName}
          />
        </div>
        <div className="w-2/12 pl-2">
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
        </div>
        <span className="w-2/12 text-right inline-block mt-4 mr-8">
          {price}
        </span>
        <button
          onClick={() => handleRemoveItem(id)}
          className="bg-amber-400 text-white py-1 px-2
           rounded-lg h-10 w-34 mt-5"
        >
          remove item
        </button>
      </div>
      <hr className="mt-3" />
    </>
  );
};

export default CartItem;
