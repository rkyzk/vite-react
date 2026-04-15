import StripePayment from "./StripePayment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddressList from "./AddressList";
import Cart from "../Cart";
import {
  createClientSecret,
  sendRefreshJwtTokenRequest,
  sendLogoutRequest,
  setModalLogin,
  setModalOpen,
} from "../../store/actions";

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
  const stripePaymentProps = {
    billAddrCheck,
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
    <>
      {cart.length > 0 ? (
        <>
          <AddressList props={props} />
          <Cart />
          <StripePayment stripePaymentProps={stripePaymentProps} />
        </>
      ) : (
        <div className="w-full">
          <p className="w-[140px] m-auto">Your cart is empty.</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
