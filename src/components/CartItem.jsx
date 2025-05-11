import { useDispatch } from "react-redux";
import { removeItemFromCart, updateCart } from "../store/actions";
import styles from "../styles/CartItem.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
        <div className="w-2/12 flex">
          <select
            id={`quantity-${id}`}
            onChange={(e) => handleUpdateCart(id, Number(e.target.value))}
            className="mt-4 border bg-white rounded-lg
            py-2 pl-1 h-10"
          >
            {[...Array(30)]
              .map((_, i) => i + 1)
              .map((i) => {
                if (purchaseQty === i) {
                  return (
                    <option className="text-center" key={i} value={i} selected>
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
        <span className="w-2/12 mt-4">{price}</span>
        <button
          onClick={() => handleRemoveItem(id)}
          className={`${styles.Btn} bg-amber-400 text-white align-self-center
           px-2 py-2`}
        >
          remove item
        </button>
      </div>
      <hr className="mt-3" />
    </>
  );
};

export default CartItem;
