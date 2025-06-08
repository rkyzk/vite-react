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

  return (
    <div className="flex">
      <div className="px-2 mx-auto">
        <AddressForm setTempAddresses={setTempAddresses} />
        <StripePayment totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default Checkout;
