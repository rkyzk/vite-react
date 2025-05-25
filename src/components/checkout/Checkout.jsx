import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";

const Checkout = () => {
  const cart = useSelector((state) => state.carts.cart);
  const [tempAddresses, setTempAddresses] = useState([]);
  const dispatch = useDispatch();
  const totalPrice = cart?.reduce(
    (acc, curr) => acc + curr?.price * curr?.purchaseQty,
    0
  );

  // const storeGuestAddresses = () => {
  //   dispatch(storeGuestTempAddresses());
  // };

  return (
    <>
      <AddressForm setTempAddresses={setTempAddresses} />
      <StripePayment totalPrice={totalPrice} />
    </>
  );
};

export default Checkout;
