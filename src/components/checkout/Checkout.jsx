import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeAddress } from "../../store/actions";
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
    countryCode: "",
    saveAddr: true,
  };
  const addrErrs = {
    fullname: false,
    streetAddress1: false,
    streetAddress2: false,
    city: false,
    province: false,
    postalCode: false,
    countryCode: false,
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
  const [showErrorsSA, setShowErrorsSA] = useState(false);
  const [showErrorsBA, setShowErrorsBA] = useState(false);
  const [billAddrCheck, setBillAddrCheck] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  if (auth === null) {
    const state = false;
    const props = { state, setModalOpen };
    return (
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AuthModal props={props} />
      </Modal>
    );
  }

  const storeAddr = () => {
    dispatch(storeAddress(sAddress));
    !billAddrCheck && dispatch(storeAddress(bAddress));
  };
  const validateInput = () => {
    let result = true;
    // validate input for shipping address
    for (let key in errors) {
      let errs = errors;
      if (key === "streetAddress2") {
        if (sAddress[key].length === 1) {
          errs["streetAddress2"] = true;
          setErrors(errs);
          result = false;
        } else {
          errs["streetAddress2"] = false;
          setErrors(errs);
        }
      } else {
        if (sAddress[key].length < 2) {
          console.log(key);
          errs[key] = true;
          setErrors(errs);
          setShowErrorsSA(true);
          result = false;
        } else {
          errs[key] = false;
          setErrors(errs);
        }
      }
      console.log(errors);
    }
    // check if there are any input for billing address
    // let isEntered = false;
    // for (let key in bAddress) {
    //   if (bAddress[key].trim() !== "") {
    //     isEntered = true;
    //     break;
    //   }
    // }
    // validate input only when at least one field has been entered.
    // if (isEntered) {
    //   for (let key in bAddress) {
    //     let errs = errors;
    //     if (bAddress[key].length < 2) {
    //       errs[key] = true;
    //       setBillAddrErrors(errs);
    //     }
    //     !showErrorsBA && setShowErrorsBA(true);
    //   }
    // }
    if (result) {
      return true;
    } else {
      setShowErrorsSA(true);
      return false;
    }
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
    storeAddr,
    validateInput,
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
