import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";
import styles from "../styles/CartItem.module.css";
import toast from "react-hot-toast";

const CartItem = ({
  idx,
  id,
  productName,
  imageName,
  price,
  purchaseQty,
  cartPage,
}) => {
  const dispatch = useDispatch();

  const handleUpdateCart = (id, e) => {
    dispatch(updateCart(id, Number(e.target.value), toast));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <>
      <div className="flex w-full gap-1">
        <span className="w-1/12"></span>
        <span>{productName}</span>
      </div>
      <div className="flex w-full gap-1">
        <span className="w-1/12 text-center">{idx + 1}</span>
        <div className="w-4/12">
          <img
            className={`${styles.imgSize}`}
            src={`/src/assets/products/${imageName}`}
            alt={productName}
          />
        </div>
        {cartPage ? (
          <div className="w-2/12 flex">
            <select
              id={`quantity-${id}`}
              onChange={(e) => handleUpdateCart(id, e)}
              className="mt-4 border bg-white rounded-lg
            py-2 pl-1 h-10"
            >
              {[...Array(30)]
                .map((_, i) => i + 1)
                .map((i) => {
                  if (purchaseQty === i) {
                    return (
                      <option
                        className="text-center"
                        key={i}
                        value={i}
                        selected
                      >
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
        ) : (
          <div className="w-2/12 mt-4 ml-2">{purchaseQty}</div>
        )}
        <span className="w-2/12 mt-4">&yen;{price}</span>
        <button
          onClick={() => handleRemoveItem(id)}
          className={`${styles.Btn} mt-4 h-[30px]
           px-1 hover:bg-neutral-600 hover:text-white`}
        >
          削除
        </button>
      </div>
      <hr className="mt-3 mx-4" />
    </>
  );
};

export default CartItem;
