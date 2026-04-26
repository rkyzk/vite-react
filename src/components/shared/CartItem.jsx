import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../../store/actions";
import styles from "../../styles/CartCartItem.module.css";
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
      <div className="flex w-full gap-1 -mt-3">
        {cartPage && <span className="w-1/12"></span>}
        <span
          className={`${styles.ProdName} ${checkOutPage && styles.FontSize}`}
        >
          {productName}
        </span>
      </div>
      <div className="flex w-full gap-1 pb-1">
        {cartPage && (
          <div className={`${styles.ItemNr}`} styles={{ textAlign: "cetner" }}>
            {idx + 1}
          </div>
        )}
        <div className={`${cartPage ? styles.Image : "w-5/12"}`}>
          <div
            className={`${checkOutPage ? styles.imgBoxCheckout : styles.imgBox} relative`}
          >
            <img
              className={`${checkOutPage ? styles.imgSizeCheckout : styles.imgSize} overflow-hidden object-cover absolute`}
              src={`${urlStart}${imagePath}`}
              alt={productName}
            />
          </div>
        </div>
        {cartPage ? (
          <div className={`${styles.SelectBoxDiv}`}>
            <select
              id={`quantity-${id}`}
              onChange={(e) => handleUpdateCart(id, e)}
              className={`${styles.SelectBox} border bg-white rounded-lg
                py-2 pl-1 h-10`}
            >
              {[...Array(30)]
                .map((_, i) => i + 1)
                .map((i) => {
                  if (purchaseQty === i) {
                    return (
                      <option
                        className={`${styles.FontSize} text-center`}
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
                        className={`${styles.FontSize} text-center`}
                      >
                        {i}
                      </option>
                    );
                  }
                })}
            </select>
          </div>
        ) : (
          <div className={`w-2/12 ml-2 ${styles.QtyCheckOut}`}>
            {purchaseQty}
          </div>
        )}
        <div className="flex">
          <span
            className={`${checkOutPage ? styles.PriceTextCheckOut : styles.PriceText}`}
          >
            &yen;{price}
          </span>
          {cartPage && (
            <button
              className={`${styles.RemoveBtn}
            px-1 h-7 hover:bg-neutral-800 hover:text-white`}
              onClick={() => handleRemoveItem(id)}
            >
              remove
            </button>
          )}
        </div>
      </div>
      <hr className="mt-1" />
    </>
  );
};

export default CartItem;
