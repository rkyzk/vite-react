import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import AuthModal from "../auth/AuthModal";

export const Checkout = () => {
  const auth = useSelector((state) => state.auth);
  const initAddr = {
    addressId: "",
    fullname: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    province: "",
    postalCode: "",
    countryCode: "15",
    saveAddr: true,
  };
  const addrErrs = {
    fullname: false,
    postalCode: false,
    streetAddress2: false,
  };
  const [sAddress, setSAddress] = useState({
    ...initAddr,
    billingAddress: false,
  });
  const [bAddress, setBAddress] = useState({
    ...initAddr,
    billingAddress: true,
  });
  const [errors, setErrors] = useState(addrErrs);
  const [billAddrErrors, setBillAddrErrors] = useState(addrErrs);
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const [showErrorsSA, setShowErrorsSA] = useState(false);
  const [showErrorsBA, setShowErrorsBA] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {}, [
    showErrorsSA,
    showErrorsBA,
    errors,
    billAddrErrors,
    billAddrCheck,
  ]);

  if (auth === null) {
    const state = false;
    const props = { state, setModalOpen };
    return (
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AuthModal props={props} />
      </Modal>
    );
  }
  const validateInputSAddr = () => {
    let result = true;
    let newErrors = {
      ...addrErrs,
    };
    // validate input for shipping address
    if (sAddress.fullname.length < 3) {
      newErrors = {
        ...newErrors,
        fullname: true,
      };
      result = false;
    }
    if (sAddress.postalCode === "") {
      newErrors = {
        ...newErrors,
        postalCode: true,
      };
      result = false;
    }
    if (sAddress.streetAddress2.length < 2) {
      newErrors = {
        ...newErrors,
        streetAddress2: true,
      };
      result = false;
    }
    setErrors(newErrors);
    !result && !showErrorsSA && setShowErrorsSA(true);
    result && setShowErrorsSA(false);
    return result;
  };

  const validateInputBAddr = () => {
    let result = true;
    if (bAddress.fullname.length < 3) {
      setBillAddrErrors({
        ...billAddrErrors,
        fullname: true,
      });
      result = false;
    }
    if (bAddress.postalCode === "") {
      setBillAddrErrors({
        ...billAddrErrors,
        postalCode: true,
      });
      result = false;
    }
    if (bAddress.streetAddress2.length < 2) {
      setBillAddrErrors({
        ...billAddrErrors,
        streetAddress2: true,
      });
      result = false;
    }
    result ? setShowErrorsBA(false) : setShowErrorsBA(true);
    return result;
  };
  const props = {
    sAddress,
    setSAddress,
    errors,
    setErrors,
    bAddress,
    setBAddress,
    showErrorsSA,
    showErrorsBA,
    billAddrErrors,
    setBillAddrErrors,
    initAddr,
    billAddrCheck,
    setBillAddrCheck,
  };
  const stripePaymentProps = {
    sAddress,
    bAddress,
    validateInputSAddr,
    validateInputBAddr,
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
