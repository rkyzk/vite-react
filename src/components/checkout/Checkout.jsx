import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeAddress } from "../../store/actions";

export const Checkout = () => {
  const initAddr = {
    addressId: "",
    fullname: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    province: "",
    postalCode: "",
    countryCode: "",
    saveAddr: true,
  };
  const [sAddress, setSAddress] = useState({
    ...initAddr,
    billingAddress: false,
  });
  const [bAddress, setBAddress] = useState({
    ...initAddr,
    billingAddress: true,
  });
  const [errors, setErrors] = useState({
    fullname: false,
    streetAddress1: false,
    city: false,
    province: false,
    postalCode: false,
    countryCode: false,
  });
  const [billAddrErrors, setBillAddrErrors] = useState({
    fullname: false,
    streetAddress1: false,
    city: false,
    province: false,
    postalCode: false,
    countryCode: false,
  });
  const [showErrorsSA, setShowErrorsSA] = useState(false);
  const [showErrorsBA, setShowErrorsBA] = useState(false);
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const dispatch = useDispatch();
  const storeAddr = () => {
    dispatch(storeAddress(sAddress));
    !billAddrCheck && dispatch(storeAddress(bAddress));
  };

  const props = {
    sAddress,
    setSAddress,
    errors,
    setErrors,
    bAddress,
    setBAddress,
    billAddrErrors,
    setBillAddrErrors,
    showErrorsSA,
    showErrorsBA,
    initAddr,
    billAddrCheck,
    setBillAddrCheck,
  };
  const stripePaymentProps = {
    errors,
    billAddrErrors,
    setShowErrorsSA,
    setShowErrorsBA,
    storeAddr,
    billAddrCheck,
  };

  return (
    <div className="flex">
      <div className="px-2 mx-auto">
        <AddressForm props={props} />
        <StripePayment stripePaymentProps={stripePaymentProps} />
      </div>
    </div>
  );
};

export default Checkout;
