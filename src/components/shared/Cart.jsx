import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../styles/CartCartItem.module.css";
import {
  clearAuthData,
  setModalCheckout,
  setModalOpen,
} from "../../store/actions";

const Cart = ({ cartPage }) => {
  const cart = useSelector((state) => state.carts.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0,
  );
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const checkOutPage = path === "/checkout";

  const handleCheckout = () => {
    if (auth && auth.user) {
      dispatch(clearAuthData());
      navigate("/checkout");
    } else {
      dispatch(setModalCheckout());
      dispatch(setModalOpen());
    }
  };

  return (
    <div className="max-w-114 mx-auto mt-2 md:max-w-200">
      {!cart.length ? (
        <p className="w-40 m-auto">Your cart is empty.</p>
      ) : (
        <>
          {path === "/cart" && (
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: "800",
                marginLeft: "8.4%",
                fontFamily: "serif",
              }}
            >
              Your cart
            </h2>
          )}
          <div className="flex gap-1 mt-2">
            {cartPage && <span className="w-1/12"></span>}
            <span
              className={`${cartPage ? "w-4/12" : "w-5/12"} ${checkOutPage ? styles.FontSize : styles.FontSizeXS}`}
            >
              Product
            </span>
            <span
              className={`w-2/12 ${checkOutPage ? styles.FontSize : styles.FontSizeXS}`}
            >
              Qty
            </span>
            <span
              className={`w-4/12 ${checkOutPage ? styles.FontSize : styles.FontSizeXS}`}
            >
              Unit price
            </span>
          </div>
          <hr className="mt-1" />
          {cart.map((item, idx) => {
            let data = { ...item, idx: idx, cartPage };
            return <CartItem key={idx} {...data} />;
          })}
          <div className="flex w-full mt-3 gap-3">
            <p className="font-serif font-bold w-7/12 text-right">Total: </p>
            <p className={`font-serif font-bold w-2/12 pl-5}`}>
              &yen;{totalPrice}
            </p>
          </div>
          {cartPage && (
            <div className="flex justify-end">
              <div className={`w-55 pr-7.5 mt-2 flex-col md:pr-`}>
                <button
                  className={`${styles.Btns} w-47.5 mt-1 text-white py-1`}
                  onClick={() => navigate("/products")}
                >
                  <span className="font-bold font-serif">
                    Continue shopping
                  </span>
                </button>
                <button
                  className={`${styles.Btns} w-47.5 mt-2 text-white py-1`}
                  onClick={() => handleCheckout()}
                >
                  <span className="font-bold font-serif">
                    Proceed to check out
                  </span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
