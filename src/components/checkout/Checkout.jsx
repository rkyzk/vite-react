import StripePayment from "./StripePayment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressList from "./AddressList";
import styles from "../../styles/Checkout.module.css";
import menuStyles from "../../styles/MenuColumn.module.css";
import { createClientSecret } from "../../store/actions";
import MenuColumn from "../shared/MenuColumn";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";

export const Checkout = () => {
  const { clientSecret, user } = useSelector((state) => state.auth);
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();

  // If not logged in, show log in dialog
  // if (auth === null) {
  //   setOpen(true);
  // }
  const props = {
    billAddrCheck,
    setBillAddrCheck,
  };

  useEffect(() => {
    !clientSecret && user && dispatch(createClientSecret(toast));
  }, [user]);

  return (
    <div className={`${styles.Container} w-full flex`}>
      <div className={`${menuStyles.MenuCol} hidden lg:block`}>
        <MenuColumn />
      </div>
      {cart.length > 0 ? (
        <div className={`${styles.Box}`}>
          {clientSecret && (
            <>
              <AddressList props={props} />
              <StripePayment />
            </>
          )}
        </div>
      ) : (
        <div className="w-51 mx-auto flex">
          <FaExclamationTriangle className="text-3xl mr-2" />
          <span className="text-lg text-slate-600">Your cart is empty.</span>
        </div>
      )}
    </div>
  );
};

export default Checkout;
