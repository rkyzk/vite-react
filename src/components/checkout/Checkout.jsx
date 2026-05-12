import StripePayment from "./StripePayment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressList from "./AddressList";
import styles from "../../styles/Checkout.module.css";
import menuStyles from "../../styles/MenuColumn.module.css";
import {
  createClientSecret,
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
} from "../../store/actions";
import MenuColumn from "../shared/MenuColumn";

export const Checkout = () => {
  const auth = useSelector((state) => state.auth);
  const clientSecret = auth?.clientSecret;
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const cart = useSelector((state) => state.carts.cart);
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.errors);
  const commandIdx = auth?.commandIdx;

  // If not logged in, show log in dialog
  // if (auth === null) {
  //   setOpen(true);
  // }
  const props = {
    billAddrCheck,
    setBillAddrCheck,
  };

  useEffect(() => {
    const getClientSecret = async () => {
      !clientSecret && auth?.user && dispatch(createClientSecret());
    };
    const refreshJwtToken = async () => {
      await dispatch(sendRefreshJwtTokenRequest());
    };
    const logoutUser = async () => {
      // If refresh token has expired, log out the user and show the login dialog.
      dispatch(sendLogoutRequest(auth.user.id, null, null));
      // Show only the login dialog (no register form)
      await dispatch(setModalLogin());
      dispatch(setModalOpen());
    };
    if (commandIdx === 0) getClientSecret();
    if (commandIdx === 1) refreshJwtToken(); // If JWT has expired, request to refresh token.
    if (commandIdx === 2) logoutUser(); // If refresh token has expired, log out the user.
  }, [commandIdx]);

  return (
    <div className={`${styles.Container} w-full flex`}>
      <div className={`${menuStyles.MenuCol} hidden lg:block`}>
        <MenuColumn />
      </div>
      {cart.length > 0 ? (
        <div className={`${styles.Box}`}>
          <AddressList props={props} />
          <StripePayment />
        </div>
      ) : (
        <div className="w-full">
          <p className="w-35 m-auto">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
