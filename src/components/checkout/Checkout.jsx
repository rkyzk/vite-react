import StripePayment from "./StripePayment";
import AddressForm from "./AddressForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [showErrorsSA, setShowErrorsSA] = useState(false);
  const [showErrorsBA, setShowErrorsBA] = useState(false);
  const props = {
    sAddress,
    setSAddress,
    bAddress,
    setBAddress,
    showErrorsSA,
    showErrorsBA,
    initAddr,
  };
  const dispatch = useDispatch();

  const validateAddresses = () => {
    let keys = [
      "fullname",
      "streetAddress1",
      "city",
      "province",
      "postalCode",
      "countryCode",
    ];
    let complete = true;
    // check if shipping address is complete
    for (let i = 0; i < keys.length; i++) {
      if (!(sAddress[keys[i]] && sAddress[keys[i]].length > 2)) {
        complete = false;
        break;
      }
    }
    complete ? dispatch(storeAddress(sAddress)) : setShowErrorsSA(true);
    // check if billing address is entered at all
    keys.push("streetAddress2");
    let completeBA = true;
    for (let i = 0; i < keys.length; i++) {
      if (bAddress[keys[i]] && bAddress[keys[i]].trim().length != 0) {
        completeBA = false;
        break;
      }
    }
    if (complete && completeBA) return true; // billing address wasn't entered
    // when billing address was entered, check if it's complete
    completeBA = true;
    keys.pop();
    for (let i = 0; i < keys.length; i++) {
      if (!(bAddress[keys[i]] && bAddress[keys[i]].trim().length > 2)) {
        completeBA = false;
        break;
      }
    }
    completeBA ? dispatch(storeAddress(bAddress)) : setShowErrorsBA(true);
    return complete && completeBA;
  };

  return (
    <div className="flex">
      <div className="px-2 mx-auto">
        <AddressForm props={props} />
        <StripePayment validateAddresses={validateAddresses} />
      </div>
    </div>
  );
};

export default Checkout;
