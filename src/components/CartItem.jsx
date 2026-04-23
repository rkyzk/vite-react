import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";
import styles from "../styles/CartCartItem.module.css";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const CartItem = ({
  idx,
  id,
  productName,
  imagePath,
  price,
  purchaseQty,
  cartPage,
}) => {
  const urlStart = "https://res.cloudinary.com/ds66fig3o/image/upload";
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const checkOutPage = path === "/checkout";

  const handleUpdateCart = (id, e) => {
    dispatch(updateCart(id, Number(e.target.value), toast));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  return (
    <>
      <div className="flex w-full gap-1 -mt-2">
        <span className="w-1/12"></span>
        <span
          className={`${styles.FontSizeXS} ${checkOutPage && styles.FontSize}`}
        >
          {productName}
        </span>
      </div>
      <div className="flex w-full gap-1">
        <span className="w-1/12 text-center">{idx + 1}</span>
        <div className="w-4/12">
          <div className={`${styles.imgBox} relative`}>
            <img
              className={`${styles.imgSize} overflow-hidden object-cover absolute`}
              src={`${urlStart}${imagePath}`}
              alt={productName}
            />
          </div>
        </div>
        {cartPage ? (
          <div className="w-2/12 flex">
            <select
              id={`quantity-${id}`}
              onChange={(e) => handleUpdateCart(id, e)}
              className={`${styles.SelectBox} mt-4 border bg-white rounded-lg
                py-2 pl-1 h-10`}
            >
              {[...Array(30)]
                .map((_, i) => i + 1)
                .map((i) => {
                  if (purchaseQty === i) {
                    return (
                      <option
                        className={`${styles.FontSizeXS} text-center`}
                        key={i}
                        value={i}
                        selected
                      >
                        {i}
                      </option>
                    );
                  } else {
                    return (
                      <option
                        key={i}
                        value={i}
                        className={`${styles.FontSizeXS} text-center`}
                      >
                        {i}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
        ) : (
          <div
            className={`w-2/12 mt-4 ml-2 ${styles.FontSizeXS} ${checkOutPage && styles.FontSize}`}
          >
            {purchaseQty}
          </div>
        )}
        <span
          className={`w-2/12 mt-4 ${styles.PriceText} ${styles.FontSizeXS} ${checkOutPage && styles.FontSize}`}
        >
          &yen;{price}
        </span>
        <button
          onClick={() => handleRemoveItem(id)}
          className={`${styles.RemoveBtn} ${styles.FontSizeXS} ${checkOutPage && styles.FontSize}
            mt-4 h-7.5 px-1 hover:bg-neutral-800 hover:text-white`}
        >
          remove
        </button>
      </div>
      <hr className="mt-3 mx-4" />
    </>
  );
};

export default CartItem;
