import StripePayment from "./StripePayment";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddressList from "./AddressList";

export const Checkout = ({ setModalOpen }) => {
  const auth = useSelector((state) => state.auth);
  const [billAddrCheck, setBillAddrCheck] = useState(true);

  // どうなる？
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
  console.log("fired checkout");

  return (
    <>
      <AddressList props={props} />
      <StripePayment stripePaymentProps={stripePaymentProps} />
    </>
  );
};

export default Checkout;
