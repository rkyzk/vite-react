import StripePayment from "./StripePayment";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddressList from "./AddressList";

export const Checkout = ({ setModalOpen }) => {
  const auth = useSelector((state) => state.auth);
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const cart = useSelector((state) => state.carts.cart);

  // ログインしていない時はログインダイアログを表示
  if (auth === null) {
    setModalOpen(true);
  }
  const props = {
    billAddrCheck,
    setBillAddrCheck,
  };
  const stripePaymentProps = {
    billAddrCheck,
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <AddressList props={props} />
          <StripePayment stripePaymentProps={stripePaymentProps} />
        </>
      ) : (
        <div className="w-full">
          <p className="w-[140px] m-auto">カートは空です。</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
